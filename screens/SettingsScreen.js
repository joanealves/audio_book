import React, { useContext } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { ThemeContext } from '../ThemeContext';

const SettingsScreen = () => {
    const { isDarkTheme, toggleTheme } = useContext(ThemeContext);

    return (
        <View style={[styles.container, isDarkTheme ? styles.darkContainer : styles.lightContainer]}>
            <Text style={styles.header}>Configurações</Text>
            <View style={styles.option}>
                <Text style={styles.optionText}>Tema Escuro</Text>
                <Switch value={isDarkTheme} onValueChange={toggleTheme} />
            </View>
            {/* Adicione mais opções de configuração conforme necessário */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    darkContainer: {
        backgroundColor: '#1e1e1e',
    },
    lightContainer: {
        backgroundColor: '#f5f5f5',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    option: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    optionText: {
        fontSize: 18,
    },
});

export default SettingsScreen;