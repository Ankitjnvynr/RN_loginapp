import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

export default function SettingLayout() {
  return (
    <Stack headerTitle="settings">
      <Stack.Screen name="index" />
    </Stack>
  );
}
