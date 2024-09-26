import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { verifyOtpRequest, verifyOtpSuccess, verifyOtpFailure } from '../redux/authSlice';
import { router, useLocalSearchParams } from 'expo-router';

const OTP_LENGTH = 4; // Assuming a 4-digit OTP
const RESEND_TIMEOUT = 30; // Timeout for resending OTP in seconds

const OtpScreen = () => {
  const { phoneNumber } = useLocalSearchParams(); // Retrieve phone number from navigation params
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(RESEND_TIMEOUT); // Countdown for resend
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    // Start countdown when the screen loads
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer); // Cleanup timer on unmount
  }, []);

  const handleOtpVerification = () => {
    if (otp.trim().length !== OTP_LENGTH) {
      dispatch(verifyOtpFailure(`OTP must be ${OTP_LENGTH} digits`));
      return;
    }

    setLoading(true);
    dispatch(verifyOtpRequest());

    // Simulate OTP verification logic (replace with actual API call)
    setTimeout(() => {
      if (otp === '1234') {
        dispatch(verifyOtpSuccess({ phoneNumber }));
        setLoading(false);
        router.push('/home'); // Navigate to the home screen on successful OTP verification
      } else {
        dispatch(verifyOtpFailure('Invalid OTP'));
        setLoading(false);
      }
    }, 1000); // Simulate delay for verification
  };

  const handleResendOtp = () => {
    if (countdown === 0) {
      setCountdown(RESEND_TIMEOUT); // Reset countdown
      // Logic for resending the OTP can be added here
      console.log('OTP resent to', phoneNumber); // For debugging, replace with actual OTP resend logic
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require('../../assets/logo.png')} style={styles.logo} />

      {/* Title */}
      <Text style={styles.title}>Enter OTP sent to {phoneNumber}</Text>

      {/* Input field for OTP */}
      <TextInput
        style={styles.input}
        placeholder={`Enter ${OTP_LENGTH}-digit OTP`}
        value={otp}
        onChangeText={setOtp}
        keyboardType="numeric"
        maxLength={OTP_LENGTH} // Limiting the input to OTP length
      />

      {/* Countdown timer and resend option */}
      <Text style={styles.countdown}>
        {countdown > 0 ? `Resend OTP in ${countdown}s` : 'Didn\'t receive the OTP?'}
      </Text>

      {/* Resend OTP Button */}
      <TouchableOpacity
        style={[styles.resendButton, countdown > 0 && styles.resendButtonDisabled]} 
        onPress={handleResendOtp}
        disabled={countdown > 0}
      >
        <Text style={styles.resendButtonText}>
          {countdown > 0 ? 'Resend OTP' : 'Send again'}
        </Text>
      </TouchableOpacity>

      {/* OTP verification button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleOtpVerification} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.submitButtonText}>Verify OTP</Text>
        )}
      </TouchableOpacity>

      {/* Error message */}
      {auth.error && <Text style={styles.error}>{auth.error}</Text>}
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
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
  },
  countdown: {
    fontSize: 16,
    marginBottom: 20,
    color: '#FF8C00',
    textAlign: 'center',
  },
  resendButton: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#FF8C00',
    marginBottom: 20,
  },
  resendButtonDisabled: {
    backgroundColor: '#ccc', // Disabled state color
  },
  resendButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
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
    textAlign: 'center',
  },
});

// Expo Router configuration to hide the header
export const config = {
  options: {
    headerShown: false, // Hides the header on this screen
  },
};

export default OtpScreen;
