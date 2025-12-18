import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';

const languages = ['English', 'French', 'Spanish', 'Arabic', 'German'];

export default function LanguageScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={languages}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => router.back()}>
            <Text style={styles.text}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  item: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#EEE' },
  text: { fontSize: 18 }
});