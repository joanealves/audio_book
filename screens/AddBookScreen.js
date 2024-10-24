import React, { useState, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, ActivityIndicator, Picker, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../ThemeContext'; 
import * as ImagePicker from 'expo-image-picker';

const AddBookScreen = ({ navigation }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('Ficção'); // Categoria de livros
  const [image, setImage] = useState(null); // Estado para imagem de capa

  const handleAddBook = async () => {
    if (!title || !author) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const storedBooks = await AsyncStorage.getItem('books');
    const books = storedBooks ? JSON.parse(storedBooks) : [];

    const isDuplicate = books.some(b => b.title === title);
    if (isDuplicate) {
      Alert.alert('Erro', 'Já existe um livro com este título.');
      return;
    }

    const newBook = { id: Date.now().toString(), title, author, description, category, image };
    setLoading(true);

    try {
      books.push(newBook);
      await AsyncStorage.setItem('books', JSON.stringify(books)); 
      Alert.alert('Sucesso', 'Livro adicionado com sucesso!');
      navigation.goBack(); 
    } catch (error) {
      Alert.alert('Erro', 'Erro ao adicionar o livro.');
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
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

      {/* Picker de Categoria */}
      <Picker
        selectedValue={category}
        onValueChange={(itemValue) => setCategory(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Ficção" value="Ficção" />
        <Picker.Item label="Não-Ficção" value="Não-Ficção" />
        <Picker.Item label="Ciência" value="Ciência" />
        <Picker.Item label="História" value="História" />
      </Picker>

      {/* Upload de imagem */}
      <TouchableOpacity onPress={pickImage}>
        <Text>Selecionar Imagem</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

      {loading ? (
        <ActivityIndicator size="large" color="#ff4081" />
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
  picker: {
    height: 50,
    marginBottom: 20,
  },
});

export default AddBookScreen;
