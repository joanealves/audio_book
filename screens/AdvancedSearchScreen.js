import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { ThemeContext } from '../ThemeContext'; // Importar o ThemeContext

export default function AdvancedSearchScreen({ books }) {
  const { isDarkTheme } = useContext(ThemeContext); // Usar o contexto para tema
  const [title, setTitle] = useState(''); // Estado para título
  const [author, setAuthor] = useState(''); // Estado para autor
  const [filteredBooks, setFilteredBooks] = useState(books); // Estado para os livros filtrados

  const handleSearch = () => {
    const results = books.filter(book =>
      book.title.toLowerCase().includes(title.toLowerCase()) &&
      book.author.toLowerCase().includes(author.toLowerCase())
    );
    setFilteredBooks(results);
  };

  const renderItem = ({ item }) => (
    <View style={[styles.item, isDarkTheme ? styles.darkItem : styles.lightItem]}>
      <Text style={[styles.title, isDarkTheme ? styles.darkText : styles.lightText]}>
        {item.title}
      </Text>
      <Text style={[styles.author, isDarkTheme ? styles.darkText : styles.lightText]}>
        Autor: {item.author}
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
        accessibilityLabel="Campo para busca por título"
        placeholderTextColor={isDarkTheme ? "#aaa" : "#555"}
      />
      <TextInput
        style={styles.input}
        placeholder="Autor"
        value={author}
        onChangeText={setAuthor}
        accessibilityLabel="Campo para busca por autor"
        placeholderTextColor={isDarkTheme ? "#aaa" : "#555"}
      />
      <Button title="Buscar" onPress={handleSearch} accessibilityLabel="Iniciar busca avançada" />
      
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
