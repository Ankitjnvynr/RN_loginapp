import { View, Text, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { useSelector } from 'react-redux';

export default function Index() {
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

  return (
    <View>
      <Text>Main App Content (User Logged In)</Text>
      <Button title='Go to Login' onPress={()=>router.push('/login')} />
    </View>
  );
}
