

// import React, { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../../redux/authSlice";
// import { setSelectedChat, setChats, setNotifications } from "../../redux/chatSlice";
// import { toast, ToastContainer } from "react-toastify";
// import UserListItem from "../UserAvatar/UserListItem";
// import { getSender } from "../../config/ChatLogics";

// const SideDrawer = () => {
//   const [search, setSearch] = useState("");
//   const [searchResult, setSearchResult] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [loadingChat, setLoadingChat] = useState(false);

//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [isNotifOpen, setIsNotifOpen] = useState(false);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const notifRef = useRef(null);
//   const profileRef = useRef(null);

//   // Global State
//   const { userInfo } = useSelector((state) => state.auth);
//   const { chats, notification } = useSelector((state) => state.chat);

//   // Close dropdowns on outside click
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (notifRef.current && !notifRef.current.contains(e.target)) {
//         setIsNotifOpen(false);
//       }
//       if (profileRef.current && !profileRef.current.contains(e.target)) {
//         setIsProfileOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const logoutHandler = () => {
//     dispatch(logout());
//     navigate("/");
//   };

//   const handleSearch = async () => {
//     if (!search.trim()) {
//       toast.warning("Please enter something in search");
//       return;
//     }

//     try {
//       setLoading(true);
//       const config = {
//         headers: { Authorization: `Bearer ${userInfo.token}` },
//       };

//       const { data } = await axios.get(`/api/user?search=${search}`, config);
//       setSearchResult(data);
//       setLoading(false);
//     } catch (error) {
//       toast.error("Failed to Load the Search Results");
//       setLoading(false);
//     }
//   };

//   const accessChat = async (userId) => {
//     try {
//       setLoadingChat(true);

//       const config = {
//         headers: {
//           "Content-type": "application/json",
//           Authorization: `Bearer ${userInfo.token}`,
//         },
//       };

//       const { data } = await axios.post(`/api/chat`, { userId }, config);

//       if (!chats.find((c) => c._id === data._id)) {
//         dispatch(setChats([data, ...chats]));
//       }

//       dispatch(setSelectedChat(data));
//       setIsDrawerOpen(false);
//       setLoadingChat(false);
//     } catch (error) {
//       toast.error("Error fetching the chat");
//       setLoadingChat(false);
//     }
//   };

//   const openDrawer = () => {
//     setIsDrawerOpen(true);
//     setIsNotifOpen(false);
//     setIsProfileOpen(false);
//   };

//   return (
//     <>
//       {/* TOP NAV */}
//       <div className="flex justify-between items-center bg-white w-full p-2 border-b-4 border-gray-100">
//         {/* Search Button */}
//         <button
//           onClick={openDrawer}
//           className="flex items-center gap-2 px-3 py-1 hover:bg-gray-100 rounded text-gray-600 transition"
//         >
//           <i className="fas fa-search"></i>
//           <span className="hidden md:inline font-medium">Search User</span>
//         </button>

//         <h1 className="text-2xl font-bold text-gray-700 font-sans">Text-A-Lot</h1>

//         <div className="flex items-center gap-4">
//           {/* 🔔 Notification Bell */}
//           <div ref={notifRef} className="relative">
//             <button
//               onClick={() => {
//                 setIsNotifOpen((prev) => !prev);
//                 setIsProfileOpen(false);
//               }}
//               className="relative"
//             >
//               <i className="fas fa-bell text-2xl text-gray-600 hover:text-blue-500 transition m-1"></i>

//               {/* Badge */}
//               {notification.length > 0 && (
//                 <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center transform translate-x-1 -translate-y-1">
//                   {notification.length}
//                 </span>
//               )}
//             </button>

//             {/* Dropdown */}
//             {isNotifOpen && (
//               <div className="absolute right-0 mt-2 w-64 bg-white shadow-xl rounded-lg border border-gray-100 z-50">
//                 {!notification.length ? (
//                   <div className="p-4 text-sm text-gray-500 text-center">
//                     No New Messages
//                   </div>
//                 ) : (
//                   notification.map((notif) => (
//                     <div
//                       key={notif._id}
//                       onClick={() => {
//                         dispatch(setSelectedChat(notif.chat));

//                         // remove clicked notification
//                         dispatch(
//                           setNotifications(notification.filter((n) => n._id !== notif._id))
//                         );

//                         setIsNotifOpen(false);
//                       }}
//                       className="p-3 border-b text-sm hover:bg-gray-100 cursor-pointer text-gray-700 font-semibold"
//                     >
//                       {notif.chat.isGroupChat
//                         ? `New Message in ${notif.chat.chatName}`
//                         : `New Message from ${getSender(userInfo, notif.chat.users)}`}
//                     </div>
//                   ))
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Profile Menu */}
//           <div ref={profileRef} className="relative">
//             <button
//               onClick={() => {
//                 setIsProfileOpen((prev) => !prev);
//                 setIsNotifOpen(false);
//               }}
//               className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg hover:bg-gray-200"
//             >
//               <img
//                 src={userInfo.pic}
//                 alt={userInfo.name}
//                 className="w-8 h-8 rounded-full object-cover"
//               />
//               <i className="fas fa-chevron-down text-xs ml-1"></i>
//             </button>

