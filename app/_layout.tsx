import { Stack, Tabs, Slot, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { Provider } from "react-redux";
import store from '@/components/redux/store'

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Tracks login status
  const [loading, setLoading] = useState(true); // For handling loading state
  const router = useRouter();

  useEffect(() => {
    // Simulate checking login status
    const checkLoginStatus = async () => {
      // Replace this with actual authentication logic (e.g., AsyncStorage or API check)
      const loggedIn = false; // Set true if user is authenticated
      setIsLoggedIn(loggedIn);
      setLoading(false);
    };
    checkLoginStatus();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }




  return (
    <>
    <Provider store={store} >
    <Stack screenOptions={{
      headerShown:false
    }}>
      <Stack.Screen name="(tabs)"/>
      <Stack.Screen name="login"/>
      
    </Stack>
    </Provider>
    </>
  );
}
