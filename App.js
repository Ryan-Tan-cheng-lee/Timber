import HomeScreen from './screens/HomeScreen';
import React from 'react';
import { StyleSheet, View, ImageBackground, LogBox } from 'react-native';
import BottomNav from './components/BottomNav';
import BountyScreen from './screens/BountyScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FriendScreen from './screens/FriendScreen';
import SkillScreen from './screens/SkillScreen';
import BountyRequestScreen from './screens/BountyRequestScreen';
import LoginScreen from './screens/LoginScreen';
import SettingScreen from './screens/SettingScreen';
import WorkEntryScreen from './screens/WorkEntryScreen';

const Stack = createNativeStackNavigator();
LogBox.ignoreAllLogs();

export default function App() {
  return (
    <NavigationContainer>
      <ImageBackground source={require('./assets/TimberBG.png')} style={styles.background}>
        <View style={styles.container}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Bounty" component={BountyScreen} />
            <Stack.Screen name="Skill" component={SkillScreen} />
            <Stack.Screen name="Friend" component={FriendScreen} />
            <Stack.Screen name="BountyAdder" component={BountyRequestScreen} />
            <Stack.Screen name="Setting" component={SettingScreen} />
            <Stack.Screen name="WorkEntry" component={WorkEntryScreen} />
          </Stack.Navigator>
        </View>
      </ImageBackground>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
  },
});
