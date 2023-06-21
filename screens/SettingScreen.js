import React from 'react';
import { View,
  ScrollView,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
  Modal,
  Button,
  RefreshControl,} from 'react-native';
import BottomNav from '../components/BottomNav';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { useNavigation } from '@react-navigation/native';

export default function SettingScreen() {
  const [fontsLoaded] = useFonts({
    'Just Another Hand': require('../assets/fonts/JustAnotherHand-Regular.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  const navigation = useNavigation();
  const handleButtonPress = (ScreenName) => {
    navigation.navigate(ScreenName);
  };


  return (
    <ImageBackground 
    source={require('../assets/TimberBG.png')} 
    style={styles.background}>
    
        <View style={styles.whiteContainer}>
          <Image source={require('../assets/Settings.png')} style={styles.icon} />
          <Text style={styles.Update}>Settings as of now have not been implemented, but you can come here and logout if you wish!</Text>
          <TouchableOpacity style={styles.logOutButton} onPress={() => handleButtonPress('Login')}>
            <Text style={styles.logoutText}>Logout!</Text>
          </TouchableOpacity>
        </View>

       
      <BottomNav showBottomNav={true} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  icon: {
    flexDirection: 'column',
    alignSelf:'center',
    top:20,
  },
  logOutButton: {
    backgroundColor: '#FFCD52',
    flexDirection: 'column',
    alignSelf:'center',
    width:180,
    height:100,
    borderRadius: 15,
    top:190,
  },
  logoutText:{
    flexDirection: 'column',
    alignSelf:'center',
    fontSize: 50,
    fontWeight: 'bold',
    fontFamily: 'Just Another Hand',
    height:100,
    top:30,

  },
  Update: {
    flexDirection: 'column',
    alignSelf:'center',
    top:70,
    textAlign: 'center',
    width:'70%',
    fontFamily: 'Just Another Hand',
    fontSize: 30,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
  },
  whiteContainer: {
    flexDirection: 'column',
    borderRadius:40,
    height: '69%',
    width:'80%',
    backgroundColor: 'white',
    alignSelf:'center',
    top:-70,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
