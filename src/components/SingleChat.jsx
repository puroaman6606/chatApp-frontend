// import React, { useEffect, useState, useRef } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import axios from "axios";
// import { toast } from "react-toastify";
// import io from "socket.io-client";
// import ScrollableChat from "./ScrollableChat";
// import { getSender, getSenderFull } from "../config/ChatLogics";
// import { setSelectedChat, setNotification } from "../redux/chatSlice";

// const ENDPOINT = "http://localhost:5000";

// const SingleChat = () => {
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [newMessage, setNewMessage] = useState("");

//   // 1. Store Socket in State so it never gets "lost"
//   const [socket, setSocket] = useState(null);

//   const dispatch = useDispatch();

//   const { selectedChat, notification } = useSelector((state) => state.chat);
//   const { userInfo } = useSelector((state) => state.auth);

//   // Ref to keep track of selected chat inside listeners
//   const selectedChatRef = useRef(selectedChat);
//   useEffect(() => {
//     selectedChatRef.current = selectedChat;
//   }, [selectedChat]);

//   // 2. Initialize Socket ONE time
//   useEffect(() => {
//     if (!userInfo) return;

//     // Create connection
//     const newSocket = io(ENDPOINT);

//     // Setup user room
//     newSocket.emit("setup", userInfo);
//     newSocket.on("connected", () => console.log("FrontEnd Connected to Socket"));

//     // Save to state
//     setSocket(newSocket);

//     // Cleanup on unmount
//     return () => {
//       newSocket.disconnect();
//     };
//   }, [userInfo]);

//   // 3. Fetch Messages & Join Chat Room
//   const fetchMessages = async () => {
//     if (!selectedChat) return;

//     try {
//       setLoading(true);
//       const config = {
//         headers: { Authorization: `Bearer ${userInfo.token}` },
//       };

//       const { data } = await axios.get(`/api/message/${selectedChat._id}`, config);

//       setMessages(data);
//       setLoading(false);

//       // Join the chat room
//       if (socket) {
//         socket.emit("join chat", selectedChat._id);
//       }
//     } catch (error) {
//       toast.error("Failed to Load the Messages");
//       setLoading(false);
//     }
//   };

//   // 4. Fetch when chat changes (Wait for socket to be ready)
//   useEffect(() => {
//     // Only fetch if socket is initialized so we can "join chat" correctly
//     if (socket) {
//       fetchMessages();
//     }
//     // eslint-disable-next-line
//   }, [selectedChat, socket]); // Run when either Chat changes OR Socket connects

//   // 5. Send Message Logic
//   const sendMessage = async (event) => {
//     if (event.key === "Enter" && newMessage.trim()) {
//       try {
//         const messageToSend = newMessage;
//         setNewMessage("");

//         const config = {
//           headers: {
//             "Content-type": "application/json",
//             Authorization: `Bearer ${userInfo.token}`,
//           },
//         };

//         const { data } = await axios.post(
//           "/api/message",
//           {
//             content: messageToSend,
//             chatId: selectedChat._id,
//           },
//           config
//         );

//         setMessages((prev) => [...prev, data]);

//         if (socket) {
//           socket.emit("new message", data);
//         }
//       } catch (error) {
//         toast.error("Failed to send the Message");
//       }
//     }
//   };

//   // 6. The Listener (Now using the 'socket' from state)
//   useEffect(() => {
//     if (!socket) return;

//     const handleMessageReceived = (newMessageRecieved) => {
//       console.log("Message Received from Socket:", newMessageRecieved);

//       const currentChat = selectedChatRef.current;

//       // Check if message belongs to current chat
//       if (!currentChat || currentChat._id !== newMessageRecieved.chat._id) {
//          dispatch(setNotification(newMessageRecieved));
//       } else {
//          // Update UI
//          setMessages((prev) => [...prev, newMessageRecieved]);
//       }
//     };

//     // Attach listener
//     socket.on("message received", handleMessageReceived);

//     // Detach listener on cleanup
//     return () => {
//       socket.off("message received", handleMessageReceived);
//     };
//   }, [socket]); // Re-run this ONLY if the socket connection changes

//   // Mobile Back Button
//   const handleBack = () => {
//     dispatch(setSelectedChat(null));
//   };

//   return (
//     <>
//       {selectedChat ? (
//         <div className="flex flex-col h-full w-full">
//           {/* Header */}
//           <div className="flex items-center justify-between pb-3 px-2 w-full border-b border-gray-200 mb-2">
//             <button
//               className="md:hidden p-2 mr-2 bg-gray-200 rounded-lg"
//               onClick={handleBack}
//             >
//               <i className="fas fa-arrow-left"></i>
//             </button>

//             <span className="text-xl font-sans font-semibold text-gray-700">
//               {!selectedChat.isGroupChat
//                 ? getSender(userInfo, selectedChat.users)
//                 : selectedChat.chatName.toUpperCase()}
//             </span>

