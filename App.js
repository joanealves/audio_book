import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; // Gerencia a navegação
import { createStackNavigator } from '@react-navigation/stack'; // Cria as rotas em stack
import LoginScreen from './screens/LoginScreen'; // Tela de login
import SignupScreen from './screens/SignupScreen'; // Tela de cadastro
import HomeScreen from './screens/HomeScreen'; // Tela de home

// Criação do Stack Navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        {/* Definindo as telas */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
