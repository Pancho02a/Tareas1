import React, { useState } from "react";
import { View, Text,TextInput, Button, Alert, StyleSheet } from 'react-native';

const LoginInput = ({ placeholder, value, onChangeText, secureTextEntry, maxLength }) => (
  <TextInput
    style={styles.input}
    placeholder={placeholder}
    value={value}
    onChangeText={onChangeText}
    secureTextEntry={secureTextEntry}
    maxLength={maxLength}
  />
);

const LoginButton = ({ onPress }) => (
  <View style={styles.buttonContainer}>
    <Button title="Iniciar sesión" onPress={onPress} color="#4CAF50" />
  </View>
);

const App = () => {
  const [expediente, setExpediente] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    expediente.length === 8 && password.length >= 8
      ? Alert.alert('Login exitoso!')
      : Alert.alert('Datos incorrectos');
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Bienvenido</Text>
      </View>
      <View style={styles.inputsContainer}>
        <LoginInput
          placeholder="Expediente"
          value={expediente}
          onChangeText={setExpediente}
          secureTextEntry={false}
          maxLength={8}
        />
        <LoginInput
          placeholder='Contraseña'
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          maxLength={20}
        />
      </View>
      <LoginButton onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
  },
  titleContainer: {
    marginBottom: 30,
  },
  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  inputsContainer: {
    width: '80%',
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 3,
  },
  buttonContainer: {
    width: '50%',
    borderRadius: 5,
    overflow: 'hidden',
  },
});

export default App;
