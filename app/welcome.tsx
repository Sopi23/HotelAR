// HOTELAR/app/welcome.tsx (Your Explorer/Welcome Page)

import { router } from 'expo-router';
import React from 'react';
import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// --- 1. IMPORT ASSETS ---
// Adjust the path relative to the 'app' directory
const BackgroundImage = require('../assets/images/welcome_bg.jpg'); 
const LogoImage = require('../assets/images/logo.jpg'); 

const WelcomeScreen = () => {
  // Function to handle the button press
  const handleExplore = () => {
    // Navigate and replace the history to the Login Gateway screen (route: /login).
    router.replace('/login'); 
  };

  return (
    <View style={styles.container}>
      {/* Set status bar to light content */}
      <StatusBar barStyle="light-content" />
      
      <ImageBackground source={BackgroundImage} style={styles.imageBackground}>
        
        {/* Overlay Content */}
        <View style={styles.contentContainer}>
          
          {/* Logo and Title Section */}
          <View style={styles.titleWrapper}>
            <Image source={LogoImage} style={styles.logo} />
            
            <View>
              <Text style={styles.titleTextSmall}>AR</Text>
              <Text style={styles.titleTextLarge}>HOTELS</Text>
            </View>
          </View>
          
          {/* Explore Button */}
          <TouchableOpacity 
            style={styles.exploreButton} 
            onPress={handleExplore}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Explore</Text>
          </TouchableOpacity>
          
        </View>
      </ImageBackground>
    </View>
  );
};

export default WelcomeScreen;

// --- 2. STYLES ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  contentContainer: {
    flex: 1,
    padding: 25,
    justifyContent: 'flex-end', 
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '60%', 
    marginLeft: 10,
  },
  logo: {
    width: 60,
    height: 60,
    marginRight: 15,
    borderRadius: 12, 
  },
  titleTextSmall: {
    color: 'white',
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: 1,
    // Note: Using individual text shadow properties is deprecated but common
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  titleTextLarge: {
    color: '#D4B8FF', // Light purple
    fontSize: 48, 
    fontWeight: '900',
    letterSpacing: 3,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  exploreButton: {
    backgroundColor: '#5C2D91', // Dark purple button color
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 20, 
    // Shadow properties
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});