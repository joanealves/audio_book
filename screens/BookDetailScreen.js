import React, { useState, useContext } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons'; // Ícones para favoritos
import { ThemeContext } from '../ThemeContext'; // Importar o ThemeContext

export default function BookDetailScreen({ route, navigation }) {
  const { isDarkTheme } = useContext(ThemeContext); // Usar o contexto para tema
  const { book } = route.params; // Recebe o livro selecionado
  const [isFavorite, setIsFavorite] = useState(book.favorite); // Estado para favorito

  const toggleFavorite = async () => {
    const updatedBook = { ...book, favorite: !isFavorite };
    setIsFavorite(!isFavorite);

    const storedBooks = await AsyncStorage.getItem('books');
    const books = storedBooks ? JSON.parse(storedBooks) : [];
    const updatedBooks = books.map(b => (b.id === book.id ? updatedBook : b));

    await AsyncStorage.setItem('books', JSON.stringify(updatedBooks)); // Atualiza no AsyncStorage
  };

  return (
    <View style={[styles.container, isDarkTheme ? styles.darkContainer : styles.lightContainer]}>
      <Text style={[styles.title, isDarkTheme ? styles.darkText : styles.lightText]}>{book.title}</Text>
      <Text style={[styles.author, isDarkTheme ? styles.darkText : styles.lightText]}>Autor: {book.author}</Text>
      <Text style={[styles.description, isDarkTheme ? styles.darkText : styles.lightText]}>
        {book.description || 'Sem descrição disponível.'}
      </Text>

      <View style={styles.actionsContainer}>
        <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={24}
            color={isFavorite ? '#ff4081' : '#ccc'}
          />
          <Text style={[styles.favoriteText, isDarkTheme ? styles.darkText : styles.lightText]}>
            {isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          </Text>
        </TouchableOpacity>
        
        <Button
          title="Ouvir Audiobook"
          onPress={() => navigation.navigate('AudioPlayer', { audioFile: book.audioUrl })}
          accessibilityLabel="Ouvir Audiobook"
        />
      </View>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  author: {
    fontSize: 18,
    marginBottom: 10,
    color: '#555',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  actionsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  favoriteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  favoriteText: {
    marginLeft: 10,
    fontSize: 16,
  },
  lightText: {
    color: '#000',
  },
  darkText: {
    color: '#fff',
  },
});
