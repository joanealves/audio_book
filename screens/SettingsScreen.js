import React, { useContext, useState } from 'react';
import { View, Text, Switch, StyleSheet, Picker } from 'react-native';
import { ThemeContext } from '../ThemeContext'; // Importando o ThemeContext

const SettingsScreen = () => {
    const { isDarkTheme, toggleTheme, fontSize, changeFontSize, language, changeLanguage } = useContext(ThemeContext);
    const [selectedFontSize, setSelectedFontSize] = useState(fontSize);
    const [selectedLanguage, setSelectedLanguage] = useState(language);

    return (
        <View style={[styles.container, isDarkTheme ? styles.darkContainer : styles.lightContainer]}>
            <Text style={[styles.header, isDarkTheme ? styles.darkText : styles.lightText]}>Configurações</Text>

            {/* Alternar Tema */}
            <View style={styles.option}>
                <Text style={styles.optionText}>Tema Escuro</Text>
                <Switch value={isDarkTheme} onValueChange={toggleTheme} />
            </View>

            {/* Alterar Tamanho da Fonte */}
            <View style={styles.option}>
                <Text style={styles.optionText}>Tamanho da Fonte</Text>
                <Picker
                    selectedValue={selectedFontSize}
                    style={styles.picker}
                    onValueChange={(itemValue) => {
                        setSelectedFontSize(itemValue);
                        changeFontSize(itemValue);
                    }}
                >
                    <Picker.Item label="Pequena" value="small" />
                    <Picker.Item label="Média" value="medium" />
                    <Picker.Item label="Grande" value="large" />
                </Picker>
            </View>

            {/* Alterar Idioma */}
            <View style={styles.option}>
                <Text style={styles.optionText}>Idioma</Text>
                <Picker
                    selectedValue={selectedLanguage}
                    style={styles.picker}
                    onValueChange={(itemValue) => {
                        setSelectedLanguage(itemValue);
                        changeLanguage(itemValue);
                    }}
                >
                    <Picker.Item label="Português" value="pt" />
                    <Picker.Item label="Inglês" value="en" />
                </Picker>
            </View>
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
    picker: {
        height: 50,
        width: 150,
    },
    darkText: {
        color: '#fff',
    },
    lightText: {
        color: '#000',
    },
});

export default SettingsScreen;
