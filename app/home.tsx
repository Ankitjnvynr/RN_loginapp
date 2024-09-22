import { router } from 'expo-router';
import { View, Text, Button } from 'react-native';



export default function HomeScreen() {
  return (
    <View>
      <Text>Welcome to the Home Screen! yes it is home </Text>
      <Button onPress={()=>router.push('/login')} title='Login'/>
    </View>
  );
}
