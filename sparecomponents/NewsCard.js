import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

export default function NewsCard({ news }) {
    const [fontsLoaded] = useFonts({
        'Just Another Hand': require('../assets/fonts/JustAnotherHand-Regular.ttf'),
      });
    
      if (!fontsLoaded) {
        return <AppLoading />;
      }
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Latest News</Text>
      <View style={styles.divider} />
      {news.map((item, index) => (
        <Text key={index} style={styles.newsText}>
          {item}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    top:60,
    width: '92%',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
    backgroundColor: 'white',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 60,
    fontFamily: 'Just Another Hand',
    fontWeight: 'bold',
  },
  divider: {
    width: '80%',
    height: 4,
    backgroundColor: 'black',
    marginBottom: 14,
  },
  newsText: {
    fontFamily: 'Just Another Hand',
    fontSize: 28,
    marginBottom: 5,
  },
});
