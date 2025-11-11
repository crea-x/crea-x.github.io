function ResumeTab() {
  const education = [
    {
      period: '2023年10月 - 至今',
      degree: '认知系统硕士学位',
      school: '德国乌尔姆大学',
      location: '乌姆, 德国'
    },
    {
      period: '2019年8月 - 2023年7月',
      degree: '生物医学工程学士学位 (重点: 生物信息学)',
      school: '东南大学',
      location: '南京, 中国'
    }
  ]

  const experience = [
    {
      period: '2025年5月 - 2025年7月',
      position: '学生助理 - 原子吸收信号数据分析',
      company: '乌尔姆大学',
      location: '乌姆, 德国',
      achievements: [
        '使用Python开发自动化工具链，用于AAS信号分析（数据清理、曲线拟合、参数提取）',
        '利用并行化和批处理流程提高大数据集处理效率',
        '将工作流程文档化并交付为支持CI的可重用脚本'
      ]
    },
    {
      period: '2024年7月 - 2024年9月',
      position: '一带一路信息分析和监控系统开发',
      company: '东南大学',
      location: '南京, 中国',
      achievements: [
        '基于Dify开发国际监控系统，用于收集、分析和可视化"一带一路"地区新闻',
        '实现多源数据采集模块（RSS、JSON、API）、文本处理和可视化功能',
        '构建基于LLM的自动分类、内容分析和摘要生成管道',
        '实现自动报告功能，包括每日/每周报告、热点分析和PDF/Word导出',
        '创建前端界面用于管理分析任务、报告计划和警报规则'
      ]
    }
  ]

  const projects = [
    {
      period: '2024年4月 - 2024年6月',
      name: '使用n8n和LLM的自动发票处理系统',
      achievements: [
        '构建自动n8n工作流，监控和处理发票邮件，集成Microsoft 365、AI API和SQL数据库',
        '实现基于Google Gemini的AI管道，通过HTTP请求节点进行文档分类和结构化数据提取',
        '建立端到端流程，从邮件过滤和OCR处理到自动Excel导出'
      ]
    }
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Education */}
      <section className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          🎓 教育背景
        </h2>
        <div className="space-y-4">
          {education.map((edu, index) => (
            <div key={index} className="border-l-4 border-blue-500 pl-4">
              <div className="text-sm text-blue-600 font-medium">{edu.period}</div>
              <h3 className="text-lg font-semibold text-gray-800">{edu.degree}</h3>
              <p className="text-gray-600">{edu.school} • {edu.location}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          💼 工作经验
        </h2>
        <div className="space-y-6">
          {experience.map((exp, index) => (
            <div key={index} className="border-l-4 border-green-500 pl-4">
              <div className="text-sm text-green-600 font-medium">{exp.period}</div>
              <h3 className="text-lg font-semibold text-gray-800">{exp.position}</h3>
              <p className="text-gray-600 mb-3">{exp.company} • {exp.location}</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {exp.achievements.map((achievement, idx) => (
                  <li key={idx}>{achievement}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          🚀 项目经验
        </h2>
        <div className="space-y-6">
          {projects.map((project, index) => (
            <div key={index} className="border-l-4 border-purple-500 pl-4">
              <div className="text-sm text-purple-600 font-medium">{project.period}</div>
              <h3 className="text-lg font-semibold text-gray-800">{project.name}</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {project.achievements.map((achievement, idx) => (
                  <li key={idx}>{achievement}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default ResumeTab