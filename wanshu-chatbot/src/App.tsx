import { useState } from 'react'
import ChatWindow from './components/ChatWindow'
import PersonalInfo from './components/PersonalInfo'
import TabNavigation from './components/TabNavigation'
import ResumeTab from './components/ResumeTab'
import SkillsTab from './components/SkillsTab'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('chat')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">江婉舒的职业助手</h1>
          <p className="text-gray-600">了解更多关于我的职业背景和专业技能</p>
        </header>

        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="mt-8">
          {activeTab === 'chat' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <PersonalInfo />
              </div>
              <div className="lg:col-span-2">
                <ChatWindow />
              </div>
            </div>
          )}
          {activeTab === 'resume' && <ResumeTab />}
          {activeTab === 'skills' && <SkillsTab />}
        </div>
      </div>
    </div>
  )
}

export default App