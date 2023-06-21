import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function BottomNav({ showBottomNav }) {
  const navigation = useNavigation();

  const handleTabPress = (screenName) => {
    navigation.navigate(screenName);
  };

  if (!showBottomNav) {
    return null;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addTaskTab}
        onPress={() => handleTabPress('WorkEntry')}
      >
        <Image source={require('../assets/AddPost.png')} style={styles.iconTop} />
      </TouchableOpacity>
      <View style={styles.bottomRow}>
        <TouchableOpacity
          style={styles.tabLeft}
          onPress={() => handleTabPress('Skill')}
        >
          <Image source={require('../assets/Skills.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => handleTabPress('Bounty')}
        >
          <Image source={require('../assets/Bounty.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => handleTabPress('Friend')}
        >
          <Image source={require('../assets/Friends.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => handleTabPress('Setting')}
        >
          <Image source={require('../assets/Settings.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'white',
  },
  // Rest of your styles...


  addTaskTab: {
    alignItems: 'center',
    width: 170,
    height: 170,
    backgroundColor: 'white',
    borderRadius: 100,
    borderWidth: 5,
    borderColor: '#F0CC49', // Adjust this color as needed
    justifyContent: 'center',
    position: 'absolute',
    bottom: 25, // Adjust this value as needed
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    borderTopWidth: 10,
    borderColor: '#F2DE89', // Adjust this color as needed
    backgroundColor: 'white',
  },
  tab: {
    alignItems: 'center',
    flex: 1,
    borderRightWidth: 7,
    paddingTop: 7,
    borderRightColor: '#F2DE89',
  },
  tabLeft: {
    alignItems: 'center',
    flex: 1,
    borderRightWidth: 7,
    borderLeftWidth: 7,
    paddingTop: 7,
    borderRightColor: '#F2DE89',
    borderLeftColor: '#F2DE89',
  },
  iconPlaceholder: {
    width: 71,
    height: 60,
    marginBottom: 4,
    backgroundColor: 'lightgray',
  },
  icon: {
    paddingTop: 5,
    width: 76, // Adjust the width as needed
    height: 76, // Adjust the height as needed
    marginBottom: 5,
  },
  iconTop: {
    paddingTop: 5,
    width: 70, // Adjust the width as needed
    height: 70, // Adjust the height as needed
    marginBottom: 5,
    bottom: 27,
  },
});

