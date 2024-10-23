import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../ThemeContext'; // Importar o ThemeContext

export default function SearchScreen() {
  const { isDarkTheme } = useContext(ThemeContext); // Usar o contexto para tema
  const [searchQuery, setSearchQuery] = useState(''); // Query de busca
  const [books, setBooks] = useState([]); // Lista completa de livros
  const [filteredBooks, setFilteredBooks] = useState([]); // Livros filtrados com base na busca
  const [loading, setLoading] = useState(true); // Estado para controle de carregamento

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
        setLoading(false); // Finalizar o carregamento
      }
    };

    loadBooks();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredBooks(books); // Se a pesquisa estiver vazia, mostrar todos os livros
      return;
    }

    const filtered = books.filter(book =>
      book.title.toLowerCase().includes(query.toLowerCase()) ||
      book.author.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBooks(filtered);
  };

  const renderItem = ({ item }) => (
    <View style={[styles.item, isDarkTheme ? styles.darkItem : styles.lightItem]}>
      <Text style={[styles.title, isDarkTheme ? styles.darkText : styles.lightText]}>{item.title}</Text>
      <Text style={[styles.author, isDarkTheme ? styles.darkText : styles.lightText]}>Autor: {item.author}</Text>
    </View>
  );

  return (
    <View style={[styles.container, isDarkTheme ? styles.darkContainer : styles.lightContainer]}>
      <TextInput
        style={styles.input}
        placeholder="Buscar por título ou autor"
        value={searchQuery}
        onChangeText={handleSearch}
        placeholderTextColor={isDarkTheme ? "#aaa" : "#555"}
        accessibilityLabel="Campo de busca para título ou autor"
      />

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
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: '#000',
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
