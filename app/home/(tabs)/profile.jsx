import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import Animated, { FadeIn, SlideInDown } from "react-native-reanimated";
import { Link, useRouter } from "expo-router";

export default function ProfileModal() {
  const user = useSelector((state) => state.auth.user); // Fetch user data from Redux
  const router = useRouter(); // To programmatically navigate

  return (
    <Animated.View
      entering={FadeIn}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#00000040",
      }}
    >
      {/* Close modal by pressing outside */}
      <Link href="/home" asChild>
        <Pressable style={StyleSheet.absoluteFill} />
      </Link>

      <Animated.View
        entering={SlideInDown}
        style={{
          width: "90%",
          height: "80%",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          borderRadius: 10,
          padding: 20,
        }}
      >
        {/* Close button in top right */}
        <Pressable
          onPress={() => router.push("/home")}
          style={styles.closeButton}
        >
          <Text style={styles.closeText}>✖</Text>
        </Pressable>

        {/* User Information */}
        <Text style={styles.title}>User Profile</Text>
        {user ? (
          <View style={styles.userInfo}>
            <Text>Name: {user.name || "N/A"}</Text>
            <Text>Email: {user.email || "N/A"}</Text>
            <Text>Phone: {user.phone || "N/A"}</Text>
          </View>
        ) : (
          <Text>No user data available</Text>
        )}

        {/* Edit Info Button */}
        <Pressable
          style={styles.editButton}
          onPress={() => router.push("/edit-profile")} // Navigate to the edit profile page
        >
          <Text style={styles.editButtonText}>Edit Info</Text>
        </Pressable>

        {/* Go back link */}
        <Link href="/home">
          <Text>← Go back</Text>
        </Link>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#ccc",
    padding: 5,
    borderRadius: 20,
  },
  closeText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 20,
  },
  userInfo: {
    marginBottom: 20,
  },
  editButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  editButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
