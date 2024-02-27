import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';

const App = () => {
  const [dogImage, setDogImage] = useState(null);

  useEffect(() => {
    fetchRandomDogImage();
  }, []);

  const fetchRandomDogImage = async () => {
    try {
      const response = await axios.get('https://dog.ceo/api/breeds/image/random');
      setDogImage(response.data.message);
    } catch (error) {
      console.error('Error fetching random dog image:', error);
    }
  };

  const handleChooseImage = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }

    if (pickerResult.assets.length > 0 && pickerResult.assets[0].uri) {
      setDogImage(pickerResult.assets[0].uri);
      saveImage(pickerResult.assets[0].uri);
    }
  };

  const saveImage = async (imageUri) => {
    try {
      await AsyncStorage.setItem('dogImage', imageUri);
    } catch (error) {
      console.error('Error saving image:', error);
    }
  };

  const removeImage = async () => {
    try {
      await AsyncStorage.removeItem('dogImage');
      setDogImage(null);
    } catch (error) {
      console.error('Error removing image:', error);
    }
  };

  return (
    <LinearGradient
      colors={['#6d7ef2', '#bcc3fa']}
      style={styles.container}
    >
      <Text style={styles.title}>Dog's App 🐶</Text>
      {dogImage ? (
        <>
          <Image source={{ uri: dogImage }} style={styles.image} />
          <TouchableOpacity
            style={[styles.button, { backgroundColor: 'black' }]}
            onPress={() => {
              Alert.alert(
                'Eliminar Imagen',
                '¿Estás seguro de que quieres eliminar la imagen?',
                [
                  { text: 'Cancelar', onPress: () => console.log('Cancel Pressed') },
                  { text: 'Eliminar', onPress: removeImage },
                ],
                { cancelable: false }
              );
            }}
          >
            <Text style={styles.buttonText}>Eliminar Imagen</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.noImageText}>No hay imagen de perro cargada</Text>
      )}
      <TouchableOpacity style={styles.button} onPress={fetchRandomDogImage}>
        <Text style={styles.buttonText}>Cargar Imagen de Perro Aleatoria</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleChooseImage}>
        <Text style={styles.buttonText}>Seleccionar Imagen de la Galería</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  image: {
    borderRadius: 20,
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  noImageText: {
    fontSize: 18,
    marginBottom: 20,
    color: '#fff',
  },
  button: {
    backgroundColor: '#4e6bff',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 10,
    width: '80%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;