//             {!selectedChat.isGroupChat && (
//               <div className="bg-gray-100 p-2 rounded-full">
//                 <img
//                   src={getSenderFull(userInfo, selectedChat.users).pic}
//                   alt="Profile"
//                   className="h-8 w-8 rounded-full object-cover"
//                 />
//               </div>
//             )}
//           </div>

//           {/* Chat Body */}
//           <div className="flex flex-col justify-between h-full w-full overflow-y-hidden bg-gray-50 rounded-lg p-3 shadow-inner">
//             {loading ? (
//               <div className="self-center m-auto text-xl">Loading messages...</div>
//             ) : (
//               <div className="flex flex-col overflow-y-scroll scrollbar-hide h-full">
//                 <ScrollableChat messages={messages} />
//               </div>
//             )}

//             {/* Input */}
//             <div className="mt-3">
//               <input
//                 type="text"
//                 className="w-full bg-gray-200 p-3 rounded-lg outline-none focus:bg-gray-100 focus:ring-2 focus:ring-blue-400 transition"
//                 placeholder="Type a message and hit Enter..."
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 value={newMessage}
//                 onKeyDown={sendMessage}
//               />
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="flex items-center justify-center h-full flex-col">
//           <h1 className="text-3xl pb-3 font-sans text-gray-400">
//             Click on a user to start chatting
//           </h1>
//         </div>
//       )}
//     </>
//   );
// };

import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import io from "socket.io-client";
import ScrollableChat from "./ScrollableChat";
import { getSender, getSenderFull } from "../config/ChatLogics";
import { setSelectedChat, setNotification } from "../redux/chatSlice";
import ProfileModal from "./miscellaneous/ProfileModal";

const ENDPOINT = "https://chatapp-backend-nj3a.onrender.com";

