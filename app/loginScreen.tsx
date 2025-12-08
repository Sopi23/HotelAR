import { Ionicons } from '@expo/vector-icons'; // Used for the back arrow icon

import { router } from 'expo-router';

import React from 'react';

import {
  Image,

  SafeAreaView,

  StyleSheet,

  Text,

  TouchableOpacity,

  View,
} from 'react-native';



// --- 1. IMPORT ASSETS ---

// Assuming the correct extension is .png, as is common, to avoid the previous error.

const LogoImage = require('../assets/images/logo.jpg');



const LoginGatewayScreen = () => {



  // Function to navigate back to the Welcome page

  const handleGoBack = () => {

    // Uses replace because this is a primary authentication flow screen

    router.replace('/welcome');

  };



  // Placeholder for navigating to the actual Sign-in Form

  const handleSignIn = () => {

    // TODO: This should eventually navigate to a detailed sign-in form page (e.g., /signin-form)

    router.replace('/login');

  };



  // Placeholder for navigating to the actual Sign-up Form

  const handleCreateAccount = () => {

    // TODO: This should eventually navigate to a detailed sign-up form page (e.g., /signup-form)

    router.replace('/signup');

  };



  // Function for the small 'Already have an account? Signin' link

  const handleSmallSignInLink = () => {

    handleSignIn();

  };





  return (

    <SafeAreaView style={styles.safeArea}>

      <View style={styles.container}>

       

        {/* 1. Back Button */}

        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>

          <Ionicons name="arrow-back" size={30} color="#333" />

        </TouchableOpacity>

       

        {/* 2. Title */}

        <Text style={styles.title}>Lets Get Started</Text>



        {/* 3. Logo and App Name */}

        <View style={styles.logoContainer}>

          <Image source={LogoImage} style={styles.logo} />

          <View>

            <Text style={styles.logoTextSmall}>AR</Text>

            <Text style={styles.logoTextLarge}>HOTELS</Text>

          </View>

        </View>



        {/* 4. Main Sign In Button (The top purple button) */}

        <TouchableOpacity

          style={styles.signInButton}

          onPress={handleSignIn}

          activeOpacity={0.8}

        >

          <Text style={styles.buttonText}>SignIn</Text>

        </TouchableOpacity>



        {/* 5. Small 'Already have an account' link */}

        <View style={styles.linkRow}>

          <Text style={styles.linkText}>Already have an account? </Text>

          <TouchableOpacity onPress={handleSmallSignInLink}>

            <Text style={styles.linkTextBold}>Signin</Text>

          </TouchableOpacity>

        </View>



        {/* 6. Create an Account Button (aligned to the bottom) */}

        <View style={styles.bottomButtonContainer}>

          <TouchableOpacity

            style={styles.createAccountButton}

            onPress={handleCreateAccount}

            activeOpacity={0.8}

          >

            <Text style={styles.buttonText}>Create an Account</Text>

          </TouchableOpacity>

        </View>



      </View>

    </SafeAreaView>

  );

};



export default LoginGatewayScreen;



// --- 4. STYLES ---

const PURPLE_PRIMARY = '#5C2D91'; // Dark purple for buttons

const PURPLE_ACCENT = '#7F52B5'; // Slightly lighter purple for the large text



const styles = StyleSheet.create({

  safeArea: {

    flex: 1,

    backgroundColor: '#EAEAEA', // Light gray background from the design image

  },

  container: {

    flex: 1,

    paddingHorizontal: 25,

    paddingTop: 10,

    alignItems: 'center',

  },

  backButton: {

    alignSelf: 'flex-start',

    padding: 5,

    marginBottom: 20,

    marginTop: 10,

  },

  title: {

    fontSize: 26,

    fontWeight: 'bold',

    color: '#333',

    marginBottom: 50,

  },

  logoContainer: {

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'center',

    marginBottom: 80,

  },

  logo: {

    width: 80,

    height: 80,

    marginRight: 15,

    borderRadius: 15,

  },

  logoTextSmall: {

    fontSize: 32,

    fontWeight: '700',

    color: '#333',

  },

  logoTextLarge: {

    fontSize: 48,

    fontWeight: '900',

    color: PURPLE_ACCENT,

  },

  signInButton: {

    backgroundColor: PURPLE_PRIMARY,

    paddingVertical: 18,

    width: '100%',

    borderRadius: 15,

    alignItems: 'center',

    marginBottom: 20,

    elevation: 4,

    shadowColor: '#000',

    shadowOffset: { width: 0, height: 4 },

    shadowOpacity: 0.2,

    shadowRadius: 5,

  },

  buttonText: {

    color: 'white',

    fontSize: 18,

    fontWeight: 'bold',

  },

  linkRow: {

    flexDirection: 'row',

    marginBottom: 20,

    alignItems: 'center',

  },

  linkText: {

    fontSize: 16,

    color: '#666',

  },

  linkTextBold: {

    fontSize: 16,

    color: PURPLE_PRIMARY,

    fontWeight: 'bold',

  },

  bottomButtonContainer: {

    marginTop: 'auto', // Pushes this container to the bottom

    width: '100%',

    marginBottom: 20,

  },

  createAccountButton: {

    backgroundColor: PURPLE_PRIMARY,

    paddingVertical: 18,

    width: '100%',

    borderRadius: 15,

    alignItems: 'center',

    elevation: 4,

    shadowColor: '#000',

    shadowOffset: { width: 0, height: 4 },

    shadowOpacity: 0.2,

    shadowRadius: 5,

  },

}); 