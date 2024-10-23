import React, { useState, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../ThemeContext'; // Importar o ThemeContext

const AddBookScreen = ({ navigation }) => {
  const { isDarkTheme } = useContext(ThemeContext); // Usar o contexto para tema
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false); // Estado para controlar carregamento

  // Função para adicionar o livro
  const handleAddBook = async () => {
    if (!title || !author) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const newBook = { id: Date.now().toString(), title, author, description };

    setLoading(true); // Exibir indicador de carregamento

    try {
      const storedBooks = await AsyncStorage.getItem('books');
      const books = storedBooks ? JSON.parse(storedBooks) : [];
      books.push(newBook);

      await AsyncStorage.setItem('books', JSON.stringify(books)); // Salvar no armazenamento local
      Alert.alert('Sucesso', 'Livro adicionado com sucesso!');
      navigation.goBack(); // Voltar à tela anterior após salvar
    } catch (error) {
      Alert.alert('Erro', 'Erro ao adicionar o livro.');
    } finally {
      setLoading(false); // Parar o carregamento
    }
  };

  return (
    <View style={[styles.container, isDarkTheme ? styles.darkContainer : styles.lightContainer]}>
      <TextInput
        style={styles.input}
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
        placeholderTextColor={isDarkTheme ? "#aaa" : "#555"}
      />
      <TextInput
        style={styles.input}
        placeholder="Autor"
        value={author}
        onChangeText={setAuthor}
        placeholderTextColor={isDarkTheme ? "#aaa" : "#555"}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição (opcional)"
        value={description}
        onChangeText={setDescription}
        placeholderTextColor={isDarkTheme ? "#aaa" : "#555"}
      />
      
      {loading ? (
        <ActivityIndicator size="large" color="#ff4081" /> // Indicador de carregamento
      ) : (
        <Button 
          title="Adicionar Livro" 
          onPress={handleAddBook} 
          accessibilityLabel="Botão para adicionar livro" 
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  lightContainer: {
    backgroundColor: '#f5f5f5',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: '#000',
  },
});

export default AddBookScreen;
