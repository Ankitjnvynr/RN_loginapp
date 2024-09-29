import { View, ScrollView } from "react-native";
import React from "react";
import { TotalChants, YourChants,ChantCounter } from "@/components";
// import {chantScreen} from '@/components/home/chantScreen'

export default function Chants() {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <TotalChants />
        <YourChants />
        <ChantCounter />
      </ScrollView>
    </View>
  );
}
