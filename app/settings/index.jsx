import React from "react";
import { View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Button } from "react-native-paper";
import Animated, { FadeIn } from "react-native-reanimated";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; // Import the icons

export default function IndexScreen () {
  return (
    <View style={styles.container}>
      <Animated.View entering={FadeIn.duration(800)}>
        <Link href="/settings/mypledge">
          <Button
            mode="contained"
            icon={() => <Icon name="heart-outline" size={20} color="white" />}
            style={styles.button}
          >
            My Pledge
          </Button>
        </Link>
      </Animated.View>

      <Animated.View entering={FadeIn.duration(900)}>
        <Link href="/settings/language">
          <Button
            mode="contained"
            icon={() => <Icon name="translate" size={20} color="white" />}
            style={styles.button}
          >
            Select Language
          </Button>
        </Link>
      </Animated.View>

      <Animated.View entering={FadeIn.duration(1000)}>
        <Link href="/settings/help">
          <Button
            mode="contained"
            icon={() => (
              <Icon name="help-circle-outline" size={20} color="white" />
            )}
            style={styles.button}
          >
            My Help
          </Button>
        </Link>
      </Animated.View>

      <Animated.View entering={FadeIn.duration(1100)}>
        <Link href="/settings/eventgroup">
          <Button
            mode="contained"
            icon={() => <Icon name="calendar" size={20} color="white" />}
            style={styles.button}
          >
            Events & Groups
          </Button>
        </Link>
      </Animated.View>

      <Animated.View entering={FadeIn.duration(1200)}>
        <Link href="/settings/promotional">
          <Button
            mode="contained"
            icon={() => <Icon name="bullhorn" size={20} color="white" />}
            style={styles.button}
          >
            Promotional Material
          </Button>
        </Link>
      </Animated.View>

      <Animated.View entering={FadeIn.duration(1300)}>
        <Link href="/settings/logout">
          <Button
            mode="contained"
            icon={() => <Icon name="logout" size={20} color="white" />}
            style={styles.button}
          >
            LogOut
          </Button>
        </Link>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#f0f0f0",
  },
  button: {
    marginVertical: 10,
    padding: 10,
  },
});
