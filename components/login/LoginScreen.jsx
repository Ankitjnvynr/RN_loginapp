import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice'
import { router } from 'expo-router';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = () => {
    if (username && password) {
      dispatch(login({ username })); // Dispatch login action
      router.push('/')
    }
  };

  return (
    <View>
      <Text>Login</Text>
      <TextInput 
        placeholder="Username" 
        value={username} 
        onChangeText={setUsername} 
      />
      <TextInput 
        placeholder="Password" 
        value={password} 
        secureTextEntry 
        onChangeText={setPassword} 
      />
      <Button title="Login" onPress={handleLogin} />
      <Text >.</Text>
      <Button title='Go to Home' onPress={()=>router.push('/')} />
    </View>
  );
};

export default LoginScreen;
