// import React from 'react'
// import { useSelector } from 'react-redux'
// import SingleChat from './SingleChat' // We will create this next

// const ChatBox = () => {
//   const { selectedChat } = useSelector((state) => state.chat)

//   return (
//     <div className={`
//       flex items-center justify-center w-full md:w-2/3 bg-white rounded-lg border border-gray-200 h-full p-4
//       ${selectedChat ? 'flex' : 'hidden md:flex'}
//     `}>
//       {/* This is a container. 
//         If a chat is selected, we show <SingleChat /> (The actual messages).
//         If not, we show a dummy component later.
//       */}
//       <SingleChat /> 
//     </div>
//   )
// }

// export default ChatBox


import React from 'react'
import { useSelector } from 'react-redux'
import SingleChat from './SingleChat'

const ChatBox = () => {
  const { selectedChat } = useSelector((state) => state.chat)

  return (
    <div className={`
      flex flex-col w-full md:w-2/3 h-full 
      bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden
      ${selectedChat ? 'flex' : 'hidden md:flex'}
    `}>
      <SingleChat /> 
    </div>
  )
}

export default ChatBox