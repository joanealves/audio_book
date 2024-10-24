import React, { useContext } from 'react';
import { View, ActivityIndicator, Text, StyleSheet, Animated } from 'react-native';
import { ThemeContext } from '../ThemeContext'; // Caso esteja usando ThemeContext

export default function LoadingSpinner({ color = "#0000ff", message = "Carregando...", textSize = 18 }) {
    const { isDarkTheme } = useContext(ThemeContext); // Pegar o tema atual, se estiver usando ThemeContext
    const fadeAnim = new Animated.Value(0); // Para efeito de transição suave

    // Animação para aparecer o componente
    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim }, isDarkTheme ? styles.darkContainer : styles.lightContainer]}>
            <ActivityIndicator size="large" color={color} accessibilityLabel="Carregando" />
            <Text style={[styles.text, { fontSize: textSize }, isDarkTheme ? styles.darkText : styles.lightText]}>
                {message}
            </Text>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    lightContainer: {
        backgroundColor: '#f5f5f5',
    },
    darkContainer: {
        backgroundColor: '#121212',
    },
    text: {
        marginTop: 20,
        textAlign: 'center',
    },
    lightText: {
        color: '#000',
    },
    darkText: {
        color: '#fff',
    },
});
