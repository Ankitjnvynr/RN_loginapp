import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { LoginScreen } from '@/components';
import { useRouter } from 'expo-router';
import { useSelector } from 'react-redux';

export default function Index() {
  const router = useRouter();
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      router.replace('/'); // Redirect to the home page if logged in
    }
  }, [isLoggedIn]);

  return (
    <>
      {!isLoggedIn && <LoginScreen />}
    </>
  );
}
