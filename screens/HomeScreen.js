import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { ThemeContext } from '../ThemeContext'; // Importando o contexto de tema

const { width } = Dimensions.get('window');

const audiobooks = [
  { id: '1', title: 'Audiobook 1', author: 'Autor 1', cover: 'https://via.placeholder.com/150' },
  { id: '2', title: 'Audiobook 2', author: 'Autor 2', cover: 'https://via.placeholder.com/150' },
];

export default function HomeScreen({ navigation }) {
  const { isDarkTheme, fontSize } = useContext(ThemeContext);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('AudioPlayer', { book: item })}>
      <Image source={{ uri: item.cover }} style={styles.coverImage} />
      <Text style={[styles.title, fontSize === 'small' && styles.smallText, fontSize === 'large' && styles.largeText]}>
        {item.title}
      </Text>
      <Text style={styles.author}>{item.author}</Text>
    </TouchableOpacity>
  );

  const handleLibraryNavigation = () => {
    navigation.navigate('Library');
  };

  return (
    <View style={[styles.container, isDarkTheme ? styles.darkContainer : styles.lightContainer]}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={[styles.header, fontSize === 'small' && styles.smallText, fontSize === 'large' && styles.largeText]}>
          Sua Biblioteca de Audiobooks
        </Text>

        <FlatList
          data={audiobooks}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}  // Definindo duas colunas para melhor responsividade
          columnWrapperStyle={styles.row}
          scrollEnabled={false}
        />

        <TouchableOpacity style={styles.libraryButton} onPress={handleLibraryNavigation}>
          <Text style={styles.libraryButtonText}>Explorar Biblioteca</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 50,
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  lightContainer: {
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flexGrow: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    flex: 1,
    margin: 5, // Margem menor para cards mais compactos
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    alignItems: 'center',
    padding: 10, // Adicionando preenchimento
  },
  coverImage: {
    width: width * 0.38, // Ajuste menor para responsividade
    height: width * 0.38,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    fontSize: 14, // Tamanho de fonte ajustado para cards menores
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  author: {
    fontSize: 12,
    color: '#aaa',
    marginBottom: 10,
    textAlign: 'center',
  },
  smallText: {
    fontSize: 12,
  },
  largeText: {
    fontSize: 20,
  },
  libraryButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 15,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  libraryButtonText: {
    fontSize: 18,
    color: '#fff',
  },
});
