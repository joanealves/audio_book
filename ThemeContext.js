import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    useEffect(() => {
        const loadTheme = async () => {
            try {
                const theme = await AsyncStorage.getItem('theme');
                if (theme) {
                    setIsDarkTheme(theme === 'dark');
                }
            } catch (error) {
                console.error('Erro ao carregar tema:', error);
            }
        };

        loadTheme();
    }, []);

    const toggleTheme = async () => {
        const newTheme = !isDarkTheme ? 'dark' : 'light';
        setIsDarkTheme(previousState => !previousState);
        await AsyncStorage.setItem('theme', newTheme);
    };

    return (
        <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};