import React from 'react';
import { View, ScrollView, StyleSheet, ImageBackground, Image, Text } from 'react-native';
import { Svg, Circle } from 'react-native-svg';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

export default function HomeScreen() {
  const [fontsLoaded] = useFonts({
    'Just Another Hand': require('../assets/fonts/JustAnotherHand-Regular.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  

  const renderProgressBar = (level) => {
    const maxLevel = 100;
    const progress = Math.min(level, maxLevel);
    const circumference = 2 * Math.PI * 50; // Assuming radius of 50

    const progressValue = (progress / maxLevel) * circumference;
    const remainingValue = circumference - progressValue;

    return (
      <Svg width={120} height={120}>
        <Circle
          cx={60}
          cy={60}
          r={35}
          fill="none"
          stroke="#F2DE89"
          strokeWidth={10}
          strokeLinecap="round"
          strokeDasharray={[progressValue, remainingValue]}
          transform="rotate(-90 60 60)"
        />
        <Text style={styles.levelText}>{level}</Text>
      </Svg>
    );
    
    
  };


  return (
    <ImageBackground source={require('../assets/TimberBG.png')} style={styles.background}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <View style={styles.horizontalContainer}>
            <View style={styles.profileContainer}>
              <View style={styles.leftSection}>
                <Text style={styles.nameText}>Edwin Lim</Text>
                <Image source={require('../assets/ProfilePic.png')} style={styles.profilePicture} />
              </View>
              <View style={styles.rightSection}>
                <Text style={styles.lvText}>Lv.</Text>
                <View style={styles.progressContainer}>{renderProgressBar(42)}</View>
              </View>
            </View>
          </View>
          <View style={styles.horizontalContainer}>
            <View style={styles.questContainer}>{/* Add your quest content here */}</View>
          </View>
          <View style={styles.horizontalContainer}>
            <View style={styles.newsContainer}>{/* Add your news content here */}</View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
  
  
  
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    width: '100%',
    paddingBottom: 20, // Optional: Add some bottom padding if needed
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 70,
  },
  horizontalContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 230,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  leftSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 10,
    position: 'relative',
  },
  nameText: {
    fontSize: 50,
    fontFamily: 'Just Another Hand',
    fontWeight: 'bold',
    marginTop: 0,
  },
  profilePicture: {
    width: '60%',
    height: '60%',
    borderRadius: 10,
  },
  lvText: {
    position: 'absolute',
    top: 40,
    left: -20,
    fontSize: 80,
    color: 'grey',
    fontWeight: 'bold',
    fontFamily: 'Just Another Hand',
  },
  progressContainer: {
    alignItems: 'center',
    marginTop: -100,
    left: 70,
  },
  levelText: {
    left:43,
    top:37,
    fontSize: 60,
    fontWeight: 'bold',
    fontFamily: 'Just Another Hand',
    color: 'black',
  },
  questContainer: {
    width: '100%',
    height: 200,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  newsContainer: {
    width: '100%',
    height: 200,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
});