//             {isProfileOpen && (
//               <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border">
//                 <div className="px-4 py-2 text-sm text-gray-700 border-b">
//                   Logged in as <b>{userInfo.name}</b>
//                 </div>
//                 <button
//                   onClick={logoutHandler}
//                   className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
//                 >
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* DRAWER OVERLAY */}
//       {isDrawerOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-40"
//           onClick={() => setIsDrawerOpen(false)}
//         ></div>
//       )}

//       {/* DRAWER */}
//       <div
//         className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
//           isDrawerOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         <div className="p-4 border-b flex items-center justify-between">
//           <h2 className="text-lg font-bold">Search Users</h2>

//           <button
//             onClick={() => setIsDrawerOpen(false)}
//             className="text-gray-500 hover:text-gray-800"
//           >
//             <i className="fas fa-times text-lg"></i>
//           </button>
//         </div>

//         <div className="p-4 flex gap-2">
//           <input
//             placeholder="Search by name or email"
//             className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//           <button
//             onClick={handleSearch}
//             className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//           >
//             Go
//           </button>
//         </div>

//         <div className="px-4 h-full overflow-y-auto pb-20">
//           {loading ? (
//             <div className="text-center mt-4">Loading...</div>
//           ) : (
//             searchResult?.map((user) => (
//               <UserListItem
//                 key={user._id}
//                 user={user}
//                 handleFunction={() => accessChat(user._id)}
//               />
//             ))
//           )}

//           {loadingChat && (
//             <div className="text-center text-blue-500 mt-2">Opening Chat...</div>
//           )}
//         </div>
//       </div>

//       <ToastContainer />
//     </>
//   );
// };

// export default SideDrawer;


