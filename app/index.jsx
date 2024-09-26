import React, { useEffect, useRef, useState } from "react";
import { View, Text, Pressable, Animated, Image } from "react-native";
import { Link, useRouter } from "expo-router";
import { Video } from "expo-av";
import { useSelector } from "react-redux";

export default function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Simulate user login state
  const [showContent, setShowContent] = useState(false); // To control fade-in content
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity for fade-in effect
  const router = useRouter();
  const checklogin = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    // Simulate login check
    const checkLoginStatus = async () => {
      // Simulate an API call or login state check
      setTimeout(() => {
        setIsLoggedIn(checklogin); // Set to true if user is logged in
      }, 100); // Delay for 1 second for simulation
    };

    checkLoginStatus();

    // Show the content (logo and button) after video plays for 3 seconds
    setTimeout(() => {
      setShowContent(true);
      fadeIn(); // Trigger the fade-in effect
    }, 3000); // Delay of 3 seconds for video duration
  }, []);

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
        console.log("yes");
        
      router.push("/home"); // Navigate to home if logged in
    } else {
        console.log('No');
        
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
      }}
    >
      {/* Video Component */}
      <Video
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
            }}
            source={require("../assets/logo.png")} // Use require for local assets
          />
          <Text style={{ color: "white", fontSize: 40, marginBottom: 20 }}>
            Your Logo
          </Text>

          {/* Get Started Button */}
          <Pressable
            onPress={()=>{
                router.push('/login');
            }}
            style={{
              backgroundColor: "white",
              padding: 15,
              borderRadius: 5,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 18, color: "black" }}>Get Started</Text>
          </Pressable>
          <Link href={'/login'} >go to loign</Link>
        </Animated.View>
      )}
    </View>
  );
}
