import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import BottomNav from '../components/BottomNav';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { set } from 'react-native-clipboard';

export default function LoginScreen() {
  const [fontsLoaded] = useFonts({
    'Just Another Hand': require('../assets/fonts/JustAnotherHand-Regular.ttf'),
  });
  const navigation = useNavigation();
  const route = useRoute();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === '' || password === '') {
      // Show error notification for empty field
      Alert.alert('Error', 'Empty field detected', [{ text: 'Close' }]);
    } 
    else if (username === 'Ryan') {
      if (password === '123456'){
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', 'Wrong Password', [{ text: 'Close' }]);
        setPassword('');
      }
      // Perform successful login logic here
      
    } else {
      // Show error notification for user not in the database
      Alert.alert('Error', 'User is not in the database', [{ text: 'Close' }]);
      setUsername('');
      setPassword('');
    }
  };

  const isLoginScreen = route.name === 'Login';
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ImageBackground source={require('../assets/TimberBG.png')} style={styles.background}>
      <View style={styles.container}>
        <Image source={require('../assets/CloudLogo.png')} style={styles.cloudLogo} />
        <Image source={require('../assets/TimberLogo.png')} style={styles.logo} />

        <Text style={styles.label}>Username:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your username"
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <Text style={styles.label}>Password:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        {!isLoginScreen && <BottomNav />}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    position:"absolute",
    zIndex:2,
    top:-150,
    left:-40,
    width: 400,
    height: 400,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  cloudLogo: {
    position:"absolute",
    zIndex:0,
    left:-110,
    top:-230,
    width: 500,
    height: 500,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  label: {
    top:130,
    left:-90,
    fontSize: 40,
    fontFamily: 'Just Another Hand',
    color: 'black',
    marginBottom: 10,
  },
  inputContainer: {
    zIndex:3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    top:120,
  },
  input: {
    width: 300,
    height: 50,
    marginTop:0,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 10,
    fontSize: 30,
    fontFamily: 'Just Another Hand',
    backgroundColor: 'white',
  },
  loginButton: {
    top:160,
    width:140,
    backgroundColor: 'white',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 30,
  },
  loginButtonText: {
    top:4,
    left:14,
    height:43,
    fontSize: 40,
    fontFamily: 'Just Another Hand',
    color: 'black',
  },
});
