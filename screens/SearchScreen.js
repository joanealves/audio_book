import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../ThemeContext'; // Importar o ThemeContext

export default function SearchScreen() {
  const { isDarkTheme } = useContext(ThemeContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState([]);
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
        Alert.alert('Erro', 'Não foi possível carregar os livros.');
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredBooks(books);
      return;
    }

    const filtered = books.filter(book =>
      book.title.toLowerCase().includes(query.toLowerCase()) ||
      book.author.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBooks(filtered);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setFilteredBooks(books);
  };

  const renderItem = ({ item }) => (
    <View style={[styles.item, isDarkTheme ? styles.darkItem : styles.lightItem]}>
      <Text style={[styles.title, isDarkTheme ? styles.darkText : styles.lightText]}>{item.title}</Text>
      <Text style={[styles.author, isDarkTheme ? styles.darkText : styles.lightText]}>Autor: {item.author}</Text>
    </View>
  );

  return (
    <View style={[styles.container, isDarkTheme ? styles.darkContainer : styles.lightContainer]}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={isDarkTheme ? "#fff" : "#000"} style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Buscar por título ou autor"
          value={searchQuery}
          onChangeText={handleSearch}
          placeholderTextColor={isDarkTheme ? "#aaa" : "#555"}
          accessibilityLabel="Campo de busca para título ou autor"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
            <Ionicons name="close-circle" size={20} color={isDarkTheme ? "#fff" : "#000"} />
          </TouchableOpacity>
        )}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={filteredBooks}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListEmptyComponent={
            <Text style={[styles.emptyText, isDarkTheme ? styles.darkText : styles.lightText]}>
              Nenhum livro encontrado.
            </Text>
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
  },
  lightContainer: {
    backgroundColor: '#f5f5f5',
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: '#000',
  },
  clearButton: {
    marginLeft: 10,
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
});
