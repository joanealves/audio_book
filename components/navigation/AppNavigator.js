import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'; 
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../../screens/HomeScreen';         
import LibraryScreen from '../../screens/LibraryScreen';
import FavoritesScreen from '../../screens/FavoritesScreen';
import SettingsScreen from '../../screens/SettingsScreen';
import AudioPlayerScreen from '../../screens/AudioPlayerScreen'; 
import BookDetail from '../../screens/BookDetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="AudioPlayer" 
        component={AudioPlayerScreen} 
        options={{ title: 'Reprodutor de Áudio' }} 
      />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Library') {
            iconName = 'book';
          } else if (route.name === 'Favorites') {
            iconName = 'heart';
          } else if (route.name === 'Settings') {
            iconName = 'settings';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarStyle: { backgroundColor: '#121212' },
        tabBarActiveTintColor: '#1E90FF',
        tabBarInactiveTintColor: '#aaa',
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeStack} // Substituir por HomeStack para permitir o empilhamento de telas
        options={{ headerShown: false, title: 'Início' }} 
      />
      <Tab.Screen 
        name="Library" 
        component={LibraryScreen} 
        options={{ headerShown: false, title: 'Biblioteca' }} 
      />
      <Tab.Screen 
        name="BookDetail" // Adicione esta linha
        component={BookDetail} // Certifique-se de que o componente BookDetail está importado
        options={{ headerShown: true, title: 'Detalhes do Livro' }} // Ajuste conforme necessário
      />
      <Tab.Screen 
        name="Favorites" 
        component={FavoritesScreen} 
        options={{ headerShown: false, title: 'Favoritos' }} 
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{ headerShown: false, title: 'Configurações' }} 
      />
    </Tab.Navigator>
  );
}
