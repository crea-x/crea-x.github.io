import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Sparkles } from 'lucide-react';

const API_URL = 'https://wanshu-chatbot-api.creaaa304.workers.dev';
const AUTH_TOKEN = '267864dbf70ea4be51026484f77aece0d2ebf3522385391dee574103393f4b8a'; 

const App = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const exampleQuestions = [
    "Was sind Wanshus technische Fähigkeiten?",
    "Welche Praktika hat Wanshu absolviert?",
    "Erzähle mir über Wanshus Ausbildung",
    "Welche Programmiersprachen beherrscht Wanshu?"
  ];

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        role: 'assistant',
        content: 'Hallo! Ich bin Wanshus persönlicher AI-Assistent. Ich kann Ihnen Fragen zu seinem beruflichen Werdegang, seinen Fähigkeiten und Projekten beantworten. Wie kann ich Ihnen helfen?'
      }]);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text) => {
    const userMessage = text || input;
    if (!userMessage.trim()) return;

    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${AUTH_TOKEN}`
        },
        body: JSON.stringify({ message: userMessage })
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Entschuldigung, es gab ein Problem bei der Verarbeitung Ihrer Anfrage. Bitte versuchen Sie es später erneut.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl">
              WJ
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Wanshu Jiang</h1>
              <p className="text-purple-300 text-sm">Cognitive Systems | AI & Data Analytics</p>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-black/10 backdrop-blur-md border-b border-white/10 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-1">
            {['chat', 'resume', 'skills'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-medium transition-all ${
                  activeTab === tab
                    ? 'text-white border-b-2 border-purple-500 bg-white/5'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab === 'chat' ? 'AI Assistant' : tab === 'resume' ? 'Erfahrung' : 'Fähigkeiten'}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Chat Tab */}
        {activeTab === 'chat' && (
          <div className="space-y-6">
            {/* Example Questions */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                Beispielfragen
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {exampleQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(q)}
                    className="text-left p-3 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-gray-300 hover:text-white transition-all border border-white/5 hover:border-purple-500/50"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Messages */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden">
              <div className="h-[500px] overflow-y-auto p-6 space-y-4">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                    {msg.role === 'assistant' && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                    )}
                    <div className={`max-w-[80%] p-4 rounded-2xl ${
                      msg.role === 'user'
                        ? 'bg-purple-600 text-white rounded-br-sm'
                        : 'bg-white/10 text-gray-100 rounded-bl-sm'
                    }`}>
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    </div>
                    {msg.role === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="bg-white/10 p-4 rounded-2xl rounded-bl-sm">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <form onSubmit={handleSubmit} className="p-4 bg-black/20 border-t border-white/10">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Stellen Sie eine Frage über Wanshu..."
                    className="flex-1 bg-white/10 text-white placeholder-gray-400 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-white/10"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Resume Tab */}
        {activeTab === 'resume' && (
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
              <h2 className="text-3xl font-bold text-white mb-8">Berufserfahrung</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-purple-300 mb-2">Ausbildung</h3>
                  <div className="space-y-4 pl-4 border-l-2 border-purple-500/30">
                    <div>
                      <div className="text-white font-medium">Master of Science, Cognitive Systems</div>
                      <div className="text-purple-300 text-sm">Universität Ulm • 10/2023 - laufend</div>
                    </div>
                    <div>
                      <div className="text-white font-medium">Bachelor of Science, Biomedical Engineering</div>
                      <div className="text-purple-300 text-sm">Southeast University, Nanjing, China • 08/2019 - 07/2023</div>
                      <div className="text-gray-400 text-sm">Fokus: Bioinformatik</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-purple-300 mb-2">Praktikumserfahrung</h3>
                  <div className="space-y-6 pl-4 border-l-2 border-purple-500/30">
                    <div>
                      <div className="text-white font-medium">HiWi für Analyse von Atomabsorptionssignaldaten</div>
                      <div className="text-purple-300 text-sm mb-2">Universität Ulm • 05/2025 - 07/2025</div>
                      <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
                        <li>Entwickelte automatisierte Python-Toolchains für AAS-Signal-Analyse</li>
                        <li>Parallelisierung & Batch-Prozesse für große Datensätze</li>
                        <li>CI-fähige Skripte mit Dokumentation</li>
                      </ul>
                    </div>
                    <div>
                      <div className="text-white font-medium">Belt and Road Informationsanalyse- und Monitoringsystem</div>
                      <div className="text-purple-300 text-sm mb-2">Southeast University, Nanjing • 07/2024 - 09/2024</div>
                      <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
                        <li>Entwicklung eines internationalen Monitoringsystems auf Dify-Basis</li>
                        <li>Multi-Source-Datenerfassung (RSS, JSON, API)</li>
                        <li>LLM-basierte Pipeline für Klassifikation und Analyse</li>
                        <li>Automatisches Reporting mit Frontend</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-purple-300 mb-2">Projekterfahrung</h3>
                  <div className="space-y-4 pl-4 border-l-2 border-purple-500/30">
                    <div>
                      <div className="text-white font-medium">Automatisierte Rechnungsverarbeitung mit n8n & LLM</div>
                      <div className="text-purple-300 text-sm mb-2">04/2024 - 06/2024</div>
                      <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
                        <li>n8n-Workflow mit Microsoft 365, AI-APIs und SQL</li>
                        <li>KI-Pipeline mit Google Gemini für Dokumentenklassifizierung</li>
                        <li>End-to-End-Prozess von E-Mail-Filterung bis Excel-Export</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
              <h2 className="text-3xl font-bold text-white mb-8">Technische Fähigkeiten</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-lg font-semibold text-purple-300 mb-4">Programming & Scripting</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Python', 'JavaScript', 'SQL', 'C++', 'MATLAB', 'PHP'].map(skill => (
                      <span key={skill} className="bg-purple-600/20 text-purple-200 px-3 py-1 rounded-full text-sm border border-purple-500/30">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-lg font-semibold text-purple-300 mb-4">Frameworks & Tools</h3>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'Node.js', 'Git (CI/CD)', 'n8n', 'Dify'].map(skill => (
                      <span key={skill} className="bg-pink-600/20 text-pink-200 px-3 py-1 rounded-full text-sm border border-pink-500/30">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-lg font-semibold text-purple-300 mb-4">Data Analysis & ML</h3>
                  <div className="flex flex-wrap gap-2">
                    {['TensorFlow', 'PyTorch', 'Pandas', 'Power BI'].map(skill => (
                      <span key={skill} className="bg-blue-600/20 text-blue-200 px-3 py-1 rounded-full text-sm border border-blue-500/30">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-lg font-semibold text-purple-300 mb-4">Sprachen</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Deutsch</span>
                      <span className="text-purple-300">Fließend</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Englisch</span>
                      <span className="text-purple-300">Fließend</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Chinesisch</span>
                      <span className="text-purple-300">Muttersprache</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
              <h3 className="text-xl font-semibold text-purple-300 mb-4">Kontakt</h3>
              <div className="space-y-2 text-gray-300">
                <p>📍 Manfred-Börner Straße 5, 89081 Ulm, Deutschland</p>
                <p>📞 +49 1624830759</p>
                <p>✉️ wanshu212@gmail.com</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;