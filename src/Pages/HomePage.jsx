// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useSelector } from 'react-redux' // Import useSelector
// import Login from '../components/Authentication/Login'
// import Signup from '../components/Authentication/Signup'

// const HomePage = () => {
//   const navigate = useNavigate()
//   const [activeTab, setActiveTab] = useState('login')
  
//   // Access global state to see if user is already logged in
//   const { userInfo } = useSelector((state) => state.auth)

//   useEffect(() => {
//     if (userInfo) {
//       navigate('/chats')
//     }
//   }, [navigate, userInfo])

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 bg-[url('https://wallpapers.com/images/hd/whatsapp-background-2912-x-1632-7s134j7113115456.jpg')] bg-cover">
//       <div className="bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden opacity-95">
//         <div className="p-6 bg-blue-600 text-center">
//           <h1 className="text-3xl font-bold text-white">Let's Chat</h1>
//         </div>
//         <div className="flex w-full">
//           <button 
//             className={`w-1/2 p-4 text-lg font-semibold transition ${
//               activeTab === 'login' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-500 hover:bg-gray-50'
//             }`}
//             onClick={() => setActiveTab('login')}
//           >
//             Login
//           </button>
//           <button 
//             className={`w-1/2 p-4 text-lg font-semibold transition ${
//               activeTab === 'signup' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-500 hover:bg-gray-50'
//             }`}
//             onClick={() => setActiveTab('signup')}
//           >
//             Sign Up
//           </button>
//         </div>
//         <div className="p-6">
//           {activeTab === 'login' ? <Login /> : <Signup />}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default HomePage


import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Login from '../components/Authentication/Login'
import Signup from '../components/Authentication/Signup'

const HomePage = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('login')
  
  // Logic remains untouched
  const { userInfo } = useSelector((state) => state.auth)

  useEffect(() => {
    if (userInfo) {
      navigate('/chats')
    }
  }, [navigate, userInfo])

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-900">
      {/* Main Card Container with Glassmorphism */}
      <div className="bg-white/95 backdrop-blur-sm w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-white/20">
        
        {/* Header Section */}
        <div className="pt-8 pb-6 px-8 text-center">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-2">
            Text-A-Lot
          </h1>
          <p className="text-gray-500 text-sm font-medium">
            Connect seamlessly with your circle.
          </p>
        </div>

        {/* Modern Segmented Control Tabs */}
        <div className="px-8 mb-6">
          <div className="flex bg-gray-100 p-1 rounded-xl">
            <button 
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all duration-300 ease-in-out ${
                activeTab === 'login' 
                  ? 'bg-white text-indigo-600 shadow-md transform scale-[1.02]' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('login')}
            >
              Log In
            </button>
            <button 
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all duration-300 ease-in-out ${
                activeTab === 'signup' 
                  ? 'bg-white text-indigo-600 shadow-md transform scale-[1.02]' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('signup')}
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="px-8 pb-8">
          {/* We add a small animation wrapper for smoothness */}
          <div className="transition-opacity duration-300">
             {activeTab === 'login' ? <Login /> : <Signup />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage