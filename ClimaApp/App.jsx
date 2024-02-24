import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
} from 'react-native';

export default App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeatherData = async () => {
    const API_KEY = '1760198f055742b8af1191646242102';
    try {
      const res = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=1&aqi=yes&alerts=no`,
      );
      const data = await res.json();
      setWeatherData(data);
    } catch (err) {
      console.error(err.message);
      setError(err);
    }
  };

  useEffect(() => {
    if (city) {
      fetchWeatherData();
    }
  }, [city]);

  return (
    <ImageBackground source={require('./clima.jpg')} style={styles.background}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Weather App 🌦️</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter your location"
          value={city}
          onChangeText={(text) => {
            setCity(text);
          }}
        />
        <TouchableOpacity style={styles.button} onPress={fetchWeatherData}>
          <Text style={styles.weatherText}>Get Weather 🌡️</Text>
        </TouchableOpacity>
        {error && <Text>{error}</Text>}
        {weatherData && weatherData.location && (
          <View style={styles.weatherContainer}>
            <Text style={styles.weatherInfo}>City: {weatherData.location.name}</Text>
            <Text style={styles.weatherInfo}>Temperature: {weatherData.current.temp_c}°C</Text>
            <Text style={styles.weatherInfo}>Description: {weatherData.current.condition.text}</Text>
          </View>
        )}
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Hace que el fondo sea semi-transparente para que la imagen de fondo sea visible
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: '80%',
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#4e6bff',
    width: '80%',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  weatherText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  weatherContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    width: '80%',
  },
  weatherInfo: {
    fontSize: 16,
    marginBottom: 10,
  },
});
