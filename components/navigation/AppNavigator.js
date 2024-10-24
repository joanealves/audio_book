import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../../screens/HomeScreen';         
import LibraryScreen from '../../screens/LibraryScreen';
import FavoritesScreen from '../../screens/FavoritesScreen';
import SettingsScreen from '../../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

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
        component={HomeScreen} 
        options={{ headerShown: false, title: 'Início' }} 
      />
      <Tab.Screen 
        name="Library" 
        component={LibraryScreen} 
        options={{ headerShown: false, title: 'Biblioteca' }} 
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
