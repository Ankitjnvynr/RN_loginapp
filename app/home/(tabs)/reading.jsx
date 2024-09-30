import { View, Text, Button, ToastAndroid } from "react-native";
import React from "react";
import { sendOtp } from "@/components/backend";

export default function reading() {
  const apiUrl = process.env.EXPO_PUBLIC_API_WA;
  const apiUser = process.env.EXPO_PUBLIC_WA_USER;
  const apikey = process.env.EXPO_PUBLIC_WAKEY;

 const showing = async ()=>{
  console.log(apiUrl);
  console.log(apikey);
  console.log(apiUser);
  const res = await sendOtp('918930840560')
  console.log(res);
  
  
 }
  
  
  return (
    <View>
      <Text>reading</Text>
      <Button onPress={showing} title="press me" />
    </View>
  );
}
