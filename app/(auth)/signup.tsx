import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Ionicons, MaterialIcons } from "@expo/vector-icons";

// 🔐 Firebase
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../../firebaseConfig";

// 📸 Image Picker
import * as ImagePicker from "expo-image-picker";

const SignupScreen = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGoBack = () => {
    router.back();
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Allow access to your photos to upload profile picture.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.5,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSignUp = async () => {
    if (!username || !email || !phone || !address || !password) {
      Alert.alert("Input Error", "Please fill in all fields.");
      return;
    }

    setLoading(true);
    console.log("🚀 Starting Signup Process...");

    try {
      // 1. Create auth user
      console.log("Step 1: Creating Auth User...");
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("✅ Auth User Created:", user.uid);

      let photoURL = "";
      if (image) {
        console.log("Step 2: Uploading Image...");
        try {
          const response = await fetch(image);
          const blob = await response.blob();
          const storageRef = ref(storage, `users/${user.uid}/profile.jpg`);
          await uploadBytes(storageRef, blob);
          photoURL = await getDownloadURL(storageRef);
          console.log("✅ Image Uploaded:", photoURL);
        } catch (imgErr) {
          console.log("❌ Image Upload Failed (skipping):", imgErr);
        }
      }

      // 2. Update Firebase Authentication profile
      console.log("Step 3: Updating Auth Profile...");
      await updateProfile(user, {
        displayName: username,
        photoURL: photoURL || null,
      });
      console.log("✅ Auth Profile Updated!");

      // 3. Save to Firestore
      console.log("Step 4: Saving to Firestore...");
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        username,
        email,
        phone,
        address,
        photoURL: photoURL || "",
        memberSince: serverTimestamp(),
      });
      console.log("✅ Firestore Saved!");

      setLoading(false);
      Alert.alert("Success", "Account created!");
      router.replace("/(auth)/login" as any);

    } catch (error: any) {
      setLoading(false);
      console.error("🔥 FULL ERROR OBJECT:", error);
      
      // More specific error messages
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert("Error", "Email is already in use. Please use a different email.");
      } else if (error.code === 'auth/weak-password') {
        Alert.alert("Error", "Password is too weak. Please use a stronger password.");
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert("Error", "Invalid email address. Please check your email format.");
      } else if (error.code === 'auth/network-request-failed') {
        Alert.alert("Error", "Network error. Please check your internet connection.");
      } else {
        Alert.alert("Error", error.message || "Something went wrong. Please try again.");
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        style={{ flex: 1 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={26} color="#333" />
          </TouchableOpacity>
          <Text style={styles.title}>Sign Up</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <TouchableOpacity style={styles.profileContainer} onPress={pickImage}>
            {image ? (
              <Image source={{ uri: image }} style={styles.profileImage} />
            ) : (
              <View style={styles.placeholderCircle}>
                 <MaterialIcons name="person" size={50} color="#AAA" />
              </View>
            )}
            <Text style={styles.profileText}>Tap to add profile picture</Text>
          </TouchableOpacity>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Username</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Enter username" 
              value={username} 
              onChangeText={setUsername} 
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Enter email" 
              keyboardType="email-address" 
              value={email} 
              onChangeText={setEmail} 
              autoCapitalize="none" 
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Enter phone number" 
              keyboardType="phone-pad" 
              value={phone} 
              onChangeText={setPhone} 
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Address</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Enter address" 
              value={address} 
              onChangeText={setAddress} 
              multiline 
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Enter password" 
              secureTextEntry 
              value={password} 
              onChangeText={setPassword} 
            />
          </View>

          <View style={styles.switchContainer}>
            <Text style={styles.rememberMeText}>Remember me</Text>
            <Switch 
              value={rememberMe} 
              onValueChange={setRememberMe} 
              trackColor={{ false: "#E0E0E0", true: "#5C2D91" }} 
            />
          </View>

          <TouchableOpacity 
            style={[styles.signUpButton, loading && { opacity: 0.7 }]} 
            onPress={handleSignUp} 
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.buttonText}>Sign Up</Text>
            )}
          </TouchableOpacity>
          
          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: "white" 
  },
  header: { 
    flexDirection: "row", 
    alignItems: "center", 
    paddingHorizontal: 15, 
    paddingVertical: 15, 
    borderBottomWidth: 1, 
    borderBottomColor: "#EEE" 
  },
  backButton: { 
    zIndex: 10 
  },
  title: { 
    fontSize: 20, 
    fontWeight: "bold", 
    color: "#333", 
    flex: 1, 
    textAlign: "center", 
    marginRight: 26 
  },
  scrollContainer: { 
    paddingHorizontal: 25, 
    paddingTop: 20 
  },
  profileContainer: { 
    alignItems: "center", 
    marginBottom: 20 
  },
  profileImage: { 
    width: 100, 
    height: 100, 
    borderRadius: 50 
  },
  placeholderCircle: { 
    width: 100, 
    height: 100, 
    borderRadius: 50, 
    backgroundColor: '#F0F0F0', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 10 
  },
  profileText: { 
    color: "#5C2D91", 
    fontSize: 14, 
    fontWeight: '500' 
  },
  inputGroup: { 
    marginBottom: 20 
  },
  label: { 
    fontSize: 14, 
    color: "#666", 
    marginBottom: 8 
  },
  input: { 
    borderBottomWidth: 1, 
    borderBottomColor: "#CCC", 
    paddingVertical: 8, 
    fontSize: 16, 
    color: "#333" 
  },
  switchContainer: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: 'center', 
    marginBottom: 30 
  },
  rememberMeText: { 
    fontSize: 16, 
    color: "#333" 
  },
  signUpButton: { 
    backgroundColor: "#5C2D91", 
    paddingVertical: 18, 
    borderRadius: 12, 
    alignItems: "center", 
    elevation: 2, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 4 
  },
  buttonText: { 
    color: "white", 
    fontSize: 18, 
    fontWeight: "bold" 
  },
});

export default SignupScreen;