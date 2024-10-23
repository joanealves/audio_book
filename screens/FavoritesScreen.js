import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../ThemeContext'; // Importar o ThemeContext
import { Ionicons } from '@expo/vector-icons'; // Ícone para interação

export default function FavoritesScreen({ navigation }) {
  const { isDarkTheme } = useContext(ThemeContext); // Usar o contexto para tema
  const [favorites, setFavorites] = useState([]); // Lista de livros favoritos

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedBooks = await AsyncStorage.getItem('books');
        const books = storedBooks ? JSON.parse(storedBooks) : [];
        const favoriteBooks = books.filter(book => book.favorite);
        setFavorites(favoriteBooks);
      } catch (error) {
        console.error('Erro ao carregar favoritos:', error);
      }
    };

    loadFavorites();
  }, []);

  const toggleFavorite = async (book) => {
    const updatedBooks = favorites.map(b => {
      if (b.id === book.id) {
        return { ...b, favorite: !b.favorite };
      }
      return b;
    });

    setFavorites(updatedBooks.filter(book => book.favorite)); // Atualiza a lista de favoritos
    const allBooks = await AsyncStorage.getItem('books');
    const books = allBooks ? JSON.parse(allBooks) : [];
    const updatedAllBooks = books.map(b => (b.id === book.id ? { ...b, favorite: !b.favorite } : b));
    await AsyncStorage.setItem('books', JSON.stringify(updatedAllBooks)); // Salva a alteração
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.bookItem, isDarkTheme ? styles.darkItem : styles.lightItem]}
      onPress={() => navigation.navigate('BookDetail', { book: item })}
    >
      <View style={styles.bookInfo}>
        <Text style={[styles.title, isDarkTheme ? styles.darkText : styles.lightText]}>{item.title}</Text>
        <Text style={[styles.author, isDarkTheme ? styles.darkText : styles.lightText]}>Autor: {item.author}</Text>
      </View>
      <TouchableOpacity onPress={() => toggleFavorite(item)}>
        <Ionicons 
          name={item.favorite ? 'heart' : 'heart-outline'} 
          size={24} 
          color={item.favorite ? '#ff4081' : '#ccc'} 
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, isDarkTheme ? styles.darkContainer : styles.lightContainer]}>
      <Text style={[styles.header, isDarkTheme ? styles.darkText : styles.lightText]}>Favoritos</Text>

      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <Text style={[styles.emptyText, isDarkTheme ? styles.darkText : styles.lightText]}>
            Nenhum livro favorito.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  lightContainer: {
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  bookItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bookInfo: {
    flexDirection: 'column',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 14,
    color: '#555',
  },
  lightText: {
    color: '#000',
  },
  darkText: {
    color: '#fff',
  },
  darkItem: {
    backgroundColor: '#444',
  },
  lightItem: {
    backgroundColor: '#fff',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});
