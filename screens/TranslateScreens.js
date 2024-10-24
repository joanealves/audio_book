import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { ThemeContext } from '../ThemeContext';

export default function TranslateScreen() {
  const { isDarkTheme } = useContext(ThemeContext);
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      Alert.alert('Erro', 'Por favor, insira um texto para traduzir.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURI(inputText)}&langpair=en|es`
      );
      const data = await response.json();
      setTranslatedText(data.responseData.translatedText);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível traduzir o texto. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, isDarkTheme ? styles.darkContainer : styles.lightContainer]}>
      <Text style={[styles.header, isDarkTheme ? styles.darkText : styles.lightText]}>Tradutor de Texto</Text>
      
      <TextInput
        style={[styles.input, isDarkTheme ? styles.darkInput : styles.lightInput]}
        placeholder="Insira o texto em inglês..."
        placeholderTextColor={isDarkTheme ? '#aaa' : '#555'}
        value={inputText}
        onChangeText={setInputText}
        accessibilityLabel="Campo de entrada de texto para tradução"
      />
      
      <Button title="Traduzir para Espanhol" onPress={handleTranslate} color="#1E90FF" />
      
      {loading ? (
        <ActivityIndicator size="large" color="#ff4081" style={styles.loader} />
      ) : (
        <Text style={[styles.translatedText, isDarkTheme ? styles.darkText : styles.lightText]}>
          {translatedText || 'A tradução aparecerá aqui.'}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  lightContainer: {
    backgroundColor: '#f5f5f5',
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  lightInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    color: '#000',
  },
  darkInput: {
    borderColor: '#555',
    borderWidth: 1,
    color: '#fff',
  },
  translatedText: {
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
  },
  lightText: {
    color: '#000',
  },
  darkText: {
    color: '#fff',
  },
  loader: {
    marginTop: 20,
  },
});
