import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
  Modal,
  Button,
  RefreshControl,
} from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import BottomNav from '../components/BottomNav';

export default function BountyScreen() {
  const [fontsLoaded] = useFonts({
    'Just Another Hand': require('../assets/fonts/JustAnotherHand-Regular.ttf'),
  });
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState(false);
  const [isNotificationModalVisible, setIsNotificationModalVisible] = useState(false);
  const [friends, setFriends] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchFriends();
  }, []);

  const [selectedFriend, setSelectedFriend] = useState(null);

  const navigation = useNavigation();
  const handleButtonPress = (ScreenName) => {
    navigation.navigate(ScreenName);
  };
  

  const handleFriendPress = (friend) => {
    setSelectedFriend(friend);
    setIsConfirmationModalVisible(true);
  };

  const handleAcceptBounty = () => {
    setIsConfirmationModalVisible(false);
    setIsNotificationModalVisible(true);

    // Update the status of the selected bounty
    const updatedFriends = friends.map((friend) => {
      if (friend === selectedFriend) {
        return {
          ...friend,
          status: 'accepted',
        };
      }
      return friend;
    });

    setFriends(updatedFriends);
  };

  const fetchFriends = async () => {
    try {
      const response = await fetch('http://timber-api-env.eba-tvcu62mw.ap-southeast-2.elasticbeanstalk.com/request/all');
      const data = await response.json();

      const imageMapping = {
        0: require('../assets/Friend1.png'),
        1: require('../assets/Friend2.png'),
        2: require('../assets/Friend3.png'),
      };

      const updatedFriends = await Promise.all(
        data.map(async (friend, index) => {
          const friendResponse = await fetch(
            `http://timber-api-env.eba-tvcu62mw.ap-southeast-2.elasticbeanstalk.com/api/userProfile?id=${friend.postedBy}`
          );
          
          const friendData = await friendResponse.json();

          const imageIndex = index % 3; // Calculate the index of the Friend image (0, 1, or 2)

          return {
            name: friendData.name,
            requestTitle: friend.title,
            image: imageMapping[imageIndex], // Assign the appropriate image based on the index
            bountyDetails: friend.description,
            status: 'pending', // Add a new property to track the status of the bounty
          };
        })
      );

      setFriends(updatedFriends);
      setRefreshing(false); // Set refreshing to false once the data is fetched
    } catch (error) {
      console.error('Error fetching friends:', error);
      setRefreshing(false); // Set refreshing to false even if an error occurs
    }
  };

  const onRefresh = () => {
    setRefreshing(true); // Set refreshing to true when the user pulls down the screen
    fetchFriends();
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ImageBackground source={require('../assets/TimberBG.png')} style={styles.background}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.backButtonContainer}>
          <TouchableOpacity onPress={() => handleButtonPress('Home')}>
            <Ionicons name="arrow-back" size={70} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Bounty</Text>
            <TouchableOpacity
              style={styles.plusButton}
              onPress={() => handleButtonPress('BountyAdder')}
            >
              <Ionicons name="add-circle" size={55} color="#FAC143" />
            </TouchableOpacity>
          </View>
          {friends.map((friend, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.bountyContainer,
                friend.status === 'accepted' && { backgroundColor: 'green' },
              ]}
              onPress={() => handleFriendPress(friend)}
            >
              <View style={styles.leftSection}>
                <View style={styles.friendContainer}>
                  <Image source={friend.image} style={styles.friendImage} />
                  <Text style={styles.friendName}>{friend.name}</Text>
                </View>
              </View>
              <View style={styles.rightSection}>
                <Text numberOfLines={2} style={styles.bountyName}>
                  {friend.requestTitle}
                </Text>
                <Text numberOfLines={2} ellipsizeMode="tail" style={styles.bountyDescription}>
                  {friend.bountyDetails}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      {isConfirmationModalVisible && (
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Do you want to accept this bounty?</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonYes]}
                onPress={handleAcceptBounty}
              >
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonNo]}
                onPress={() => setIsConfirmationModalVisible(false)}
              >
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      {isNotificationModalVisible && (
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Telehandle has been copied onto clipboard!</Text>
            <TouchableOpacity
              style={[styles.modalButton, styles.modalButtonClose]}
              onPress={() => setIsNotificationModalVisible(false)}
            >
              <Text style={styles.buttonText}>X</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <BottomNav showBottomNav={true} /> 
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingBottom: 250,
  },
  container: {
    width: 380,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderRadius: 30,
    top: 50,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 20,
    height: 120,
  },
  title: {
    fontWeight: 'bold',
    fontFamily: 'Just Another Hand',
    fontSize: 110,
    textAlign: 'center',
    height: 120,
    top: 10,
    marginRight: 10,
    marginLeft: 60,
  },
  plusButton: {
    left: -10,
    padding: 5,
  },
  bountyContainer: {
    backgroundColor: '#F2D55B',
    borderRadius: 15,
    flexDirection: 'row',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    padding: 10,
    width: 320, // Increase the width as desired
  },
  leftSection: {
    flex: 1,
  },
  rightSection: {
    flex: 3,
  },
  friendContainer: {
    alignItems: 'center',
  },
  friendImage: {
    width: 60,
    height: 90,
    borderRadius: 10,
    marginBottom: 10,
  },
  friendName: {
    fontSize: 25,
    fontFamily: 'Just Another Hand',
    color: 'black',
  },
  bountyName: {
    fontWeight: 'bold',
    fontFamily: 'Just Another Hand',
    fontSize: 40,
    color: 'black',
    marginBottom: 10,
  },
  bountyDescription: {
    fontSize: 20,
    fontFamily: 'Just Another Hand',
    color: 'black',
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    height: 300,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalText: {
    fontSize: 50,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Just Another Hand',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButton: {
    left: 4,
    height: 70,
    width: 120,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginHorizontal: 10,
  },
  modalButtonYes: {
    backgroundColor: 'green',
  },
  modalButtonNo: {
    backgroundColor: 'red',
  },
  modalButtonClose: {
    backgroundColor: 'grey',
  },
  buttonText: {
    color: 'white',
    top: 6,
    fontSize: 50,
    fontFamily: 'Just Another Hand',
    textAlign: 'center',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonContainer: {
    position: 'absolute',
    top: 95,
    left: 20,
    zIndex: 1,
  },
});
