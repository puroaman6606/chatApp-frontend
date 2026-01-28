// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   selectedChat: null,     // The active conversation
//   chats: [],              // List of all my chats
//   notification: [],       // Array of unread messages
// };

// const chatSlice = createSlice({
//   name: 'chat',
//   initialState,
//   reducers: {
//     setSelectedChat: (state, action) => {
//       state.selectedChat = action.payload;
//     },
//     setChats: (state, action) => {
//       state.chats = action.payload;
//     },
//     setNotification: (state, action) => {
//       // Add unique notifications only
//       if (!state.notification.includes(action.payload)) {
//         state.notification = [action.payload, ...state.notification];
//       }
//     },
//     clearNotifications: (state, action) => {
//       // Clear notifications for a specific chat
//       state.notification = state.notification.filter(
//         (n) => n.chat._id !== action.payload
//       );
//     },
//   },
// });

// export const { setSelectedChat, setChats, setNotification, clearNotifications } = chatSlice.actions;
// export default chatSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedChat: null,
  chats: [],
  notification: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
    },
    setChats: (state, action) => {
      state.chats = action.payload;
    },
    setNotification: (state, action) => {
      // Logic to ADD a single notification
      // We check by ID to ensure no duplicates
      const exists = state.notification.find(n => n._id === action.payload._id);
      if (!exists) {
        state.notification = [action.payload, ...state.notification];
      }
    },
    // NEW REDUCER: Completely replace the notification list (for clearing)
    setNotifications: (state, action) => {
      state.notification = action.payload;
    },
  },
});

export const { setSelectedChat, setChats, setNotification, setNotifications } = chatSlice.actions;
export default chatSlice.reducer;