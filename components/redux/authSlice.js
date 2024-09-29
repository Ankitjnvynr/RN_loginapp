import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  user: {
    name: 'ankit', // User's name
    phone: '8930840560', // User's phone number
    dob: '2/9/2024', // User's date of birth
    address: 'VPO BAkana', // User's address
  },
  error: null,
  otpVerified: false, // State to track OTP verification
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Login request actions
    loginRequest: (state) => {
      state.error = null; // Reset error state on login request
    },
    loginSuccess: (state, action) => {
      state.user = action.payload; // Store user details (like phone number, name, etc.)
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.error = action.payload; // Capture error message
      state.isLoggedIn = false;
    },

    // OTP verification actions
    verifyOtpRequest: (state) => {
      state.error = null; // Reset error state on OTP request
      state.otpVerified = false;
    },
    verifyOtpSuccess: (state, action) => {
      state.otpVerified = true; // Mark OTP as verified
      state.isLoggedIn = true; // User is considered logged in after OTP verification
      state.user = { ...state.user, ...action.payload }; // Optionally, update the user data
      state.error = null;
    },
    verifyOtpFailure: (state, action) => {
      state.error = action.payload; // Capture error message for OTP failure
      state.otpVerified = false;
      state.isLoggedIn = false;
    },

    // Action to handle user details update
    updateUserDetails: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }; // Merge new details with the existing user object
        state.error = null;
      } else {
        state.error = 'No user is logged in.';
      }
    },

    // Logout action
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = {
        name: '',
        phone: '',
        dob: '',
        address: '',
      }; // Reset user details on logout
      state.otpVerified = false; // Reset OTP verification status
      state.error = null;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  verifyOtpRequest,
  verifyOtpSuccess,
  verifyOtpFailure,
  updateUserDetails, // Export the new action for updating user details
  logout,
} = authSlice.actions;

export default authSlice.reducer;
