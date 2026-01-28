// import React, { useEffect, useRef } from 'react'
// import { useSelector } from 'react-redux'

// const ScrollableChat = ({ messages }) => {
//   const { userInfo } = useSelector((state) => state.auth)
  
//   // 1. Create a reference for the bottom of the chat
//   const messagesEndRef = useRef(null)

//   // 2. Auto-scroll function
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
//   }

//   // 3. Run auto-scroll whenever 'messages' array changes
//   useEffect(() => {
//     scrollToBottom()
//   }, [messages])

//   // Helper to check sender
//   const isSameSender = (message) => {
//     return message.sender._id === userInfo._id
//   }

//   return (
//     <div className="flex flex-col overflow-y-scroll scrollbar-hide p-2">
//       {messages && messages.map((m, i) => (
//         <div key={m._id} className={`flex ${isSameSender(m) ? "justify-end" : "justify-start"} mb-4`}>
          
//           {/* Avatar (Only show for other person) */}
//           {!isSameSender(m) && (
//              <div className="tooltip" title={m.sender.name}>
//                <img 
//                 src={m.sender.pic} 
//                 alt={m.sender.name}
//                 className="w-8 h-8 rounded-full mr-2 cursor-pointer object-cover mt-1"
//                />
//             </div>
//           )}

//           {/* Message Bubble */}
//           <span
//             className={`
//               rounded-2xl px-4 py-2 max-w-[75%] shadow-sm
//               ${isSameSender(m) 
//                 ? "bg-blue-600 text-white rounded-br-none" 
//                 : "bg-white text-gray-800 rounded-bl-none border border-gray-200"}
//             `}
//           >
//             {m.content}
//           </span>
//         </div>
//       ))}
      
//       {/* Invisible div at the bottom to scroll to */}
//       <div ref={messagesEndRef} />
//     </div>
//   )
// }

// export default ScrollableChat


import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { getSender } from '../config/ChatLogics'

const ScrollableChat = ({ messages }) => {
  const { userInfo } = useSelector((state) => state.auth)
  
  // 1. Create a reference for the bottom of the chat
  const messagesEndRef = useRef(null)

  // 2. Auto-scroll function
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // 3. Run auto-scroll whenever 'messages' array changes
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Helper to check sender
  const isFromMe = (message) => {
    return message.sender._id === userInfo._id
  }

  return (
    <div className="flex flex-col pb-2">
      {messages && messages.map((m, i) => (
        <div 
          key={m._id} 
          className={`flex w-full ${isFromMe(m) ? "justify-end" : "justify-start"} mb-3`}
        >
          
          {/* Avatar (Left side - Only for other person) */}
          {!isFromMe(m) && (
             <div className="flex flex-col justify-end mr-2 relative group">
                {/* Tooltip on Hover */}
                <span className="absolute bottom-10 left-0 w-max bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                  {m.sender.name}
                </span>
                
                <img 
                  src={m.sender.pic} 
                  alt={m.sender.name}
                  className="w-8 h-8 rounded-full object-cover border border-gray-200 shadow-sm cursor-help"
                />
             </div>
          )}

          {/* Message Bubble */}
          <div className="flex flex-col max-w-[75%]">
            {/* Name Label (Optional - useful in Group Chats) */}
            {/* {!isFromMe(m) && (
               <span className="text-[10px] text-gray-400 ml-1 mb-1">{m.sender.name}</span>
            )} */}

            <div
              className={`
                px-5 py-2.5 shadow-md text-[15px] leading-relaxed break-words relative
                ${isFromMe(m) 
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl rounded-tr-none" 
                  : "bg-white text-gray-800 border border-gray-100 rounded-2xl rounded-tl-none"}
              `}
            >
              {m.content}
            </div>
            
            {/* Tiny Timestamp (Visual Mockup - can be real data later) */}
            <span className={`text-[9px] mt-1 opacity-60 ${isFromMe(m) ? "text-right mr-1" : "text-left ml-1"}`}>
               {/* {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} */}
            </span>
          </div>
        </div>
      ))}
      
      {/* Invisible div at the bottom to scroll to */}
      <div ref={messagesEndRef} />
    </div>
  )
}

export default ScrollableChat