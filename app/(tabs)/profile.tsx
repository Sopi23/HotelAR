import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  TextInput,
  Modal,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc, getDoc } from "firebase/firestore";

import { auth, db, storage } from "../../firebaseConfig";

const PURPLE_PRIMARY = "#5C2D91";
const LIGHT_TEAL = "#40D2B8";

const ProfileScreen = () => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showEditForm, setShowEditForm] = useState(false); // Toggle for edit form
  const [editing, setEditing] = useState(false); // For individual field modal
  const [editField, setEditField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
  });

  // 🔹 Fetch user data from Firestore
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const currentUser = auth.currentUser;

        if (!currentUser) {
          Alert.alert("Error", "User not logged in");
          return;
        }

        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserData(data);
          setFormData({
            username: data.username || "",
            email: data.email || "",
            phone: data.phone || "",
            address: data.address || "",
          });
        } else {
          Alert.alert("Error", "User profile not found");
        }
      } catch (error) {
        console.error("Profile fetch error:", error);
        Alert.alert("Error", "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleEdit = (field: string, currentValue: string) => {
    setEditField(field);
    setEditValue(currentValue);
    setEditing(true);
  };

  const handleSave = async () => {
    if (!editField || !auth.currentUser) return;

    try {
      const updatedData = { [editField]: editValue };
      const userRef = doc(db, "users", auth.currentUser.uid);
      
      await updateDoc(userRef, updatedData);
      
      // Update local state
      setUserData((prev: any) => ({ ...prev, [editField]: editValue }));
      setFormData((prev) => ({ ...prev, [editField]: editValue }));
      
      Alert.alert("Success", `${editField} updated successfully`);
      setEditing(false);
    } catch (error) {
      console.error("Update error:", error);
      Alert.alert("Error", "Failed to update profile");
    }
  };

  const handleImageUpload = async () => {
    try {
      // Request permissions
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'Sorry, we need camera roll permissions to upload images.');
        return;
      }

      // Pick image
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setUploadingImage(true);
        
        const currentUser = auth.currentUser;
        if (!currentUser) {
          Alert.alert("Error", "User not logged in");
          return;
        }

        // Upload image to Firebase Storage
        const imageUri = result.assets[0].uri;
        const response = await fetch(imageUri);
        const blob = await response.blob();
        
        const storageRef = ref(storage, `profile-pictures/${currentUser.uid}`);
        await uploadBytes(storageRef, blob);
        
        // Get download URL
        const downloadURL = await getDownloadURL(storageRef);
        
        // Update Firestore
        const userRef = doc(db, "users", currentUser.uid);
        await updateDoc(userRef, { profileImage: downloadURL });
        
        // Update local state
        setUserData((prev: any) => ({ ...prev, profileImage: downloadURL }));
        
        Alert.alert("Success", "Profile image updated successfully");
      }
    } catch (error) {
      console.error("Image upload error:", error);
      Alert.alert("Error", "Failed to upload image");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSaveAll = async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        Alert.alert("Error", "User not logged in");
        return;
      }

      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, formData);
      
      // Update local state
      setUserData((prev: any) => ({ ...prev, ...formData }));
      
      Alert.alert("Success", "Profile updated successfully");
      setShowEditForm(false); // Hide form after saving
    } catch (error) {
      console.error("Update all error:", error);
      Alert.alert("Error", "Failed to update profile");
    }
  };

  const handleCancelEdit = () => {
    // Reset form to original user data
    if (userData) {
      setFormData({
        username: userData.username || "",
        email: userData.email || "",
        phone: userData.phone || "",
        address: userData.address || "",
      });
    }
    setShowEditForm(false);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ActivityIndicator size="large" color={PURPLE_PRIMARY} style={{ marginTop: 50 }} />
      </SafeAreaView>
    );
  }

  if (!userData) return null;

  // 🔹 Format member since date
  const memberSince = userData.memberSince?.toDate
    ? userData.memberSince.toDate().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      })
    : "N/A";

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Purple Header */}
        <View style={styles.topBackground} />

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <TouchableOpacity 
            onPress={handleImageUpload} 
            style={styles.imageContainer}
            disabled={uploadingImage}
          >
            {uploadingImage ? (
              <View style={[styles.profileImage, styles.uploadingContainer]}>
                <ActivityIndicator size="small" color="white" />
              </View>
            ) : (
              <Image
                source={{
                  uri: userData.profileImage || "https://picsum.photos/200",
                }}
                style={styles.profileImage}
              />
            )}
            <MaterialIcons
              name="camera-alt"
              size={22}
              color="white"
              style={styles.editIconOverlay}
            />
          </TouchableOpacity>

          <View style={styles.profileDetails}>
            <Text style={styles.userName}>{userData.username}</Text>

            <View style={styles.memberTag}>
              <MaterialIcons name="military-tech" size={16} color="black" />
              <Text style={styles.memberText}>Member</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.editProfileButton}
            onPress={() => setShowEditForm(true)}
          >
            <Text style={styles.editProfileButtonText}>
              {showEditForm ? "View Profile" : "Edit Profile"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Edit Form - Only shows when edit button is clicked */}
        {showEditForm ? (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Edit Profile Information</Text>

            <View style={styles.formCard}>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Username</Text>
                <TextInput
                  style={styles.input}
                  value={formData.username}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, username: text }))}
                  placeholder="Enter username"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Email</Text>
                <TextInput
                  style={styles.input}
                  value={formData.email}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
                  placeholder="Enter email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Phone</Text>
                <TextInput
                  style={styles.input}
                  value={formData.phone}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, phone: text }))}
                  placeholder="Enter phone number"
                  keyboardType="phone-pad"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Address</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={formData.address}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, address: text }))}
                  placeholder="Enter address"
                  multiline
                  numberOfLines={3}
                />
              </View>

              <View style={styles.formButtons}>
                <TouchableOpacity
                  style={[styles.formButton, styles.cancelButton]}
                  onPress={handleCancelEdit}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.formButton, styles.saveAllButton]}
                  onPress={handleSaveAll}
                >
                  <Text style={styles.saveAllButtonText}>Save Changes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          /* Contact Info (Read-only display) - Shows when not editing */
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Contact Information</Text>

            <View style={styles.contactCard}>
              <InfoRow 
                icon="email" 
                label="Email" 
                value={userData.email} 
                onEdit={() => handleEdit("email", userData.email)}
              />
              <InfoRow 
                icon="phone" 
                label="Phone" 
                value={userData.phone} 
                onEdit={() => handleEdit("phone", userData.phone)}
              />
              <InfoRow 
                icon="location-on" 
                label="Address" 
                value={userData.address} 
                onEdit={() => handleEdit("address", userData.address)}
              />
              <InfoRow 
                icon="date-range" 
                label="Member Since" 
                value={memberSince}
              />
            </View>
          </View>
        )}

        <View style={{ height: 50 }} />
      </ScrollView>

      {/* Edit Modal for individual fields */}
      <Modal
        visible={editing}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setEditing(false)}
      >
        <TouchableWithoutFeedback onPress={() => setEditing(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.modalContent}
              >
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>
                    Edit {editField ? editField.charAt(0).toUpperCase() + editField.slice(1) : ""}
                  </Text>
                  <TouchableOpacity onPress={() => setEditing(false)}>
                    <MaterialIcons name="close" size={24} color="#666" />
                  </TouchableOpacity>
                </View>

                <TextInput
                  style={styles.modalInput}
                  value={editValue}
                  onChangeText={setEditValue}
                  placeholder={editField ? `Enter new ${editField}` : "Enter value"}
                  autoFocus
                />

                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.modalCancelButton]}
                    onPress={() => setEditing(false)}
                  >
                    <Text style={styles.modalCancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={[styles.modalButton, styles.modalSaveButton]}
                    onPress={handleSave}
                  >
                    <Text style={styles.modalSaveButtonText}>Save</Text>
                  </TouchableOpacity>
                </View>
              </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

export default ProfileScreen;

/* -------------------- */
/* Reusable Info Row */
/* -------------------- */
const InfoRow = ({
  icon,
  label,
  value,
  onEdit,
}: {
  icon: any;
  label: string;
  value: string;
  onEdit?: () => void;
}) => (
  <TouchableOpacity 
    style={styles.infoRowContainer} 
    onPress={onEdit}
    disabled={!onEdit}
  >
    <View style={styles.infoRow}>
      <MaterialIcons name={icon} size={24} color={PURPLE_PRIMARY} />
      <View style={styles.infoTextWrapper}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
      {onEdit && (
        <MaterialIcons 
          name="edit" 
          size={20} 
          color="#999" 
          style={styles.editIcon}
        />
      )}
    </View>
  </TouchableOpacity>
);

/* -------------------- */
/* Styles */
/* -------------------- */
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F7F7F7" },
  scrollContent: { paddingBottom: 20 },

  topBackground: {
    backgroundColor: PURPLE_PRIMARY,
    height: 150,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
  },

  profileCard: {
    backgroundColor: "#F3EFFF",
    borderRadius: 15,
    marginHorizontal: 20,
    marginTop: 50,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    elevation: 5,
  },

  imageContainer: { marginRight: 15 },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "white",
  },

  uploadingContainer: {
    backgroundColor: PURPLE_PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },

  editIconOverlay: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: PURPLE_PRIMARY,
    borderRadius: 12,
    padding: 4,
  },

  profileDetails: { flex: 1 },
  userName: { fontSize: 24, fontWeight: "bold", color: "#333" },

  memberTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFD700",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 6,
    alignSelf: "flex-start",
  },

  memberText: { marginLeft: 5, fontWeight: "600" },

  editProfileButton: {
    backgroundColor: LIGHT_TEAL,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    position: "absolute",
    right: 20,
    bottom: 10,
  },

  editProfileButtonText: { color: "white", fontWeight: "bold" },

  sectionContainer: { paddingHorizontal: 20, marginTop: 25 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },

  contactCard: {
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
  },

  infoRowContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },

  infoTextWrapper: { 
    flex: 1,
    marginLeft: 15 
  },
  infoLabel: { fontSize: 12, color: "#999" },
  infoValue: { fontSize: 16, fontWeight: "500" },
  editIcon: { marginLeft: 10 },

  // Form Styles
  formCard: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },

  formGroup: {
    marginBottom: 15,
  },

  formLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },

  input: {
    backgroundColor: "#F7F7F7",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },

  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },

  formButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  formButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },

  cancelButton: {
    backgroundColor: '#F0F0F0',
  },

  saveAllButton: {
    backgroundColor: PURPLE_PRIMARY,
  },

  cancelButtonText: {
    color: '#666',
    fontWeight: '600',
    fontSize: 16,
  },

  saveAllButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  modalContent: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    width: '100%',
    maxWidth: 400,
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },

  modalInput: {
    backgroundColor: '#F7F7F7',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 20,
  },

  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  modalButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },

  modalCancelButton: {
    backgroundColor: '#F0F0F0',
  },

  modalSaveButton: {
    backgroundColor: PURPLE_PRIMARY,
  },

  modalCancelButtonText: {
    color: '#666',
    fontWeight: '600',
  },

  modalSaveButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});