const SingleChat = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [isOnline, setIsOnline] = useState(false);
  
  // 1. TYPING STATE
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const dispatch = useDispatch();
  const { selectedChat } = useSelector((state) => state.chat);
  const { userInfo } = useSelector((state) => state.auth);

  const selectedChatRef = useRef(selectedChat);
  useEffect(() => {
    selectedChatRef.current = selectedChat;
  }, [selectedChat]);

  // Socket Init
  useEffect(() => {
    if (!userInfo) return;
    const newSocket = io(ENDPOINT);
    newSocket.emit("setup", userInfo);
    newSocket.on("connected", () => console.log("Connected to Socket"));
    
    // 2. LISTEN FOR TYPING EVENTS
    newSocket.on("typing", () => setIsTyping(true));
    newSocket.on("stop typing", () => setIsTyping(false));

    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, [userInfo]);

  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      setLoading(true);
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      const { data } = await axios.get(`/api/message/${selectedChat._id}`, config);
      setMessages(data);
      setLoading(false);
      if (socket) {
        socket.emit("join chat", selectedChat._id);
      }
    } catch (error) {
      toast.error("Failed to Load Messages");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (socket) fetchMessages();
    // Reset typing state when chat changes
    setIsTyping(false); 
    // eslint-disable-next-line
  }, [selectedChat, socket]);

  // Online Status Logic
  useEffect(() => {
    if (!socket || !selectedChat || selectedChat.isGroupChat) return;
    const otherUser = selectedChat.users.find(u => u._id !== userInfo._id);
    if (otherUser) socket.emit("check-online", otherUser._id);

    const handleStatus = ({ userId, isOnline: status }) => {
      if (otherUser && userId === otherUser._id) setIsOnline(status);
    };
    const handleUserOnline = (userId) => {
      if (otherUser && userId === otherUser._id) setIsOnline(true);
    };
    const handleUserOffline = (userId) => {
      if (otherUser && userId === otherUser._id) setIsOnline(false);
    };

    socket.on("online-status", handleStatus);
    socket.on("user-online", handleUserOnline);
    socket.on("user-offline", handleUserOffline);

    return () => {
      socket.off("online-status", handleStatus);
      socket.off("user-online", handleUserOnline);
      socket.off("user-offline", handleUserOffline);
    };
  }, [socket, selectedChat, userInfo]);

  const sendMessage = async (event) => {
    if ((event.key === "Enter" || event.type === "click") && newMessage.trim()) {
      // Stop typing animation immediately when sent
      socket.emit("stop typing", selectedChat._id);
      setTyping(false);
      
      try {
        const messageToSend = newMessage;
        setNewMessage("");
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const { data } = await axios.post(
          "/api/message",
          { content: messageToSend, chatId: selectedChat._id },
          config
        );
        setMessages((prev) => [...prev, data]);
        if (socket) {
          socket.emit("new message", data);
        }
      } catch (error) {
        toast.error("Failed to send Message");
      }
    }
  };

  // 3. TYPING HANDLER LOGIC
  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socket) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }

    // Debouncing: Stop typing if no key pressed for 3 seconds
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  useEffect(() => {
    if (!socket) return;
    const handleMessageReceived = (newMessageRecieved) => {
      const currentChat = selectedChatRef.current;
      if (!currentChat || currentChat._id !== newMessageRecieved.chat._id) {
         dispatch(setNotification(newMessageRecieved));
      } else {
         setMessages((prev) => [...prev, newMessageRecieved]);
      }
    };
    socket.on("message received", handleMessageReceived);
    return () => {
      socket.off("message received", handleMessageReceived);
    };
  }, [socket]);

  const handleBack = () => {
    dispatch(setSelectedChat(null));
  };

  return (
    <>
      {selectedChat ? (
        <div className="flex flex-col h-full w-full">
          {/* Header */}
          <div className="flex items-center justify-between py-3 px-4 w-full border-b border-gray-100 bg-white/50 backdrop-blur-sm shadow-sm z-10">
            <div className="flex items-center gap-3">
                <button className="md:hidden p-2 text-gray-500 rounded-full" onClick={handleBack}>
                    <i className="fas fa-arrow-left"></i>
                </button>

              {!selectedChat.isGroupChat ? (
                    <div className="relative">
                         <img
                            src={getSenderFull(userInfo, selectedChat.users).pic}
                            alt="Profile"
                            className="h-10 w-10 rounded-full object-cover border border-gray-200"
                        />
                        {isOnline && (
                          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 border-2 border-white rounded-full shadow-sm"></span>
                        )}
                    </div>
                ) : (
                     <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 border border-indigo-200">
                        <i className="fas fa-users"></i>
                     </div>
                )}

                <div className="flex flex-col">
                    <span className="text-lg font-bold text-gray-800 leading-tight">
                        {!selectedChat.isGroupChat
                            ? getSender(userInfo, selectedChat.users)
                            : selectedChat.chatName}
                    </span>
                    
                    {!selectedChat.isGroupChat && (
                        <span className={`text-xs font-bold transition-colors duration-300 ${isOnline ? "text-green-500" : "text-gray-400"}`}>
                            {isOnline ? "Active Now" : "Offline"}
                        </span>
                    )}
                </div>
            </div>

            {/* Right Side: Profile Info Button */}
            {!selectedChat.isGroupChat ? (
                <ProfileModal user={getSenderFull(userInfo, selectedChat.users)}>
                    <button className="text-gray-400 hover:text-indigo-600 transition-colors p-2 rounded-full hover:bg-gray-100">
                        <i className="fas fa-info-circle text-xl"></i>
                    </button>
                </ProfileModal>
            ) : (
                /* Group Info Placeholder (We can add GroupUpdateModal here later) */
                <button className="text-gray-300 cursor-not-allowed p-2" title="Group Info coming soon">
                    <i className="fas fa-info-circle text-xl"></i>
                </button>
            )}
          </div>

          {/* Chat Body */}
          <div className="flex flex-col flex-1 w-full overflow-y-hidden bg-gray-50 relative">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                   <i className="fas fa-circle-notch fa-spin text-3xl text-indigo-500"></i>
              </div>
            ) : (
              <div className="flex flex-col overflow-y-scroll custom-scrollbar h-full p-4">
                <ScrollableChat messages={messages} />
                
                {/* 4. TYPING INDICATOR UI */}
                {isTyping && (
                  <div className="flex items-center gap-2 mt-2 ml-2">
                     <div className="relative flex items-center justify-center bg-gray-200 rounded-full h-8 w-14 p-2 rounded-bl-none">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
                          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
                        </div>
                     </div>
                     <span className="text-xs text-gray-400 italic">Typing...</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-100">
             <div className="relative flex items-center gap-2">
                <button className="text-gray-400 hover:text-indigo-500 p-2 transition-colors">
                    <i className="far fa-smile text-xl"></i>
                </button>
                <input
                    type="text"
                    className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-full outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all shadow-inner placeholder-gray-400"
                    placeholder="Type a message..."
                    // 5. CONNECT THE HANDLER
                    onChange={typingHandler}
                    value={newMessage}
                    onKeyDown={sendMessage}
                />
                <button 
                    onClick={(e) => newMessage.trim() && sendMessage({ type: 'click' })}
                    disabled={!newMessage.trim()}
                    className={`group p-3 rounded-full flex items-center justify-center transition-all duration-300 ease-out
                        ${newMessage.trim() 
                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:scale-110 active:scale-90 cursor-pointer' 
                            : 'bg-gray-100 text-gray-300 cursor-default'
                        }`}
                >
                    <i className="fas fa-paper-plane text-lg transform transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 pr-1 pt-0.5"></i>
                </button>
             </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full flex-col gap-4 opacity-80 p-8 text-center">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                Welcome to Text-A-Lot
            </h1>
            <p className="text-gray-500 text-lg">Select a user to start chatting.</p>
        </div>
      )}
    </>
  );
};

export default SingleChat;