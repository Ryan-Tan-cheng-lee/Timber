import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { useFonts } from 'expo-font';
import { Svg, Circle } from 'react-native-svg';
import AppLoading from 'expo-app-loading';

export default function ProfileCard({ level, bountiesCleared, achievements, bountyPoints }) {
  const [fontsLoaded] = useFonts({
    'Just Another Hand': require('../assets/fonts/JustAnotherHand-Regular.ttf'),
  });

  const calculateProgressBar = () => {
    const progress = parseInt(level) || 0;
    const maxProgress = 100;
    const circumference = 2 * Math.PI * 30; // Assuming radius of 50

    const progressValue = (progress / maxProgress) * circumference;
    const remainingValue = circumference - progressValue;

    return { progressValue, remainingValue };
  };

  const renderProgressBar = () => {
    const { progressValue, remainingValue } = calculateProgressBar();

    if (!fontsLoaded) {
        return <AppLoading />;
    }
    
    //just type v and them backspace. the formatting works after that

    return (
      <Svg width="100" height="100">
        <Circle cx="50"c y="50" r="30" fill="none" stroke="white" strokeWidth="10"/>
        <Circle cx="50" cy="50" r="30" fill="none" stroke="#F2DE89"
          strokeWidth="10" strokeLinecap="round"
          strokeDasharray={[progressValue, remainingValue]}
          transform="rotate(-90 58 58)"
        />
      </Svg>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        <View style={styles.leftSection}>
          <Image
            source={require('../assets/ProfilePic.png')}
            style={styles.profilePicture}
          />
        </View>
        <View style={styles.rightSection}>
          <View style={styles.levelContainer}>
            {renderProgressBar()}
            <Text style={styles.levelText}>Level   {level ? level : "42"}</Text>
          </View>
          <View style={styles.attributesContainer}>
            <Text style={styles.attributeText}>Bounties Cleared: {bountiesCleared || "25"}</Text>
            <Text style={styles.attributeText}>Achievements: {achievements || "50"}/73</Text>
            <Text style={styles.attributeText}>Bounty Points: {bountyPoints || 350}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileCard: {
    width: '92%',
    height: '50%',
    backgroundColor: 'white',
    borderRadius: 10,
    flexDirection: 'row',
  },
  leftSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightSection: {
    flex: 1,
    justifyContent: 'space-around',
    padding: 10,
  },
  profilePicture: {
    width: '90%',
    height: '80%',
    left: 5,
    borderRadius: 10,
  },
  levelContainer: {
    alignItems: 'center',
    top: -20, // Adjust as per your design
    right: -20, // Adjust as per your design
  },
  levelText: {
    left: -30,
    fontSize: 45,
    fontWeight: 'bold',
    fontFamily: 'Just Another Hand',
    marginTop: -50, // Adjust as per your design
    color: 'black',
  },
  attributesContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  attributeText: {
    fontSize: 25,
    marginBottom: 5,
    fontFamily: 'Just Another Hand',
  },
});
