import React, { useState, useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest, loginSuccess, loginFailure } from '../redux/authSlice';
import { router } from 'expo-router';

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [tokenFetched, setTokenFetched] = useState(false); // New state to track token fetching
  const dispatch = useDispatch();

  // Request notification permission and get push token
  useEffect(() => {
    registerForPushNotificationsAsync()
      .then(token => {
        if (token) {
          setExpoPushToken(token);
          setTokenFetched(true); // Set flag to true when token is successfully fetched
        } else {
          Alert.alert("Error", "Unable to get Expo push token.");
        }
      })
      .catch(error => {
        Alert.alert("Error", "An error occurred while fetching push token.");
        console.error("Error fetching push token:", error);
      });
  }, []);

  const generateOtp = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };

  const handleLogin = async () => {
    if (phoneNumber.trim() === '') {
      dispatch(loginFailure('Phone number cannot be empty'));
      return;
    }

    if (!tokenFetched) {
      Alert.alert('Error', 'Push token has not been fetched. Please wait a moment.');
      return;
    }

    dispatch(loginRequest());
    setLoading(true);

    try {
      const otp = generateOtp();
      console.log('Generated OTP:', otp); // For debugging

      // Send OTP via push notification
      if (expoPushToken) {
        await sendPushNotification(expoPushToken, otp);
        dispatch(loginSuccess({ phoneNumber, otp }));
        router.push('/login/otp');
      } else {
        dispatch(loginFailure('Failed to get push token.'));
        Alert.alert('Error', 'Push token is missing.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      dispatch(loginFailure('Login failed.'));
      Alert.alert('Error', 'An error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter phone number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleLogin} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.submitButtonText}>Login with Phone</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
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
});

export default LoginScreen;

// Push notification registration and sending functions
async function registerForPushNotificationsAsync() {
  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      throw new Error('Notification permissions not granted');
    }

    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log('Expo Push Token:', token); // Debugging
    return token;
  } catch (error) {
    console.error("Failed to register for notifications:", error);
    return null;
  }
}

async function sendPushNotification(expoPushToken, otp) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Your OTP Code',
    body: `Your OTP is ${otp}`,
    data: { otp },
  };

  try {
    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    const result = await response.json();
    console.log('Push Notification Sent:', result);
  } catch (error) {
    console.error('Error sending push notification:', error);
    throw error;
  }
}
