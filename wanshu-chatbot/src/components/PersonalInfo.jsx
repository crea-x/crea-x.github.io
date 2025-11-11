function PersonalInfo() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 h-fit">
      <div className="text-center">
        <div className="w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
          <span className="text-white text-4xl font-bold">江</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">江婉舒 (Wanshu Jiang)</h2>
        <p className="text-gray-600 mb-4">认知系统硕士 • 生物医学工程学士</p>
        
        <div className="text-left space-y-2 text-sm text-gray-600">
          <p><strong>地址:</strong> Manfred-Börner Straße 5, 89081 Ulm, Germany</p>
          <p><strong>电话:</strong> +49 1624830759</p>
          <p><strong>邮箱:</strong> wanshu212@gmail.com</p>
        </div>
      </div>
    </div>
  )
}

export default PersonalInfo