import React, { useEffect, useRef, useState, useCallback } from "react";
import { View, Text, Pressable, Animated, Image } from "react-native";
import { useRouter } from "expo-router";
import { Video } from "expo-av";
import { useSelector } from "react-redux";
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect

export default function Index() {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity for fade-in effect
  const [showContent, setShowContent] = useState(false); // To control fade-in content
  const router = useRouter();
  const videoRef = useRef(null); // Ref for Video component

  // Access login status from Redux store
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useFocusEffect(
    useCallback(() => {
      if (videoRef.current) {
        // Stop the video and then replay it
        videoRef.current.stopAsync().then(() => {
          videoRef.current.playAsync();
        });
      }

      // Reset the content state and fade-in animation
      setShowContent(false);
      fadeAnim.setValue(0);

      setTimeout(() => {
        setShowContent(true);
        fadeIn(); // Trigger the fade-in effect
      }, 3000); // Delay of 3 seconds for video duration

    }, []) // Empty dependency array means this will run every time the screen is focused
  );

  // Fade-in animation for the logo and button
  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1, // Final opacity value
      duration: 1000, // Duration of the fade effect
      useNativeDriver: true, // Use native driver for smoother animations
    }).start();
  };

  // Handle button click
  const handleGetStarted = () => {
    if (isLoggedIn) {
      router.push("/home"); // Navigate to home if logged in
    } else {
      router.push("/login"); // Navigate to login if not logged in
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
        gap: 20,
      }}
    >
      {/* Video Component */}
      <Video
        ref={videoRef} // Attach the ref to the Video component
        source={require("../assets/intro.mp4")} // Use require for local assets
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: -1,
        }}
      />

      {/* Content to fade in */}
      {showContent && (
        <Animated.View style={{ opacity: fadeAnim, alignItems: "center" }}>
          {/* Logo */}
          <Image
            style={{
              height: 100, // Adjust the size as needed
              width: 100,
              zIndex: 2,
              marginTop: 140,
            }}
            source={require("../assets/logo.png")} // Use require for local assets
          />
          <Text style={{ color: "white", fontSize: 40, marginBottom: 20 }}>
            GIEO GITA
          </Text>

          {/* Get Started Button */}
          <Pressable
            onPress={handleGetStarted}
            style={{
              backgroundColor: "white",
              padding: 15,
              borderRadius: 5,
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Text style={{ fontSize: 18, color: "black" }}>Get Started</Text>
          </Pressable>
        </Animated.View>
      )}
    </View>
  );
}
