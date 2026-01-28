// import React from 'react'
// import { useSelector } from 'react-redux'
// import SideDrawer from '../components/miscellaneous/SideDrawer'
// import MyChats from '../components/MyChats'
// import ChatBox from '../components/ChatBox'

// const ChatPage = () => {
//   // Get User Info from Redux
//   const { userInfo } = useSelector((state) => state.auth)

//   return (
//     <div className="w-full h-screen flex flex-col overflow-hidden bg-gray-50">
      
//       {/* 1. Header (SideDrawer) */}
//       {/* We only show the UI if the user is logged in */}
//       {userInfo && <SideDrawer />}
      
//       {/* 2. Main Chat Area */}
//       <div className="flex w-full h-[91.5vh] p-2 gap-2 justify-between">
        
//         {/* Left Side: My Chats List */}
//         {/* Pass userInfo to ensure it renders only when data exists */}
//         {userInfo && <MyChats />}
        
//         {/* Right Side: Actual Chat Box */}
//         {userInfo && <ChatBox />}
        
//       </div>
//     </div>
//   )
// }

// export default ChatPage


import React from 'react'
import { useSelector } from 'react-redux'
import SideDrawer from '../components/miscellaneous/SideDrawer'
import MyChats from '../components/MyChats'
import ChatBox from '../components/ChatBox'

const ChatPage = () => {
  // Get User Info from Redux
  const { userInfo } = useSelector((state) => state.auth)

  return (
    <div className="w-full h-screen flex flex-col overflow-hidden bg-gray-50">
      
      {/* 1. Header (SideDrawer) */}
      {/* We only show the UI if the user is logged in */}
      {userInfo && <SideDrawer />}
      
      {/* 2. Main Chat Area */}
      <div className="flex w-full h-[91.5vh] p-2 gap-2 justify-between">
        
        {/* Left Side: My Chats List */}
        {/* Pass userInfo to ensure it renders only when data exists */}
        {userInfo && <MyChats />}
        
        {/* Right Side: Actual Chat Box */}
        {userInfo && <ChatBox />}
        
      </div>
    </div>
  )
}

export default ChatPage