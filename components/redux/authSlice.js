import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: true,
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.error = null; // Reset error state on login request
    },
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload; // Store user details (like phone number)
    },
    loginFailure: (state, action) => {
      state.error = action.payload; // Capture error message
      state.isLoggedIn = false;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.error = null;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
