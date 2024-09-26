import { Tabs, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useSelector } from 'react-redux';

export default function TabLayout() {
  const router = useRouter();
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn); // Get login status from Redux
  const [isMounted, setIsMounted] = useState(false); // Track if the component is mounted
  const colorScheme = useColorScheme(); // Move the hook outside the conditional rendering

  // Simulate component mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !isLoggedIn) {
      router.replace('/login'); // Redirect to login if not logged in after mount
    }
  }, [isMounted, isLoggedIn]);

  // Prevent the layout from rendering until the component is mounted and user login is verified
  if (!isMounted || !isLoggedIn) {
    return null; // Return nothing until layout is mounted or user is logged in
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint, // Ensure colorScheme is used here
        headerShown: true, // Hide the header for the tab layout
      }}
    >
      {/* Home Tab */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />

      {/* Profile Tab */}
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'person' : 'person-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
