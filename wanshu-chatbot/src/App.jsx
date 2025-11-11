import { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import axios from 'axios';
import styled from 'styled-components';
import 'react-tabs/style/react-tabs.css';

const AppContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  gap: 20px;
`;

const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #e0e0e0;
`;

const ProfileInfo = styled.div`
  h1 {
    margin: 0 0 10px 0;
    color: #333;
  }
  p {
    margin: 0;
    color: #666;
  }
`;

const ChatContainer = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
`;

const MessagesContainer = styled.div`
  height: 400px;
  overflow-y: auto;
  padding: 20px;
  background-color: #f9f9f9;
`;

const Message = styled.div`
  margin-bottom: 15px;
  max-width: 70%;
  
  &.user {
    margin-left: auto;
  }
  
  .bubble {
    padding: 10px 15px;
    border-radius: 18px;
    word-wrap: break-word;
    
    &.user {
      background-color: #007bff;
      color: white;
    }
    
    &.bot {
      background-color: white;
      border: 1px solid #e0e0e0;
      color: #333;
    }
  }
`;

const InputArea = styled.div`
  display: flex;
  padding: 10px;
  background-color: white;
  border-top: 1px solid #e0e0e0;
  
  input {
    flex: 1;
    padding: 10px 15px;
    border: 1px solid #e0e0e0;
    border-radius: 20px;
    outline: none;
    font-size: 14px;
    
    &:focus {
      border-color: #007bff;
    }
  }
  
  button {
    margin-left: 10px;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    
    &:hover {
      background-color: #0056b3;
    }
  }
`;

const ExampleQuestions = styled.div`
  margin: 20px 0;
  
  h3 {
    margin-bottom: 10px;
    color: #555;
  }
  
  .questions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  
  button {
    padding: 5px 15px;
    background-color: #e9f5ff;
    color: #007bff;
    border: 1px solid #007bff;
    border-radius: 15px;
    cursor: pointer;
    font-size: 14px;
    
    &:hover {
      background-color: #d0e8ff;
    }
  }
`;

const ResumeContent = styled.div`
  padding: 20px;
  line-height: 1.6;
  
  h3 {
    color: #333;
    border-bottom: 1px solid #e0e0e0;
    padding-bottom: 5px;
    margin-top: 20px;
  }
  
  .entry {
    margin-bottom: 15px;
  }
  
  .date {
    color: #666;
    font-style: italic;
  }
  
  ul {
    margin-top: 5px;
    padding-left: 20px;
  }
`;

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 初始加载问候语
  useEffect(() => {
    setMessages([
      {
        sender: 'bot',
        text: '你好！我是Wanshu Jiang的个人助手。你可以问我关于Wanshu的教育背景、工作经历或技能等问题。'
      }
    ]);
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    // 添加用户消息
    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      // 调用Cloudflare Worker
      const response = await axios.post(
        'https://wanshu-chatbot-worker.creaaa304.workers.dev/chat',
        { query: input }
      );

      // 添加机器人回复
      setMessages([
        ...newMessages,
        { sender: 'bot', text: response.data.response }
      ]);
    } catch (error) {
      setMessages([
        ...newMessages,
        { sender: 'bot', text: '抱歉，我暂时无法回答你的问题。请稍后再试。' }
      ]);
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExampleQuestion = (question) => {
    setInput(question);
  };

  return (
    <AppContainer>
      <ProfileSection>
        <ProfileImage src="profile.jpg" alt="Wanshu Jiang" />
        <ProfileInfo>
          <h1>Wanshu Jiang</h1>
          <p>Cognitive Systems | Biomedical Engineering</p>
        </ProfileInfo>
      </ProfileSection>

      <Tabs>
        <TabList>
          <Tab>聊天</Tab>
          <Tab>简历</Tab>
          <Tab>技能</Tab>
        </TabList>

        <TabPanel>
          <ExampleQuestions>
            <h3>示例问题</h3>
            <div className="questions">
              <button onClick={() => handleExampleQuestion('Wanshu的教育背景是什么？')}>教育背景</button>
              <button onClick={() => handleExampleQuestion('Wanshu会哪些编程语言？')}>编程语言</button>
              <button onClick={() => handleExampleQuestion('Wanshu有哪些工作经历？')}>工作经历</button>
              <button onClick={() => handleExampleQuestion('Wanshu的硕士专业是什么？')}>硕士专业</button>
            </div>
          </ExampleQuestions>

          <ChatContainer>
            <MessagesContainer>
              {messages.map((msg, index) => (
                <Message key={index} className={msg.sender}>
                  <div className={`bubble ${msg.sender}`}>{msg.text}</div>
                </Message>
              ))}
              {isLoading && (
                <Message className="bot">
                  <div className="bubble bot">正在思考...</div>
                </Message>
              )}
            </MessagesContainer>
            <InputArea>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="输入你的问题..."
              />
              <button onClick={sendMessage}>发送</button>
            </InputArea>
          </ChatContainer>
        </TabPanel>

        <TabPanel>
          <ResumeContent>
            <h2>个人简历</h2>
            <p>Manfred-Börner Straße 5<br />
            89081 Ulm, Germany<br />
            +49 1624830759<br />
            wanshu212@gmail.com</p>

            <h3>教育背景</h3>
            <div className="entry">
              <div className="date">2023年10月至今</div>
              <div>硕士，认知系统，乌尔姆大学，德国乌尔姆</div>
            </div>
            <div className="entry">
              <div className="date">2019年8月至2023年7月</div>
              <div>学士，生物医学工程（专注：生物信息学），东南大学，中国南京</div>
            </div>

            <h3>实习经历</h3>
            <div className="entry">
              <div className="date">2025年5月至2025年7月</div>
              <div>原子吸收信号数据分析助理，乌尔姆大学，德国乌尔姆</div>
              <ul>
                <li>使用Python开发自动化工具链用于AAS信号分析（数据清理、曲线拟合、参数提取）</li>
                <li>使用并行化和批处理提高大型数据集的效率</li>
                <li>记录流程并移交可用于CI的脚本以提高可重用性</li>
              </ul>
            </div>
            <div className="entry">
              <div className="date">2024年7月至2024年9月</div>
              <div>"一带一路"信息分析和监控系统，东南大学，中国南京</div>
              <ul>
                <li>开发基于Dify的国际监控系统，用于"一带一路"地区新闻的收集、分析和可视化</li>
                <li>实现多源数据采集（RSS、JSON、API）、文本处理和可视化模块</li>
                <li>实施基于LLM的管道，用于自动分类、内容分析和摘要生成</li>
                <li>自动报告功能，包括每日/每周报告、热点分析和导出（PDF/Word）</li>
                <li>创建用于管理分析任务、报告计划和警告规则的前端</li>
              </ul>
            </div>

            <h3>项目经历</h3>
            <div className="entry">
              <div className="date">2024年4月至2024年6月</div>
              <div>使用n8n和LLM的自动发票处理</div>
              <ul>
                <li>自动n8n工作流，用于监控和处理来自Microsoft 365的发票电子邮件、AI-API和SQL数据库</li>
                <li>通过HTTP Request Node实现基于AI的管道，使用Google Gemini进行文档分类和从PDF发票中提取结构化数据</li>
                <li>构建从电子邮件过滤和OCR处理到自动Excel导出的端到端流程</li>
              </ul>
            </div>
          </ResumeContent>
        </TabPanel>

        <TabPanel>
          <ResumeContent>
            <h2>技能</h2>
            
            <h3>编程与脚本</h3>
            <ul>
              <li>Python</li>
              <li>JavaScript</li>
              <li>SQL</li>
              <li>C++</li>
              <li>MATLAB</li>
              <li>PHP</li>
            </ul>
            
            <h3>框架与工具</h3>
            <ul>
              <li>React</li>
              <li>Node.js</li>
              <li>Git (CI/CD)</li>
              <li>n8n</li>
              <li>Dify</li>
            </ul>
            
            <h3>数据分析与机器学习</h3>
            <ul>
              <li>TensorFlow</li>
              <li>PyTorch</li>
              <li>Pandas</li>
              <li>Power BI</li>
            </ul>
            
            <h3>语言</h3>
            <ul>
              <li>德语（流利）</li>
              <li>英语（流利）</li>
              <li>中文（母语）</li>
            </ul>
          </ResumeContent>
        </TabPanel>
      </Tabs>
    </AppContainer>
  );
}

export default App;