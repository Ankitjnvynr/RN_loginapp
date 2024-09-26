import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest, loginSuccess, loginFailure } from '../redux/authSlice';
import { router, useSegments } from 'expo-router'; // Using Expo Router for navigation

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  // Handle phone number login
  const handleLogin = () => {
    if (phoneNumber.trim() === '') {
      dispatch(loginFailure('Phone number cannot be empty'));
      return;
    }

    dispatch(loginRequest());

    // Simulate login logic (replace this with API logic)
    if (phoneNumber === '1234567890') {
      // On successful login
      dispatch(loginSuccess({ phoneNumber }));
      router.push('/login/otp'); // Navigate to OTP screen
    } else {
      // On login failure
      dispatch(loginFailure('Invalid phone number'));
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require('../../assets/logo.png')} style={styles.logo} />

      {/* Title */}
      <Text style={styles.title}>Login to your account</Text>

      {/* Input field for phone number login */}
      <TextInput
        style={styles.input}
        placeholder="Enter phone number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />

      {/* Phone login submit button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleLogin} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.submitButtonText}>Login with Phone</Text>
        )}
      </TouchableOpacity>

      {/* Error message */}
      {auth.error && <Text style={styles.error}>{auth.error}</Text>}

      {/* Welcome message */}
      {auth.isAuthenticated && <Text>Welcome, {auth.user?.phoneNumber || auth.user?.name}!</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#8B3E2F',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  submitButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#FF8C00',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

// Expo Router configuration to hide the header
export const config = {
  options: {
    headerShown: false, // Hides the header on this screen
  },
};

export default LoginScreen;
