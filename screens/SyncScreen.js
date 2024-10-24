import React, { useState, useContext } from 'react';
import { View, Text, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../ThemeContext';

export default function SyncScreen() {
  const { isDarkTheme } = useContext(ThemeContext); 
  const [loading, setLoading] = useState(false); 
  const [syncingFavorites, setSyncingFavorites] = useState(false); // Estado para sincronizar favoritos

  const syncBooks = async () => {
    Alert.alert(
      "Confirmação",
      "Você deseja sincronizar todos os livros?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Sincronizar",
          onPress: async () => {
            setLoading(true);
            try {
              const storedBooks = await AsyncStorage.getItem('books');
              const books = storedBooks ? JSON.parse(storedBooks) : [];

              // Simular sincronização com servidor
              await new Promise(resolve => setTimeout(resolve, 2000)); // Simulação de 2 segundos
              Alert.alert('Sucesso', 'Livros sincronizados com sucesso!');
            } catch (error) {
              console.error('Erro ao sincronizar livros:', error);
              Alert.alert('Erro', 'Erro ao sincronizar livros. Tente novamente mais tarde.');
            } finally {
              setLoading(false);
            }
          }
        }
      ]
    );
  };

  const syncFavorites = async () => {
    setSyncingFavorites(true);
    try {
      const storedBooks = await AsyncStorage.getItem('books');
      const books = storedBooks ? JSON.parse(storedBooks) : [];
      const favoriteBooks = books.filter(book => book.favorite);

      // Simular sincronização dos favoritos
      await new Promise(resolve => setTimeout(resolve, 2000)); 
      Alert.alert('Sucesso', 'Favoritos sincronizados com sucesso!');
    } catch (error) {
      console.error('Erro ao sincronizar favoritos:', error);
      Alert.alert('Erro', 'Erro ao sincronizar favoritos.');
    } finally {
      setSyncingFavorites(false);
    }
  };

  return (
    <View style={[styles.container, isDarkTheme ? styles.darkContainer : styles.lightContainer]}>
      <Text style={[styles.header, isDarkTheme ? styles.darkText : styles.lightText]}>
        Sincronização de Livros
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color="#ff4081" />
      ) : (
        <Button 
          title="Sincronizar Todos os Livros" 
          onPress={syncBooks} 
          disabled={loading} 
          accessibilityLabel="Sincronizar todos os livros com o servidor" 
        />
      )}

      {syncingFavorites ? (
        <ActivityIndicator size="large" color="#ff4081" />
      ) : (
        <Button 
          title="Sincronizar Favoritos" 
          onPress={syncFavorites} 
          disabled={syncingFavorites} 
          accessibilityLabel="Sincronizar apenas os livros favoritos"
          color="#1E90FF" 
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
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
  lightText: {
    color: '#000',
  },
  darkText: {
    color: '#fff',
  },
});
