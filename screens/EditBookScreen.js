import React, { useState, useContext, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../ThemeContext'; 

const EditBookScreen = ({ route, navigation }) => {
  const { book } = route.params; 
  const { isDarkTheme } = useContext(ThemeContext); 
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [description, setDescription] = useState(book.description);
  const [loading, setLoading] = useState(false); 
  const [hasChanges, setHasChanges] = useState(false); 

  useEffect(() => {
    // Verifica se algum campo foi alterado
    if (title !== book.title || author !== book.author || description !== book.description) {
      setHasChanges(true);
    } else {
      setHasChanges(false);
    }
  }, [title, author, description]);

  const handleSave = async () => {
    if (!title.trim() || !author.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const updatedBook = { ...book, title, author, description };

    setLoading(true);

    try {
      const storedBooks = await AsyncStorage.getItem('books');
      const books = JSON.parse(storedBooks);
      const updatedBooks = books.map(b => (b.id === book.id ? updatedBook : b));

      await AsyncStorage.setItem('books', JSON.stringify(updatedBooks)); 
      Alert.alert('Sucesso', 'Livro atualizado com sucesso!');
      navigation.goBack(); 
    } catch (error) {
      Alert.alert('Erro', 'Erro ao salvar o livro.');
    } finally {
      setLoading(false); 
    }
  };

  const handleCancel = () => {
    if (hasChanges) {
      Alert.alert(
        'Alterações não salvas',
        'Você tem alterações não salvas. Deseja sair sem salvar?',
        [
          { text: 'Não', style: 'cancel' },
          { text: 'Sim', onPress: () => navigation.goBack() }
        ]
      );
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={[styles.container, isDarkTheme ? styles.darkContainer : styles.lightContainer]}>
      <TextInput
        style={[styles.input, title !== book.title && styles.modifiedInput]}
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
        placeholderTextColor={isDarkTheme ? "#aaa" : "#555"}
      />
      <TextInput
        style={[styles.input, author !== book.author && styles.modifiedInput]}
        placeholder="Autor"
        value={author}
        onChangeText={setAuthor}
        placeholderTextColor={isDarkTheme ? "#aaa" : "#555"}
      />
      <TextInput
        style={[styles.input, description !== book.description && styles.modifiedInput, styles.multilineInput]}
        placeholder="Descrição (opcional)"
        value={description}
        onChangeText={setDescription}
        placeholderTextColor={isDarkTheme ? "#aaa" : "#555"}
        multiline
        numberOfLines={4}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#ff4081" />
      ) : (
        <View style={styles.buttonContainer}>
          <Button 
            title="Salvar Alterações" 
            onPress={handleSave} 
            accessibilityLabel="Botão para salvar alterações no livro" 
            color="#1E90FF"
          />
          <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
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
  multilineInput: {
    height: 80,
    textAlignVertical: 'top', // Ajusta a altura do campo de descrição
  },
  modifiedInput: {
    borderColor: '#1E90FF', // Destaque visual para campos modificados
  },
  buttonContainer: {
    marginTop: 20,
  },
  cancelButton: {
    marginTop: 15,
    alignItems: 'center',
  },
  cancelText: {
    color: '#ff4081',
    fontSize: 16,
  },
});

export default EditBookScreen;
