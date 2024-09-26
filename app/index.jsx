import React, { useEffect, useRef, useState } from "react";
import { View, Text, Pressable, Animated, Image } from "react-native";
import { useRouter, useFocusEffect } from "expo-router"; // useFocusEffect for navigation focus
import { Video } from "expo-av";
import { useSelector } from "react-redux";

export default function Index() {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity for fade-in effect
  const [showContent, setShowContent] = useState(false); // To control fade-in content
  const router = useRouter();
  const videoRef = useRef(null); // Reference to the video player

  // Access login status from Redux store
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useFocusEffect(
    React.useCallback(() => {
      const resetAndPlayVideo = async () => {
        if (videoRef.current) {
          try {
            await videoRef.current.setPositionAsync(0); // Reset video to the beginning
            await videoRef.current.playAsync(); // Play the video
          } catch (error) {
            console.error("Error resetting or playing video:", error);
          }
        }
      };

      resetAndPlayVideo(); // Call the async function to handle the video

      // Show the content (logo and button) after the video plays for 3 seconds
      const timer = setTimeout(() => {
        setShowContent(true);
        fadeIn(); // Trigger the fade-in effect
      }, 3000); // Delay of 3 seconds for video duration

      return () => {
        clearTimeout(timer); // Clear timeout when the screen is unfocused or unmounted
      };
    }, [])
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
  const handleGetStarted = async () => {
    if (videoRef.current) {
      try {
        await videoRef.current.pauseAsync(); // Pause the video before navigating
      } catch (error) {
        console.error("Error pausing the video:", error);
      }
    }

    // Navigate based on login status
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
        ref={videoRef} // Reference to video component
        source={require("../assets/intro.mp4")} // Use require for local assets
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: -1,
        }}
        onPlaybackStatusUpdate={async (status) => {
          if (status.didJustFinish) {
            try {
              await videoRef.current.replayAsync(); // Replay the video when it finishes
            } catch (error) {
              console.error("Error replaying video:", error);
            }
          }
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
