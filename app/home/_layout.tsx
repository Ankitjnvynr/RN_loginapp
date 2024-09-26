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

  // Simulate component mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !isLoggedIn) {
      router.replace('/login'); // Redirect to login after mount
    }
  }, [isMounted, isLoggedIn]);

  if (!isMounted || !isLoggedIn) {
    return null; // Return nothing until layout is mounted
  }
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