import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";
import { setSelectedChat, setChats, setNotifications } from "../../redux/chatSlice";
import { toast, ToastContainer } from "react-toastify";
import UserListItem from "../UserAvatar/UserListItem";
import { getSender } from "../../config/ChatLogics";
import ProfileModal from "./ProfileModal"; // <--- 1. Import ProfileModal

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  const { userInfo } = useSelector((state) => state.auth);
  const { chats, notification } = useSelector((state) => state.chat);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setIsNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleSearch = async () => {
    if (!search.trim()) {
      toast.warning("Please enter something in search");
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      };

      // const { data } = await axios.get(`/api/user?search=${search}`, config);
      const { data } = await axios.get(`https://chatapp-backend-nj3a.onrender.com/api/user?search=${search}`,config);
      setSearchResult(data);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to Load the Search Results");
      setLoading(false);
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      // const { data } = await axios.post(`/api/chat`, { userId }, config);
      const { data } = await axios.post(
  `https://chatapp-backend-nj3a.onrender.com/api/chat`,
  { userId },
  config
);

      if (!chats.find((c) => c._id === data._id)) {
        dispatch(setChats([data, ...chats]));
      }

      dispatch(setSelectedChat(data));
      setIsDrawerOpen(false);
      setLoadingChat(false);
    } catch (error) {
      toast.error("Error fetching the chat");
      setLoadingChat(false);
    }
  };

  const openDrawer = () => {
    setIsDrawerOpen(true);
    setIsNotifOpen(false);
    setIsProfileOpen(false);
  };

  return (
    <>
      {/* --- TOP NAVIGATION BAR --- */}
      <div className="flex justify-between items-center w-full px-6 py-3 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm sticky top-0 z-20">
        
        
        {/* Search Trigger (Pill Style) */}
        <div 
          onClick={openDrawer}
          className="flex items-center gap-3 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full cursor-pointer transition-all duration-200 group w-48 md:w-64"
        >
          <i className="fas fa-search text-gray-500 group-hover:text-indigo-600 transition-colors"></i>
          <span className="text-sm font-medium text-gray-500 group-hover:text-gray-700">Search User...</span>
        </div>


          {/* Profile Menu */}
          <div ref={profileRef} className="relative mr-200">
            <button
              onClick={() => {
                setIsProfileOpen((prev) => !prev);
                setIsNotifOpen(false);
              }}
              className="flex items-center gap-2 hover:bg-gray-100 p-1 pr-2 rounded-full transition-all border border-transparent hover:border-gray-200 focus:outline-none"
            >
              <img
                src={userInfo.pic}
                alt={userInfo.name}
                className="w-9 h-9 rounded-full object-cover border border-gray-300"
              />
              <i className="fas fa-chevron-down text-xs text-gray-500"></i>
            </button>

            {/* Profile Dropdown */}
           {/* Profile Dropdown */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-fade-in-up origin-top-right">
                
                {/* 1. Header Section (User Identity Card) */}
                {/* We wrap the whole header in ProfileModal so clicking anywhere opens the profile */}
                <ProfileModal user={userInfo}>
                    <div className="relative p-5 bg-gradient-to-br from-indigo-50 via-white to-purple-50 border-b border-gray-100 cursor-pointer group hover:bg-gray-50 transition-colors">
                        
                        <div className="flex items-center gap-4">
                            {/* Avatar with Ring */}
                            <img
                                src={userInfo.pic}
                                alt={userInfo.name}
                                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md group-hover:scale-105 transition-transform duration-300"
                            />
                            
                            {/* Text Details */}
                            <div className="flex flex-col overflow-hidden">
                                <span className="text-base font-bold text-gray-800 truncate group-hover:text-indigo-600 transition-colors">
                                    {userInfo.name}
                                </span>
                                <span className="text-xs text-gray-500 truncate font-medium">
                                    {userInfo.email}
                                </span>
                            </div>
                        </div>

                        {/* Visual "Arrow" indicator */}
                        <div className="absolute top-5 right-5 text-gray-300 group-hover:text-indigo-400 transition-colors">
                            <i className="fas fa-chevron-right text-xs"></i>
                        </div>
                    </div>
                </ProfileModal>

                {/* 2. Menu Actions */}
                <div className="p-2 flex flex-col gap-1">
                    
                    {/* View Profile Button (Explicit Action) */}
                    <ProfileModal user={userInfo}>
                        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-all group">
                            <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-100 transition-colors">
                                <i className="far fa-id-badge"></i>
                            </div>
                            <div className="flex flex-col items-start">
                                <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">My Profile</span>
                                <span className="text-[10px] text-gray-400">Account settings & details</span>
                            </div>
                        </button>
                    </ProfileModal>

                    {/* Divider Line */}
                    <div className="h-px bg-gray-100 my-1 mx-2"></div>

                    {/* Logout Button */}
                    <button
                        onClick={logoutHandler}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-50 transition-all group"
                    >
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 group-hover:bg-red-100 group-hover:text-red-500 transition-colors">
                            <i className="fas fa-sign-out-alt ml-0.5"></i>
                        </div>
                        <div className="flex flex-col items-start">
                            <span className="text-sm font-semibold text-gray-700 group-hover:text-red-600">Sign Out</span>
                        </div>
                    </button>
                </div>

                {/* Footer / Version Info */}
                <div className="bg-gray-50 py-2 text-center border-t border-gray-100">
                    <p className="text-[10px] text-gray-400 font-medium">Text-A-Lot v1.0 • Secure</p>
                </div>

              </div>
            )}
       </div> 
        {/* Brand Logo */}
        <h1 className="text-2xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 cursor-default hidden md:block">
          Text-A-Lot
        </h1>

        {/* Right Actions */}
        <div className="flex items-center gap-5">
          
          {/* 🔔 Notification Bell */}
          <div ref={notifRef} className="relative">
            <button
              onClick={() => {
                setIsNotifOpen((prev) => !prev);
                setIsProfileOpen(false);
              }}
              className="relative p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none"
            >
              <i className={`fas fa-bell text-xl ${isNotifOpen ? 'text-indigo-600' : 'text-gray-500'} hover:text-indigo-600 transition-colors`}></i>

              {/* Red Badge */}
              {notification.length > 0 && (
                <span className="absolute top-1 right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-white"></span>
              )}
            </button>

            {/* Notification Dropdown */}
            {isNotifOpen && (
              <div className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 animation-fade-in-down">
                <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50">
                    <h3 className="text-sm font-bold text-gray-700">Notifications</h3>
                </div>
                {!notification.length ? (
                  <div className="p-6 text-sm text-gray-400 text-center italic">
                    No new messages
                  </div>
                ) : (
                  <div className="max-h-64 overflow-y-auto">
                    {notification.map((notif) => (
                      <div
                        key={notif._id}
                        onClick={() => {
                          dispatch(setSelectedChat(notif.chat));
                          dispatch(setNotifications(notification.filter((n) => n._id !== notif._id)));
                          setIsNotifOpen(false);
                        }}
                        className="px-4 py-3 border-b border-gray-50 hover:bg-indigo-50 cursor-pointer transition-colors flex items-start gap-3"
                      >
                          <div className="h-2 w-2 mt-2 rounded-full bg-indigo-500 shrink-0"></div>
                          <div className="text-sm text-gray-700">
                            {notif.chat.isGroupChat
                              ? <span>New message in <b>{notif.chat.chatName}</b></span>
                              : <span>New message from <b>{getSender(userInfo, notif.chat.users)}</b></span>}
                          </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* --- DRAWER OVERLAY --- */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setIsDrawerOpen(false)}
        ></div>
      )}

      {/* --- SIDE DRAWER --- */}
      <div
        className={`fixed top-0 left-0 h-full w-full md:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 h-full flex flex-col">
          {/* Drawer Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Search Users</h2>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>

          {/* Search Input (Modern Style) */}
          <div className="flex gap-2 mb-6">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-search text-gray-400"></i>
                </div>
                <input
                  placeholder="Search by name or email"
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all text-gray-700 font-medium"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow-md font-medium"
            >
              Go
            </button>
          </div>

          {/* Results List */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {loading ? (
               <div className="flex justify-center items-center h-32">
                 <i className="fas fa-circle-notch fa-spin text-indigo-500 text-2xl"></i>
               </div>
            ) : (
              <div className="flex flex-col gap-2">
                {searchResult?.map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => accessChat(user._id)}
                  />
                ))}
                {!loading && searchResult.length === 0 && search && (
                   <div className="text-center text-gray-400 mt-10">No users found</div>
                )}
              </div>
            )}
            {loadingChat && (
               <div className="flex justify-center items-center mt-4 text-indigo-600 font-medium gap-2">
                 <i className="fas fa-spinner fa-spin"></i> Opening chat...
               </div>
            )}
          </div>
        </div>
      </div>

      <ToastContainer position="bottom-right" />
    </>
  );
};

export default SideDrawer;