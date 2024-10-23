import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, Button, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../ThemeContext'; // Importar o ThemeContext

export default function LibraryScreen({ navigation }) {
  const { isDarkTheme } = useContext(ThemeContext); // Usar o contexto para tema
  const [books, setBooks] = useState([]); // Estado para os livros da biblioteca
  const [showFavorites, setShowFavorites] = useState(false); // Estado para exibir apenas favoritos
  const [loading, setLoading] = useState(true); // Estado para controle de carregamento

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const storedBooks = await AsyncStorage.getItem('books');
        const booksList = storedBooks ? JSON.parse(storedBooks) : [];
        setBooks(booksList);
      } catch (error) {
        console.error('Erro ao carregar livros:', error);
      } finally {
        setLoading(false); // Finalizar o carregamento
      }
    };

    loadBooks();
  }, []);

  const toggleShowFavorites = () => {
    setShowFavorites(prevState => !prevState);
  };

  const filteredBooks = showFavorites ? books.filter(book => book.favorite) : books;

  const renderItem = ({ item }) => (
    <View style={[styles.item, isDarkTheme ? styles.darkItem : styles.lightItem]}>
      <Text style={[styles.title, isDarkTheme ? styles.darkText : styles.lightText]}>{item.title}</Text>
      <Text style={[styles.author, isDarkTheme ? styles.darkText : styles.lightText]}>Autor: {item.author}</Text>
      <Button
        title="Ver Detalhes"
        onPress={() => navigation.navigate('BookDetail', { book: item })}
        accessibilityLabel={`Ver detalhes do livro ${item.title}`}
      />
    </View>
  );

  return (
    <View style={[styles.container, isDarkTheme ? styles.darkContainer : styles.lightContainer]}>
      <Text style={[styles.header, isDarkTheme ? styles.darkText : styles.lightText]}>Biblioteca</Text>
      <Button
        title={showFavorites ? "Mostrar Todos" : "Mostrar Favoritos"}
        onPress={toggleShowFavorites}
        accessibilityLabel="Alternar entre mostrar todos os livros e favoritos"
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : filteredBooks.length > 0 ? (
        <FlatList
          data={filteredBooks}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      ) : (
        <Text style={[styles.emptyText, isDarkTheme ? styles.darkText : styles.lightText]}>
          Nenhum livro encontrado na biblioteca.
        </Text>
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
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
