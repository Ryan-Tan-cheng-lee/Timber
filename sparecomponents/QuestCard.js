import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

export default function QuestCard({ progress }) {
  const progressBarWidth = `${(progress / 10) * 100}%`;

  const [fontsLoaded] = useFonts({
    'Just Another Hand': require('../assets/fonts/JustAnotherHand-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Monthly Quest</Text>
      </View>
      <View style={styles.progressTextContainer}>
        <Text style={styles.progressText}>
          Bounties Cleared: {progress}/10
        </Text>
      </View>
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, styles.progressBarFill, { width: progressBarWidth }]} />
      </View>
      <View style={styles.progressTextContainer}>
        <Text style={styles.rewardText}>
            Rewards: +20exp, 15 Bounty Points
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 350,
    height: 200,
    flex: 1,
    top: -120,
    borderRadius: 10,
    paddingTop: 20,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  divider: {
    width: '80%',
    height: 3,
    backgroundColor: 'black',
    marginBottom: 20,
  },
  headerContainer: {
    height: '30%',
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
    zIndex: -10,
  },
  headerText: {
    fontSize: 66,
    fontWeight: 'bold',
    fontFamily: 'Just Another Hand',
  },
  progressBarContainer: {
    width: '75%',
    height: 20,
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: '#D3D3D3',
    zIndex: 20,
  },
  progressBar: {
    height: '100%',
    borderRadius: 10,
  },
  progressBarFill: {
    backgroundColor: '#F2DE89',
    borderRadius: 10,
  },
  progressTextContainer: {
    marginTop: 10,
  },
  progressText: {
    fontSize: 28,
    fontFamily: 'Just Another Hand',
  },
  rewardText: {
    marginTop: 14,
    fontSize: 32,
    fontFamily: 'Just Another Hand',
  },
});
