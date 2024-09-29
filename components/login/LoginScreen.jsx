import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ActivityIndicator, Animated, Easing, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest, loginSuccess, loginFailure } from '../redux/authSlice';
import { router } from 'expo-router'; // Using Expo Router for navigation

const { width, height } = Dimensions.get('window');

const FALL_DURATION = 6000; // Duration for leaf to fall
const NUM_LEAVES = 10; // Number of leaves to animate

// Falling leaf component with delay
const FallingLeaf = ({ source, startX, startY, delay }) => {
  const translateY = useRef(new Animated.Value(startY)).current;
  const translateX = useRef(new Animated.Value(startX)).current;

  useEffect(() => {
    const startFallingAnimation = () => {
      translateY.setValue(-100); // Reset position to top
      translateX.setValue(startX); // Set start position horizontally

      Animated.sequence([
        Animated.delay(delay), // Add delay before animation starts
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: height + 100, // End at the bottom of the screen
            duration: FALL_DURATION,
            easing: Easing.radial,
            useNativeDriver: true,
          }),
          Animated.timing(translateX, {
            toValue: startX + Math.random() * 100 - 50, // Horizontal oscillation
            duration: FALL_DURATION,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => startFallingAnimation()); // Loop the animation
    };

    startFallingAnimation();
  }, [translateX, translateY, delay]);

  return (
    <Animated.Image
      source={source}
      style={[styles.leaf, { transform: [{ translateY }, { translateX }] }]}
    />
  );
};

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  // Handle phone number login
  const handleLogin = () => {
    if (phoneNumber.trim() === "") {
      dispatch(loginFailure("Phone number cannot be empty"));
      return;
    }

    dispatch(loginRequest());
    setLoading(true);

    // Simulate login logic (replace this with your actual API logic)
    setTimeout(() => {
      // Simulated login success
      if (phoneNumber) {
        // Use the phone number from your auth slice for the simulation
        dispatch(
          loginSuccess({
            name: "ankit",
            phone: phoneNumber,
            dob: "2/9/2024",
            address: "VPO BAkana",
          })
        );
        setLoading(false);
        router.push("/login/otp"); // Navigate to OTP screen
      } else {
        // On login failure
        dispatch(loginFailure("Invalid phone number"));
        setLoading(false);
      }
    }, 1000);
  };

  // Generate falling leaves with random positions and delays
  const leaves = Array.from({ length: NUM_LEAVES }).map((_, index) => (
    <FallingLeaf
      key={index}
      source={require("../../assets/leaf.png")} // Use your leaf image here
      startX={Math.random() * width}
      startY={-Math.random() * height}
      delay={index * 500} // Add delay between each leaf animation
    />
  ));

  return (
    <View style={styles.container}>
      {/* Falling leaves animation, absolutely positioned */}
      <View style={StyleSheet.absoluteFill}>{leaves}</View>

      {/* Logo */}
      <Image source={require("../../assets/logo.png")} style={styles.logo} />

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
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.submitButtonText}>Login with Phone</Text>
        )}
      </TouchableOpacity>

      {/* Error message */}
      {auth.error && <Text style={styles.error}>{auth.error}</Text>}

      {/* Welcome message */}
      {auth.isLoggedIn && <Text>Welcome, {auth.user?.name}!</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#8B3E2F",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#e0e0e0",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    zIndex: 10,
  },
  submitButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#FF8C00",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginTop: 10,
  },
  leaf: {
    position: "absolute",
    width: 80, // Increased the width
    height: 80, // Increased the height
    resizeMode: "contain",
  },
});

// Expo Router configuration to hide the header
export const config = {
  options: {
    headerShown: false, // Hides the header on this screen
  },
};

export default LoginScreen;
