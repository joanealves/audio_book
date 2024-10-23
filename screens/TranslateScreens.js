import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { ThemeContext } from '../ThemeContext';

export default function TranslateScreen() {
  const { isDarkTheme } = useContext(ThemeContext); // Usar o contexto para tema
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      alert('Por favor, insira um texto para traduzir.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('https://api.mymemory.translated.net/get?q=' + encodeURI(inputText) + '&langpair=en|es');
      const data = await response.json();
      setTranslatedText(data.responseData.translatedText);
    } catch (error) {
      alert('Erro ao traduzir o texto. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, isDarkTheme ? styles.darkContainer : styles.lightContainer]}>
      <Text style={[styles.header, isDarkTheme ? styles.darkText : styles.lightText]}>Tradutor de Texto</Text>
      <TextInput
        style={styles.input}
        placeholder="Insira o texto em inglês..."
        value={inputText}
        onChangeText={setInputText}
      />
      <Button title="Traduzir para Espanhol" onPress={handleTranslate} />
      {loading ? (
        <ActivityIndicator size="large" color="#ff4081" />
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
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  translatedText: {
    fontSize: 16,
    marginTop: 20,
  },
  lightText: {
    color: '#000',
  },
  darkText: {
    color: '#fff',
  },
});
