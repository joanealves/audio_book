// ThemeContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [fontSize, setFontSize] = useState('medium'); // Para personalização de fontes
  const [themeColors, setThemeColors] = useState({ primary: '#1E90FF' }); // Para personalização de cores

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const theme = await AsyncStorage.getItem('theme');
        const savedFontSize = await AsyncStorage.getItem('fontSize');
        const savedColors = await AsyncStorage.getItem('themeColors');

        if (theme) {
          setIsDarkTheme(theme === 'dark');
        }
        if (savedFontSize) {
          setFontSize(savedFontSize);
        }
        if (savedColors) {
          setThemeColors(JSON.parse(savedColors));
        }
      } catch (error) {
        console.error('Erro ao carregar tema:', error);
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = !isDarkTheme ? 'dark' : 'light';
    setIsDarkTheme((prevState) => !prevState);
    await AsyncStorage.setItem('theme', newTheme);
  };

  const changeFontSize = async (size) => {
    setFontSize(size);
    await AsyncStorage.setItem('fontSize', size);
  };

  const updateThemeColors = async (newColors) => {
    setThemeColors(newColors);
    await AsyncStorage.setItem('themeColors', JSON.stringify(newColors));
  };

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme, fontSize, changeFontSize, themeColors, updateThemeColors }}>
      {children}
    </ThemeContext.Provider>
  );
};
