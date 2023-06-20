import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, ImageBackground, Image, Text } from 'react-native';
import { Svg, Circle } from 'react-native-svg';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

export default function HomeScreen() {
  const [fontsLoaded] = useFonts({
    'Just Another Hand': require('../assets/fonts/JustAnotherHand-Regular.ttf'),
  });
  const [userData, setUserData] = useState(null);
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    fetchUserProfile();
    fetchNews();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch('http://timber-api-env.eba-tvcu62mw.ap-southeast-2.elasticbeanstalk.com/api/userProfile?id=0ea02f7f-e8f2-41b7-ba2b-6b21b2e0745a');
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const fetchNews = async () => {
    try {
      const response = await fetch('http://timber-api-env.eba-tvcu62mw.ap-southeast-2.elasticbeanstalk.com/api/news/all');
      const data = await response.json();
      setNewsData(data);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  if (!fontsLoaded || !userData || newsData.length === 0) {
    return <AppLoading />;
  }

  const { name, level, currentExperience, bounties } = userData;
  const exp = currentExperience;
  const bountiesCleared = bounties;
  const achievements = 10;
  const bountyPoints = 20;
  const quest = "Bounties cleared";
  const currentProgress = 10;
  const totalProgress = 30;
  const Rewards = "30 exp, 15 bounty Points";
  const progressBarWidth = `${(4 / 10) * 100}%`;
  const newsDescriptions = newsData.map((newsItem) => newsItem.description);

  const renderProgressBar = (level) => {
    const maxLevel = 100;
    const progress = Math.min(level, maxLevel);
    const circumference = 2 * Math.PI * 50; // Assuming radius of 50

    const progressValue = (progress / maxLevel) * circumference;
    const remainingValue = circumference - progressValue;

    return (
      <Svg width={120} height={120}>
        <Circle
          cx={80}
          cy={50}
          r={35}
          fill="none"
          stroke="#F2DE89"
          strokeWidth={10}
          strokeLinecap="round"
          strokeDasharray={[progressValue, remainingValue]}
          transform="rotate(-90 60 60)"
        />
      </Svg>
    );
  };

  return (
    <ImageBackground source={require('../assets/TimberBG.png')} style={styles.background}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <View style={styles.profileContainer}>
            <View style={styles.leftSection}>
              <Text style={styles.nameText}>{name}</Text>
              <Image source={require('../assets/ProfilePic.png')} style={styles.profilePicture} />
            </View>
            <View style={styles.rightSection}>
              <View style={styles.parametersContainer}>
                <Text style={styles.parameterText}>Bounties cleared: {bountiesCleared}</Text>
                <Text style={styles.parameterText}>Achievements: {achievements}/33</Text>
                <Text style={styles.parameterText}>Bounty points: {bountyPoints}</Text>
              </View>
              <Text style={styles.lvText}>Level</Text>
              <Text style={styles.levelText}>{currentExperience}</Text>
              <View style={styles.progressContainer}>{renderProgressBar(exp)}</View>
            </View>
          </View>

          <View style={styles.horizontalContainer}>
            <View style={styles.questContainer}>
              <Text style={styles.questTitle}>Monthly Quest</Text>
              <View style={styles.questTextContainer}>
                <Text style={styles.questText}>{quest} : {currentProgress} / {totalProgress}</Text>
              </View>
              <View style={styles.progressBar}>
                <View style={styles.progressBarContainer}>
                  <View style={[styles.progressBar, styles.progressBarFill, { width: progressBarWidth }]} />
                </View>
              </View>
              <Text style={styles.rewardsText}>Rewards: {Rewards}</Text>
            </View>
          </View>
          <View style={styles.horizontalContainer}>
            <View style={styles.newsContainer}>
              <Text style={styles.newsTitle}>Timber News!</Text>
              {newsDescriptions.map((description, index) => (
                <Text key={index} style={styles.newsText}>{description}</Text>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  parametersContainer: {
    left: -30,
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 10,
    top: 40,
  },
  parameterText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 0,
    fontFamily: 'Just Another Hand',
    bottom: -100,
  },
  scrollViewContent: {
    flexGrow: 1,
    width: '100%',
    paddingBottom: 100, // Optional: Add some bottom padding if needed
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 70,
    paddingBottom: 100,
    height:1010,
  },
  horizontalContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    width: '90%',
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
    top: 36,
    left: 0,
    fontSize: 75,
    color: 'grey',
    fontWeight: 'bold',
    fontFamily: 'Just Another Hand',
  },
  progressContainer: {
    alignItems: 'center',
    top: -110,
    left: 70,
  },
  progressBarFill: {
    backgroundColor: '#F2DE89',
    borderRadius: 10,
  },
  levelText: {
    right: -103,
    top: -31,
    fontSize: 60,
    fontWeight: 'bold',
    fontFamily: 'Just Another Hand',
    color: 'black',
  },
  questContainer: {
    top: 10,
    width: '100%',
    height: 230,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  questTitle: {
    fontSize: 70,
    fontWeight: 'bold',
    fontFamily: 'Just Another Hand',
    marginBottom: 10,
  },
  questTextContainer: {
    flexDirection: 'row',
    left: 27,
  },
  questText: {
    textAlign: "left",
    left: -90,
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'Just Another Hand',
    marginBottom: 1,
  },
  progressBar: {
    width: '80%',
    height: 20,
    borderRadius: 10,
    backgroundColor: 'grey',
  },
  progressFill: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    backgroundColor: '#F2DE89',
  },
  rewardsText: {
    fontSize: 35,
    fontWeight: 'bold',
    fontFamily: 'Just Another Hand',
    marginTop: 23,
  },
  newsContainer: {
    width: '100%',
    height: 350,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  newsTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    fontFamily: 'Just Another Hand',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  newsText: {
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'Just Another Hand',
    textAlign: 'center',
    marginVertical: 6,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
});
