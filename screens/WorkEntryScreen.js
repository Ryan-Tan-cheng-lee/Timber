import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BottomNav from '../components/BottomNav';
import { Ionicons } from '@expo/vector-icons';

export default function WorkEntryScreen() {
  const navigation = useNavigation();
  const handleBackButton = () => {
    navigation.navigate('Home');
  };

  const handleRedTextPress = () => {
    Alert.alert(
      "Notification",
      "There really isn't anything here, why bother pressing the words?",
      [{ text: 'Oh man... :(' }]
    );
  };

  return (
    <ImageBackground source={require('../assets/TimberBG.png')} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.whiteContainer}>
          <TouchableOpacity onPress={handleBackButton} style={styles.backButton}>
            <Ionicons name="arrow-back" size={70} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>Work Entry</Text>
          <TouchableOpacity onPress={handleRedTextPress}>
            <Text style={styles.workInProgressText}>Work in Progress, look out for updates!</Text>
          </TouchableOpacity>
        </View>
        <BottomNav showBottomNav={true} />
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '106%',
  },
  whiteContainer: {
    backgroundColor: 'white',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '80%',
    height: '70%',
    top: -70,
    borderRadius: 40,
  },
  backButton: {
    position: 'absolute',
    top: 15,
    left: 15,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flexDirection: 'column',
    alignSelf: 'center',
    top: 100,
    fontSize: 90,
    fontWeight: 'bold',
    marginBottom: 16,
    fontFamily: 'Just Another Hand',
  },
  workInProgressText: {
    fontSize: 45,
    fontFamily: 'Just Another Hand',
    flexDirection: 'column',
    alignSelf: 'center',
    top: 230,
    color: 'red',
    height: '100%',
    width: '60%',
    textAlign: 'center',
  },
});
