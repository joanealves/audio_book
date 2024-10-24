import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AudioPlayer from '../components/AudioPlayer'; // Componente do player de áudio

export default function AudioPlayerScreen({ route }) {
  const { book } = route.params; // Recebe o livro selecionado da navegação

  return (
    <View style={styles.container}>
      <Text style={styles.bookTitle}>{book.title}</Text> {/* Exibe o título do audiobook */}
      <Text style={styles.bookAuthor}>Autor: {book.author}</Text> {/* Exibe o autor do audiobook */}
      
      {/* Componente do player de áudio */}
      <AudioPlayer audioFile={book.audioFile} audioId={book.id} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1e1e1e',
    justifyContent: 'center',
  },
  bookTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  bookAuthor: {
    fontSize: 18,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 20,
  },
});
