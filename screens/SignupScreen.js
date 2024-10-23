import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, ImageBackground, Image, Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export default function SignupScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Animação para opacidade e movimento
  const opacity = useSharedValue(0.8);
  const translateY = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, {
      duration: 5000,
      easing: Easing.inOut(Easing.quad),
    });

    translateY.value = withTiming(-10, {
      duration: 5000,
      easing: Easing.inOut(Easing.quad),
      loop: true,
      direction: 'alternate',
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  const handleSignup = () => {
    if (!username || !password || !confirmPassword) {
      alert('Preencha todos os campos.');
      return;
    }
    if (password !== confirmPassword) {
      alert('As senhas não coincidem.');
      return;
    }
    // Lógica para cadastro
    navigation.navigate('Home');
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <Animated.View style={[styles.background, animatedStyle]}>
      <ImageBackground
        source={require('../assets/splash.webp')} // Verifique se o caminho está correto
        style={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          {/* Logo */}
          {/* <Image source={require('../assets/logo.png')} style={styles.logo} /> */}

          {/* Título da Marca */}
          <Text style={styles.brandTitle}>Schema</Text>

          {/* Inputs */}
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

          {/* Botão de Cadastrar-se (Azul) */}
          <TouchableOpacity style={styles.buttonBlue} onPress={handleSignup}>
            <Text style={styles.buttonText}>Cadastrar-se</Text>
          </TouchableOpacity>

          {/* Botão de Voltar para o Login (Outline Azul) */}
          <TouchableOpacity style={styles.buttonOutline} onPress={handleLogin}>
            <Text style={styles.buttonOutlineText}>Voltar ao Login</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </Animated.View>
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
    paddingVertical: 40,
  },
  logo: {
    width: width * 0.25,
    height: width * 0.25,
    marginBottom: 20,
  },
  brandTitle: {
    fontSize: width * 0.08,
    fontWeight: 'bold',
    color: '#1E90FF', // Azul para o título no signup
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '90%',
    height: 50,
    borderColor: '#1E90FF', // Azul para as bordas no signup
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 10,
    color: '#fff',
    marginBottom: 15,
    backgroundColor: '#111',
  },
  buttonBlue: {
    width: '90%',
    height: 50,
    backgroundColor: '#ff4081', // Rosa para o botão de cadastro no signup
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
    width: '90%',
    height: 50,
    borderWidth: 2,
    borderColor: '#1E90FF', // Azul para o botão de outline no signup
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonOutlineText: {
    fontSize: 18,
    color: '#1E90FF', // Azul para o texto do botão de outline
  },
});
