import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppNavigator from './components/navigation/AppNavigator'; // Navegador com as telas principais
import LoginScreen from './screens/LoginScreen'; // Tela de login
import SignupScreen from './screens/SignupScreen'; // Tela de cadastro
import { ThemeProvider } from './ThemeContext'; // Provedor do tema
import './i18n'; // Importar a configuração de i18n

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado de login

  const handleLogin = () => {
    setIsLoggedIn(true); // Simula o login do usuário
  };

  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {!isLoggedIn ? (
            <>
              <Stack.Screen
                name="Login"
                options={{ headerShown: false }} 
              >
                {(props) => <LoginScreen {...props} onLogin={handleLogin} />}
              </Stack.Screen>
              <Stack.Screen
                name="Signup"
                component={SignupScreen}
                options={{ headerShown: false }}
              />
            </>
          ) : (
            <Stack.Screen
              name="MainApp"
              component={AppNavigator}
              options={{ headerShown: false }} // Escondendo o cabeçalho do AppNavigator
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
