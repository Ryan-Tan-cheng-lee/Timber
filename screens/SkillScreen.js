import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Image, Text, TouchableOpacity,ImageBackground } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { ProgressBar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function SkillScreen() {
  const navigation = useNavigation();
  const handleBackButtonPress = (ScreenName) => {
    navigation.navigate(ScreenName);
  };

  const [fontsLoaded] = useFonts({
    'Just Another Hand': require('../assets/fonts/JustAnotherHand-Regular.ttf'),
  });

  const [userSkills, setUserSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(null);

  useEffect(() => {
    fetch('http://timber-api-env.eba-tvcu62mw.ap-southeast-2.elasticbeanstalk.com/api/userSkill/allByUser?userId=0ea02f7f-e8f2-41b7-ba2b-6b21b2e0745a')
      .then(response => response.json())
      .then(data => setUserSkills(data))
      .catch(error => console.log(error));
  }, []);
  

  const skills = 
    [
      {
        name: 'Marketing',
        image: require('../assets/Marketing.png'),
        colour: '#387BC6',
        content: 'Marketing Skills Description',
        skills: userSkills
          .filter(skill => skill.skill.skillType.name === 'Marketing')
          .map(skill => ({ name: skill.skill.name, level: skill.level / 100})),
      },
      {
        name: 'Creativity',
        image: require('../assets/Creativity.png'),
        colour: '#62ACDF',
        content: 'Creativity Skills Description',
        skills: userSkills
          .filter(skill => skill.skill.skillType.name === 'Creativity')
          .map(skill => ({ name: skill.skill.name, level: skill.level / 100})),
      },
      {
        name: 'Technology',
        image: require('../assets/Technology.png'),
        colour: '#7B93B4',
        content: 'Technology Skills Description',
        skills: userSkills
          .filter(skill => skill.skill.skillType.name === 'Technology')
          .map(skill => ({ name: skill.skill.name, level: skill.level / 100})),
      },
      {
        name: 'Presentation',
        image: require('../assets/Presentation.png'),
        colour: '#3C8584',
        content: 'Presentation Skills Description',
        skills: userSkills
          .filter(skill => skill.skill.skillType.name === 'Presentation')
          .map(skill => ({ name: skill.skill.name, level: skill.level / 100})),
      },
      {
        name: 'Operations',
        image: require('../assets/Operations.png'),
        colour: '#A9B0B9',
        content: 'Operations Skills Description',
        skills: userSkills
          .filter(skill => skill.skill.skillType.name === 'Operations')
          .map(skill => ({ name: skill.skill.name, level: skill.level / 100})),
      },
      {
        name: 'People skills',
        image: require('../assets/PeopleSkills.png'),
        colour: '#946756',
        content: 'People skills Skills Description',
        skills: userSkills
          .filter(skill => skill.skill.skillType.name === 'People skills')
          .map(skill => ({ name: skill.skill.name, level: skill.level / 100})),
      },
  ];

  const handleSkillPress = (skill) => {
    if (selectedSkill && selectedSkill.name === skill.name) {
      setSelectedSkill(null);
    } else {
      setSelectedSkill(skill);
    }
  };



  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ImageBackground
    source={require('../assets/TimberBG.png')}
    style={styles.background}
  >
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.backButtonContainer}>
      <TouchableOpacity onPress={() => handleBackButtonPress("Home")}>
        <Ionicons name="arrow-back" size={70} color="black" />
      </TouchableOpacity>
    </View>
      <View style={styles.container}>
        <View style={styles.skillContainer}>
          <Text style={styles.greetingText}>Skills</Text>
          {skills.map((skill, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.skillCard,
                selectedSkill && selectedSkill.name === skill.name && {
                  borderColor: skill.colour,
                },
              ]}
              onPress={() => handleSkillPress(skill)}
            >
              <Image source={skill.image} style={styles.skillImage} />
            </TouchableOpacity>
          ))}
          {selectedSkill && (
            <TouchableOpacity
              style={[
                styles.selectedSkillContainer,
                selectedSkill && {
                  borderColor: selectedSkill.colour,
                },
              ]}
              onPress={() => setSelectedSkill(null)}
            >
              <Text
                style={[
                  styles.selectedSkillText,
                  selectedSkill && { color: selectedSkill.colour },
                ]}>{selectedSkill.name}</Text>
              <View style={styles.progressBarContainer}>
                {selectedSkill.skills.map((skill, index) => (
                  <View key={index} style={styles.skillProgressContainer}>
                    <Text 
                      style={styles.skillName}>{skill.name}</Text>
                    <ProgressBar
                      progress={skill.level}
                      color={selectedSkill.colour}
                      style={styles.progressBar}
                    />
                    <Text style={styles.skillLevel}>Lv.{(skill.level * 100)}</Text>
                  </View>
                ))}
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  scrollViewContent: {
    flexGrow: 1,
    width: '100%',
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
  },
  skillContainer: {
    width: '90%',
    height: '90%',
    backgroundColor: 'white',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 20,
  },
  greetingText: {
    fontWeight: 'bold',
    fontFamily: 'Just Another Hand',
    fontSize: 80,
    textAlign: 'center',
    marginTop: 20,
    width: '100%',
    height: '10%',
  },
  skillCard: {
    width: '28%',
    height: 90,
    borderRadius: 20,
    backgroundColor: '#F2DE89',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    padding: 0,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  skillImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  skillName: {
    marginTop: 10,
    fontSize: 34,
    fontWeight: 'bold',
    fontFamily: 'Just Another Hand'
  },
  selectedSkillContainer: {
    width: '100%',
    height: '55%',
    borderRadius: 20,
    backgroundColor: '#F2DE89',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginVertical: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    padding: 20,
    borderWidth: 2,
    borderColor: 'transparent',
    
  },
  selectedSkillText: {
    fontSize: 80,
    height: 100,
    fontWeight: 'bold',
    fontFamily: 'Just Another Hand',
    textAlign: 'center',
  },
  skillProgressContainer: {
    marginTop: -30,
  },
  progressBarContainer: {
    width: '100%',
    marginTop: 1,
  },
  progressBar: {
    height: 40,
    borderRadius: 5,
    marginTop:1,
  },
  skillLevel: {
    top: -30,
    fontSize: 30,
    marginLeft: 5,
    fontFamily: 'Just Another Hand',
  },
  backButtonContainer: {
    position: 'absolute',
    top: 60,
    left: 30,
    zIndex: 1,
  },
});
