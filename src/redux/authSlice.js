import { createSlice } from '@reduxjs/toolkit';

// Check if user is already in local storage
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userInfo: userInfoFromStorage,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
      // Also clear chats when logging out
      window.location.href = '/'; 
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;