import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ThemeContext } from '../ThemeContext';

export default function AdvancedSearchScreen({ books }) {
  const { isDarkTheme, fontSize } = useContext(ThemeContext); 
  const [title, setTitle] = useState(''); 
  const [author, setAuthor] = useState(''); 
  const [category, setCategory] = useState(''); // Novo campo para categoria
  const [filteredBooks, setFilteredBooks] = useState(books); 
  const [loading, setLoading] = useState(false); // Indicador de carregamento

  // Função para busca instantânea
  useEffect(() => {
    handleSearch();
  }, [title, author, category]);

  const handleSearch = () => {
    setLoading(true);
    const results = books.filter(book =>
      book.title.toLowerCase().includes(title.toLowerCase()) &&
      book.author.toLowerCase().includes(author.toLowerCase()) &&
      book.category.toLowerCase().includes(category.toLowerCase()) // Filtra por categoria
    );
    setFilteredBooks(results);
    setLoading(false);
  };

  const clearFilters = () => {
    setTitle('');
    setAuthor('');
    setCategory('');
    setFilteredBooks(books); // Reseta os filtros
  };

  const renderItem = ({ item }) => (
    <View style={[styles.item, isDarkTheme ? styles.darkItem : styles.lightItem]}>
      <Text style={[styles.title, isDarkTheme ? styles.darkText : styles.lightText, fontSize === 'large' ? styles.largeText : fontSize === 'small' ? styles.smallText : null]}>
        {item.title}
      </Text>
      <Text style={[styles.author, isDarkTheme ? styles.darkText : styles.lightText]}>
        Autor: {item.author}
      </Text>
      <Text style={[styles.category, isDarkTheme ? styles.darkText : styles.lightText]}>
        Categoria: {item.category || 'Não informado'}
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, isDarkTheme ? styles.darkContainer : styles.lightContainer]}>
      <Text style={[styles.header, isDarkTheme ? styles.darkText : styles.lightText]}>Busca Avançada</Text>
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
        placeholder="Categoria"
        value={category}
        onChangeText={setCategory}
        placeholderTextColor={isDarkTheme ? "#aaa" : "#555"}
      />
      
      <View style={styles.buttonContainer}>
        <Button title="Limpar Filtros" onPress={clearFilters} color="#ff4081" />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#ff4081" />
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
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
  buttonContainer: {
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
  category: {
    fontSize: 12,
    color: '#888',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  darkText: {
    color: '#fff',
  },
  lightText: {
    color: '#000',
  },
  darkItem: {
    backgroundColor: '#444',
  },
  lightItem: {
    backgroundColor: '#fff',
  },
  smallText: {
    fontSize: 14,
  },
  largeText: {
    fontSize: 22,
  },
});
