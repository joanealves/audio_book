import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next'; // Usar a função de tradução

const { width } = Dimensions.get('window');

export default function LibraryScreen({ navigation }) {
  const { t } = useTranslation(); // Hook para usar as traduções
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
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('BookDetail', { book: item })}
    >
      <View style={styles.bookInfo}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.author}>{t('author')}: {item.author}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t('library')}</Text>

      <TextInput
        style={styles.searchBar}
        placeholder={t('search')}
        value={searchQuery}
        onChangeText={handleSearch}
      />

      <Button
        title={showFavorites ? t('show_all') : t('show_favorites')}
        onPress={toggleShowFavorites}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#1E90FF" />
      ) : filteredBooks.length > 0 ? (
        <FlatList
          data={filteredBooks}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text style={styles.emptyText}>{t('no_books_found_in_library')}</Text>
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
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  item: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
    borderRadius: 8,
    backgroundColor: '#1e1e1e',
    marginBottom: 10,
    zIndex: 1,
  },
  bookInfo: {
    flex: 1,
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
