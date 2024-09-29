import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Link } from 'expo-router';


export default function HomeLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerTitle: () => (
            <View style={styles.headingBox}>
              <Text style={styles.headingBig}>Gita Jeewan Geet</Text>
              <Text style={styles.headingSmall}>Eighteen verse Gita recitation campaign</Text>
            </View>
          ),
         
          headerTitleAlign: "center",
        }}
      >
        <Drawer.Screen
          name="(tabs)" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Home',
            title: 'Overview',
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  headingBox: {
    flex: 1, // Takes up the full space
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
    textAlign: "center",
  },
  headingBig: {
    fontSize: 20, // Bigger font size
    fontWeight: "bold", // Bold text
    color:'',
  },
  headingSmall: {
    fontSize: 11, // Smaller font size for subtitle
  },
  headerRightImage: {
    width: 40, // Set appropriate width
    height: 40, // Set appropriate height
    marginRight: 10, // Adjust right margin
  },
});
