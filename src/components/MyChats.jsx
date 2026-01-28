// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { toast } from 'react-toastify'
// import axios from 'axios'
// import { setSelectedChat, setChats } from '../redux/chatSlice'
// import { getSender } from '../config/ChatLogics'

// const MyChats = () => {
//   // REMOVED: const [loggedUser, setLoggedUser] = useState() <--- No longer needed
  
//   const dispatch = useDispatch()
  
//   // Access Global State directly
//   const { selectedChat, chats } = useSelector((state) => state.chat)
//   const { userInfo } = useSelector((state) => state.auth) // <--- Use this instead

//   const fetchChats = async () => {
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${userInfo.token}`,
//         },
//       }

//       const { data } = await axios.get("/api/chat", config)
//       dispatch(setChats(data))
      
//     } catch (error) {
//       toast.error("Failed to Load the chats")
//     }
//   }

//   useEffect(() => {
//     // REMOVED: setLoggedUser(...)
//     fetchChats()
//     // eslint-disable-next-line
//   }, [])

//   return (
//     <div className={`
//       flex flex-col items-center p-3 bg-white w-full md:w-1/3 rounded-lg border border-gray-200 
//       ${selectedChat ? 'hidden md:flex' : 'flex'} 
//       h-full
//     `}>
//       <div className="pb-3 px-3 text-2xl font-sans flex w-full justify-between items-center">
//         My Chats
//       </div>

//       <div className="flex flex-col w-full h-full p-3 bg-gray-50 rounded-lg overflow-y-hidden">
//         {chats ? (
//           <div className="overflow-y-scroll scrollbar-hide">
//             {chats.map((chat) => (
//               <div
//                 key={chat._id}
//                 onClick={() => dispatch(setSelectedChat(chat))}
//                 className={`
//                   cursor-pointer px-3 py-4 rounded-lg mb-2 transition-colors duration-200
//                   ${selectedChat === chat ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}
//                 `}
//               >
//                 <p className="font-medium">
//                   {/* FIX: Check if isGroupChat is false, then use userInfo directly */}
//                   {!chat.isGroupChat
//                     ? getSender(userInfo, chat.users) // <--- Changed loggedUser to userInfo
//                     : chat.chatName}
//                 </p>
                
//                 {chat.latestMessage && (
//                   <p className="text-xs mt-1 opacity-80 truncate">
//                     <b>{chat.latestMessage.sender.name}: </b>
//                     {chat.latestMessage.content.length > 50
//                       ? chat.latestMessage.content.substring(0, 51) + "..."
//                       : chat.latestMessage.content}
//                   </p>
//                 )}
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="flex justify-center items-center h-full">Loading...</div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default MyChats


import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import axios from 'axios'
import { setSelectedChat, setChats } from '../redux/chatSlice'
import { getSender, getSenderFull } from '../config/ChatLogics' // Added getSenderFull for Avatars

const MyChats = () => {
  const dispatch = useDispatch()
  
  // Access Global State
  const { selectedChat, chats } = useSelector((state) => state.chat)
  const { userInfo } = useSelector((state) => state.auth)

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      // const { data } = await axios.get("/api/chat", config)
      const { data } = await axios.get(
  "https://chatapp-backend-nj3a.onrender.com/api/chat", 
  config
);
      dispatch(setChats(data))
      
    } catch (error) {
      toast.error("Failed to Load the chats")
    }
  }

  useEffect(() => {
    fetchChats()
    // eslint-disable-next-line
  }, [])

  return (
    <div className={`
      flex-col p-4 bg-white/95 backdrop-blur-sm w-full md:w-1/3 rounded-2xl shadow-xl border border-white/20 
      ${selectedChat ? 'hidden md:flex' : 'flex'} 
      h-full overflow-hidden
    `}>
      
      {/* Header Section */}
      <div className="pb-4 px-2 flex w-full justify-between items-center border-b border-gray-100 mb-2">
        <h2 className="text-2xl font-black text-gray-800 tracking-tight">
          Chats
        </h2>
        
        {/* Visual "New Group" Button (Logic can be added later) */}
        <button className="p-2 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-full transition-all shadow-sm border border-gray-200">
           <i className="fas fa-plus text-sm"></i>
        </button>
      </div>

      {/* Chat List Container */}
      <div className="flex flex-col w-full h-full overflow-y-hidden">
        {chats ? (
          <div className="overflow-y-auto custom-scrollbar flex flex-col gap-2 pr-1 pb-2">
            {chats.map((chat) => {
                // Determine Logic for Display
                const isSelected = selectedChat === chat;
                const chatName = !chat.isGroupChat ? getSender(userInfo, chat.users) : chat.chatName;
                const chatPic = !chat.isGroupChat 
                    ? getSenderFull(userInfo, chat.users).pic 
                    : "https://cdn-icons-png.flaticon.com/512/166/166258.png"; // Generic Group Icon

                return (
                  <div
                    key={chat._id}
                    onClick={() => dispatch(setSelectedChat(chat))}
                    className={`
                      cursor-pointer px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-4 border
                      ${isSelected 
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md border-transparent transform scale-[1.01]" 
                        : "bg-white hover:bg-gray-50 text-gray-800 border-transparent hover:border-gray-100"}
                    `}
                  >
                    {/* Avatar */}
                    <div className="relative shrink-0">
                        <img 
                            src={chatPic} 
                            alt="avatar" 
                            className={`w-10 h-10 rounded-full object-cover border-2 ${isSelected ? 'border-white/30' : 'border-gray-100'}`}
                        />
                        {/* Online Status Dot (Visual Only for now) */}
                        {!chat.isGroupChat && (
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
                        )}
                    </div>

                    {/* Text Content */}
                    <div className="flex flex-col overflow-hidden w-full">
                      <div className="flex justify-between items-center">
                          <p className={`font-bold text-sm truncate ${isSelected ? 'text-white' : 'text-gray-800'}`}>
                            {chatName}
                          </p>
                          {/* Timestamp Placeholder (can be added later) */}
                          {/* <span className={`text-[10px] ${isSelected ? 'text-indigo-200' : 'text-gray-400'}`}>10:30 AM</span> */}
                      </div>
                      
                      {chat.latestMessage ? (
                        <p className={`text-xs mt-0.5 truncate ${isSelected ? 'text-indigo-100' : 'text-gray-500'}`}>
                          <span className="font-semibold">
                            {chat.latestMessage.sender._id === userInfo._id ? "You: " : chat.latestMessage.sender.name + ": "}
                          </span>
                          {chat.latestMessage.content.length > 50
                            ? chat.latestMessage.content.substring(0, 51) + "..."
                            : chat.latestMessage.content}
                        </p>
                      ) : (
                        <p className={`text-xs italic mt-0.5 ${isSelected ? 'text-indigo-200' : 'text-gray-400'}`}>
                           Start a conversation
                        </p>
                      )}
                    </div>
                  </div>
                )
            })}
            
            {/* Empty State if no chats */}
            {chats.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center mt-10 opacity-60">
                    <i className="far fa-comments text-4xl text-gray-300 mb-2"></i>
                    <p className="text-sm text-gray-500">No chats yet.</p>
                    <p className="text-xs text-gray-400">Search for a user to start chatting.</p>
                </div>
            )}
          </div>
        ) : (
           // Skeleton Loading Effect (Optional upgrade)
           <div className="flex flex-col gap-3 mt-4">
              {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse flex items-center gap-3 p-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                      <div className="flex-1 space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                          <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                      </div>
                  </div>
              ))}
           </div>
        )}
      </div>
    </div>
  )
}

export default MyChats