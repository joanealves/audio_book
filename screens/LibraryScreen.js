import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LibraryScreen({ navigation }) {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const storedBooks = await AsyncStorage.getItem('books');
        const booksList = storedBooks ? JSON.parse(storedBooks) : [];
        setBooks(booksList);
        setFilteredBooks(booksList);
      } catch (error) {
        console.error('Erro ao carregar livros:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, []);

  const toggleShowFavorites = () => {
    setShowFavorites((prevState) => !prevState);
    if (!showFavorites) {
      setFilteredBooks(books.filter((book) => book.favorite));
    } else {
      setFilteredBooks(books);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      const filtered = books.filter((book) =>
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredBooks(filtered);
    } else {
      setFilteredBooks(books);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('BookDetail', { book: item })}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.author}>Autor: {item.author}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Biblioteca</Text>

      <TextInput
        style={styles.searchBar}
        placeholder="Buscar por título ou autor"
        value={searchQuery}
        onChangeText={handleSearch}
      />

      <Button
        title={showFavorites ? 'Mostrar Todos' : 'Mostrar Favoritos'}
        onPress={toggleShowFavorites}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : filteredBooks.length > 0 ? (
        <FlatList
          data={filteredBooks}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text style={styles.emptyText}>Nenhum livro encontrado na biblioteca.</Text>
      )}
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
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
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
