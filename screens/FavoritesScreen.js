import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity, ActivityIndicator, Dimensions, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function FavoritesScreen({ navigation }) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedBooks = await AsyncStorage.getItem('books');
        const books = storedBooks ? JSON.parse(storedBooks) : [];
        const favoriteBooks = books.filter(book => book.favorite);
        setFavorites(favoriteBooks);
      } catch (error) {
        console.error('Erro ao carregar favoritos:', error);
      } finally {
        setLoading(false);
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

    // Exibe um alerta ao desfavoritar
    Alert.alert('Favorito', book.favorite ? 'Removido dos favoritos' : 'Adicionado aos favoritos');
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

      {loading ? (
        <ActivityIndicator size="large" color="#1E90FF" />
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhum livro favorito.</Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  bookItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
    borderRadius: 8,
    backgroundColor: '#1e1e1e',
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
    color: '#fff',
  },
  author: {
    fontSize: 14,
    color: '#aaa',
  },
  emptyText: {
    textAlign: 'center',
    color: '#fff',
    marginTop: 20,
    fontSize: 16,
  },
});
