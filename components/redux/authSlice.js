import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // Store user info like phone number
  error: null, // Store error messages
  status: {
    isLoggedIn: false, // Overall login status
    otpVerified: false, // Track OTP verification status
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Login actions
    loginRequest: (state) => {
      state.error = null; // Reset error when login starts
    },
    loginSuccess: (state, action) => {
      state.user = action.payload; // Store user info (e.g., phone number)
      state.status.isLoggedIn = false; // User isn't logged in until OTP is verified
      state.status.otpVerified = false; // Reset OTP status for new login
      state.error = null; // Clear any existing errors
    },
    loginFailure: (state, action) => {
      state.error = action.payload; // Store error on login failure
      state.status.isLoggedIn = false;
    },

    // OTP verification actions
    verifyOtpRequest: (state) => {
      state.error = null; // Clear error when OTP verification starts
    },
    verifyOtpSuccess: (state, action) => {
      state.status.otpVerified = true; // Mark OTP as verified
      state.status.isLoggedIn = true; // User is logged in once OTP is verified
      state.user = { ...state.user, ...action.payload }; // Optionally update user info
      state.error = null; // Clear any existing errors
    },
    verifyOtpFailure: (state, action) => {
      state.error = action.payload; // Capture OTP verification error
      state.status.otpVerified = false; // OTP verification failed
      state.status.isLoggedIn = false; // User not logged in
    },

    // Logout action
    logout: (state) => {
      state.status.isLoggedIn = false;
      state.status.otpVerified = false; // Reset OTP verification status
      state.user = null; // Clear user data
      state.error = null; // Clear error on logout
    },
  },
});

// Exporting actions for use in components
export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  verifyOtpRequest,
  verifyOtpSuccess,
  verifyOtpFailure,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
