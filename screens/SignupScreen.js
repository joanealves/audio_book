import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function SignupScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validateFields = () => {
    if (!username || !password || !confirmPassword) {
      setErrorMessage('Preencha todos os campos');
      return false;
    }
    if (password !== confirmPassword) {
      setErrorMessage('As senhas não coincidem');
      return false;
    }
    if (password.length < 6) {
      setErrorMessage('A senha deve ter pelo menos 6 caracteres');
      return false;
    }
    return true;
  };

  const handleSignup = () => {
    if (!validateFields()) return;
    navigation.navigate('Login'); // Após o cadastro, redireciona para a tela de login
  };

  return (
    <View style={styles.background}>
      <ImageBackground
        source={require('../assets/splash.webp')}
        style={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          <View style={styles.container}>
            <Text style={styles.brandTitle}>Schema</Text>

            <TextInput
              style={styles.input}
              placeholder="Usuário"
              placeholderTextColor="#888"
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              placeholderTextColor="#888"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirmar Senha"
              placeholderTextColor="#888"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />

            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

            <TouchableOpacity style={styles.buttonBlue} onPress={handleSignup}>
              <Text style={styles.buttonText}>Cadastrar-se</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonOutline} onPress={() => navigation.navigate('Login')}>
              <Text style={styles.buttonOutlineText}>Voltar ao Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', 
    paddingHorizontal: 20,
  },
  container: {
    width: '100%',
    maxWidth: 400, 
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  brandTitle: {
    fontSize: width * 0.08,
    fontWeight: 'bold',
    color: '#1E90FF',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#1E90FF',
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 10,
    color: '#fff',
    marginBottom: 20,
    backgroundColor: '#111',
  },
  buttonBlue: {
    width: '100%',
    height: 50,
    backgroundColor: '#1E90FF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
  buttonOutline: {
    width: '100%',
    height: 50,
    borderWidth: 2,
    borderColor: '#ff4081',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonOutlineText: {
    fontSize: 18,
    color: '#ff4081',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});