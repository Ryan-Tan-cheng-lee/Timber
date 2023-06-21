import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity, ImageBackground, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import BottomNav from '../components/BottomNav';


export default function BountyRequestScreen({ navigation }) {
  const [textInput1, setTextInput1] = useState('');
  const [textInput2, setTextInput2] = useState('');

  const handleSubmit = async () => {
    if (textInput1.trim() === '' || textInput2.trim() === '') {
      Alert.alert('Empty Field :(', 'Please fill in all fields.', [{ text: 'Close' }]);
      return;
    }

    const payload = {
      user_id: '0ea02f7f-e8f2-41b7-ba2b-6b21b2e0745a',
      title: textInput1,
      description: textInput2,
    };

    try {
      // Make the POST request
      const response = await axios.post('http://timber-api-env.eba-tvcu62mw.ap-southeast-2.elasticbeanstalk.com/request', payload);

      // Clear the text inputs
      setTextInput1('');
      setTextInput2('');

      // Show a success message or navigate to a different screen
      // For example:
      Alert.alert('Submission Successful', 'Your data has been submitted.', [{ text: 'OK' }]);
    } catch (error) {
      // Handle error if the request fails
      console.error(error);
      Alert.alert('Error', 'Failed to submit data. Please try again.', [{ text: 'OK' }]);
    }
  };

  return (
    <ImageBackground source={require('../assets/TimberBG.png')} style={styles.background}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={70} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.title}>Bounty Request</Text>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Title</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter text..."
              placeholderTextColor="#FFFFFF"
              value={textInput1}
              onChangeText={setTextInput1}
            />
          </View>
          <Text style={styles.descriptionText}>Description</Text>
          <View style={styles.lowerInputContainer}>
            <TextInput
              style={styles.lowerInput}
              placeholder="Enter text..."
              placeholderTextColor="#FFFFFF"
              multiline
              numberOfLines={4}
              value={textInput2}
              onChangeText={setTextInput2}
            />
          </View>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <BottomNav showBottomNav={true} /> 
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingTop: 100,
    paddingBottom: 100,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '83%',
    backgroundColor: 'white',
    borderRadius: 20,
    marginTop: -180,
    marginBottom: 20,
    marginLeft: 34,
    marginRight: 34,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  title: {
    fontSize: 60,
    fontStyle: 'bold',
    fontFamily: 'Just Another Hand',
    marginTop: 60,
    marginBottom: 20,
  },
  titleContainer: {
    alignSelf: 'flex-start',
    marginLeft: '12%',
    marginBottom: 20,
  },
  titleText: {
    fontSize: 40,
    fontFamily: 'Just Another Hand',
    color: '#000000',
  },
  inputContainer: {
    backgroundColor: '#F2DE89',
    height: 30,
    width: '80%',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  input: {
    fontSize: 25,
    color: '#FFFFFF',
  },
  descriptionText: {
    fontSize: 40,
    fontStyle: 'bold',
    fontFamily: 'Just Another Hand',
    marginLeft: '-45%',
    marginBottom: 20,
  },
  lowerInputContainer: {
    backgroundColor: '#F2DE89',
    width: '80%',
    height: 160,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  lowerInput: {
    color: '#FFFFFF',
    fontSize: 25,
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#F2DE89',
    width: '80%',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  submitButtonText: {
    fontSize: 18,
    color: '#000000',
  },
});
