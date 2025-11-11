function SkillsTab() {
  const skillCategories = [
    {
      category: '编程与脚本语言',
      skills: ['Python', 'JavaScript', 'SQL', 'C++', 'MATLAB', 'PHP'],
      icon: '💻'
    },
    {
      category: '框架与工具',
      skills: ['React', 'Node.js', 'Git (CI/CD)', 'n8n', 'Dify'],
      icon: '🛠️'
    },
    {
      category: '数据分析与机器学习',
      skills: ['TensorFlow', 'PyTorch', 'Pandas', 'Power BI'],
      icon: '📊'
    },
    {
      category: '语言能力',
      skills: ['德语 (流利)', '英语 (流利)', '中文 (母语)'],
      icon: '🌍'
    }
  ]

  const technicalLevels = [
    { skill: 'Python', level: 95 },
    { skill: 'JavaScript', level: 90 },
    { skill: 'React', level: 85 },
    { skill: '数据分析', level: 88 },
    { skill: '机器学习', level: 82 },
    { skill: '德语', level: 90 }
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Skill Categories */}
      <section className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          🎯 技能分类
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="mr-2">{category.icon}</span>
                {category.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Proficiency */}
      <section className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          📈 技术熟练度
        </h2>
        <div className="space-y-4">
          {technicalLevels.map((item, index) => (
            <div key={index}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">{item.skill}</span>
                <span className="text-sm text-gray-500">{item.level}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${item.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Professional Summary */}
      <section className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          🎨 专业概述
        </h2>
        <div className="prose text-gray-700">
          <p className="mb-4">
            作为一名认知系统硕士研究生和生物医学工程学士，我具备扎实的跨学科背景，
            专注于将人工智能技术应用于实际问题的解决。
          </p>
          <p className="mb-4">
            我的核心优势在于<strong>Python开发</strong>和<strong>数据分析</strong>，
            在机器学习和深度学习方面有丰富的项目经验。
            同时，我也具备全栈开发能力，能够独立构建完整的应用系统。
          </p>
          <p>
            在国际化的学习和工作环境中，我培养了良好的沟通能力和团队协作精神，
            能够熟练使用德语、英语和中文进行专业交流。
          </p>
        </div>
      </section>
    </div>
  )
}

export default SkillsTab