import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function ResetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const validateEmail = () => {
    if (!email) {
      setErrorMessage('O campo de e-mail é obrigatório');
      return false;
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Insira um e-mail válido');
      return false;
    }
    return true;
  };

  const handleResetPassword = () => {
    if (!validateEmail()) return;
    setSuccessMessage('Link de redefinição de senha enviado para o e-mail.');
    setErrorMessage('');  // Limpa a mensagem de erro após sucesso
  };

  const handleBackToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.background}>
      <ImageBackground
        source={require('../assets/splash.webp')}
        style={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          <View style={styles.container}>
            <Text style={styles.title}>Recuperar Senha</Text>

            <TextInput
              style={styles.input}
              placeholder="E-mail"
              placeholderTextColor="#888"
              value={email}
              onChangeText={setEmail}
            />

            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
            {successMessage ? <Text style={styles.successText}>{successMessage}</Text> : null}

            {/* Botão de Redefinir Senha */}
            <TouchableOpacity style={styles.buttonBlue} onPress={handleResetPassword}>
              <Text style={styles.buttonText}>Enviar Link</Text>
            </TouchableOpacity>

            {/* Botão de Voltar para o Login */}
            <TouchableOpacity style={styles.buttonOutline} onPress={handleBackToLogin}>
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
    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
    color: '#ff4081',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ff4081',
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
    textAlign: 'center',
  },
  successText: {
    color: 'green',
    marginBottom: 10,
    textAlign: 'center',
  },
});
