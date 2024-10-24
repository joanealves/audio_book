import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [fontSize, setFontSize] = useState('medium');

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const theme = await AsyncStorage.getItem('theme');
        const savedFontSize = await AsyncStorage.getItem('fontSize');
        if (theme) {
          setIsDarkTheme(theme === 'dark');
        }
        if (savedFontSize) {
          setFontSize(savedFontSize);
        }
      } catch (error) {
        console.error('Erro ao carregar tema:', error);
      }
    };

    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = !isDarkTheme ? 'dark' : 'light';
    setIsDarkTheme((prev) => !prev);
    await AsyncStorage.setItem('theme', newTheme);
  };

  const changeFontSize = async (size) => {
    setFontSize(size);
    await AsyncStorage.setItem('fontSize', size);
  };

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme, fontSize, changeFontSize }}>
      {children}
    </ThemeContext.Provider>
  );
};
