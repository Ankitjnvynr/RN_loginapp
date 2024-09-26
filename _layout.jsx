import { Link, Tabs, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useSelector } from "react-redux";
import { Image, StyleSheet, Text, View } from "react-native";

export default function TabLayout() {
  const router = useRouter();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); // Get login status from Redux
  const [isMounted, setIsMounted] = useState(false); // Track if the component is mounted
  const colorScheme = useColorScheme(); // Move the hook outside the conditional rendering

  // Simulate component mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !isLoggedIn) {
      router.replace("/login"); // Redirect to login if not logged in after mount
    }
  }, [isMounted, isLoggedIn]);

  // Prevent the layout from rendering until the component is mounted and user login is verified
  if (!isMounted || !isLoggedIn) {
    return null; // Return nothing until layout is mounted or user is logged in
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint, // Ensure colorScheme is used here
        headerShown: true, // Show the header for the tab layout
        headerLeft: () => (
          <Image
            source={require("@/assets/logo.png")} // Adjust the path to your logo image
            style={{ width: 50, height: 50, marginLeft: 10 }} // Set appropriate width and height for your logo
          />
        ),
        headerTitle: () => (
          <View style={styles.headingbox}>
            <Text style={styles.headingBig}>Gita Jeewan Geet</Text>
            <Text style={styles.headingSmall}>Eighteen verse Gita recition campaign</Text>
          </View>
        ),
        headerRight: () => (
          <Link href={"/settings"}>
            <Image
              source={require("@/assets/images/avtar.png")} // Adjust the path to your avatar image
              style={styles.headerRightImage} // Set appropriate width, height, and position for your image
            />
          </Link>
        ),
        headerTitleAlign: "center", // Center-align the header title
      }}
    >
      {/* Home Tab */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />

      {/* Chants Tab */}
      <Tabs.Screen
        name="chants"
        options={{
          title: "Chants",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "person" : "person-outline"}
              color={color}
            />
          ),
        }}
      />

      {/* Reading Tab */}
      <Tabs.Screen
        name="reading"
        options={{
          title: "Reading",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "person" : "person-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  headingbox: {
    flex: 1, // Takes up the full space
    justifyContent: "center", // Center vertically
    alignItems: "center",
    textAlign:'center', // Center horizontally
    
  },
  headingBig: {
    fontSize: 20, // Make the font size bigger
    fontWeight: "bold", // Optional, makes the text bold
  },
  headingSmall: {
    fontSize: 11, // Make the font size bigger
    // Optional, makes the text bold
  },
  headerRightImage: {
    width: 40, // Set appropriate width
    height: 40, // Set appropriate height
    //marginRight: 10, // Adjust right margin
    //borderColor:'red',borderWidth:1
  },
});
