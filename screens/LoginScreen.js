import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, ImageBackground, Image, Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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

  const handleLogin = () => {
    if (!username || !password) {
      alert('Preencha os campos de usuário e senha.');
      return;
    }
    navigation.navigate('Home');
  };

  const handleSignup = () => {
    navigation.navigate('Signup');
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

          {/* Botão de Entrar (Azul) */}
          <TouchableOpacity style={styles.buttonBlue} onPress={handleLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>

          {/* Botão de Cadastrar-se (Outline Rosa) */}
          <TouchableOpacity style={styles.buttonOutline} onPress={handleSignup}>
            <Text style={styles.buttonOutlineText}>Cadastrar-se</Text>
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
    paddingVertical: 40, // Mais padding para tablets
  },
  logo: {
    width: width * 0.25, // Proporcional ao tamanho da tela
    height: width * 0.25,
    marginBottom: 20,
  },
  brandTitle: {
    fontSize: width * 0.08, // Tamanho responsivo para mobile
    fontWeight: 'bold',
    color: '#ff4081',
    marginBottom: 20, // Diminuído para telas menores
    textAlign: 'center',
  },
  input: {
    width: '90%', // Aumenta a largura em telas menores
    height: 50,
    borderColor: '#ff4081',
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 10,
    color: '#fff',
    marginBottom: 15, // Reduzido o espaçamento para evitar muita distância em telas pequenas
    backgroundColor: '#111',
  },
  buttonBlue: {
    width: '90%', // Aumenta a largura em telas menores
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
    width: '90%',
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
});
