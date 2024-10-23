import React, { useState, useContext } from 'react';
import { View, Text, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../ThemeContext'; // Importar o ThemeContext

export default function SyncScreen() {
  const { isDarkTheme } = useContext(ThemeContext); // Usar o contexto para tema
  const [loading, setLoading] = useState(false); // Estado para controle de carregamento

  const syncBooks = async () => {
    setLoading(true); // Exibir indicador de carregamento
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
      setLoading(false); // Finalizar o carregamento
    }
  };

  return (
    <View style={[styles.container, isDarkTheme ? styles.darkContainer : styles.lightContainer]}>
      <Text style={[styles.header, isDarkTheme ? styles.darkText : styles.lightText]}>Sincronização de Livros</Text>
      
      {loading ? (
        <ActivityIndicator size="large" color="#ff4081" />
      ) : (
        <Button 
          title="Sincronizar Livros" 
          onPress={syncBooks} 
          disabled={loading} 
          accessibilityLabel="Sincronizar livros com o servidor" 
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
