function TabNavigation({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'chat', name: '聊天助手', icon: '💬' },
    { id: 'resume', name: '工作经历', icon: '📋' },
    { id: 'skills', name: '技能专长', icon: '🛠️' }
  ]

  return (
    <div className="flex justify-center">
      <div className="bg-white rounded-lg shadow-md p-1 flex space-x-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 rounded-md font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-blue-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default TabNavigation