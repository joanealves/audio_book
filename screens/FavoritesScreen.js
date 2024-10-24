import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function FavoritesScreen({ navigation }) {
  const [favorites, setFavorites] = useState([]);

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

    setFavorites(updatedBooks.filter(book => book.favorite)); 
    const allBooks = await AsyncStorage.getItem('books');
    const books = allBooks ? JSON.parse(allBooks) : [];
    const updatedAllBooks = books.map(b => (b.id === book.id ? { ...b, favorite: !b.favorite } : b));
    await AsyncStorage.setItem('books', JSON.stringify(updatedAllBooks)); 
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.bookItem} 
      onPress={() => navigation.navigate('BookDetail', { book: item })}
    >
      <View style={styles.bookInfo}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.author}>Autor: {item.author}</Text>
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
    <View style={styles.container}>
      <Text style={styles.header}>Favoritos</Text>

      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum livro favorito.</Text>
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
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});