import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../ThemeContext'; // Importar o ThemeContext

export default function HistoryScreen({ navigation }) {
  const { isDarkTheme } = useContext(ThemeContext); // Usar o contexto para tema
  const [history, setHistory] = useState([]); // Estado para o histórico de audiolivros
  const [loading, setLoading] = useState(true); // Estado para controle de carregamento

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const storedHistory = await AsyncStorage.getItem('readingHistory');
        const historyData = storedHistory ? JSON.parse(storedHistory) : [];
        setHistory(historyData);
      } catch (error) {
        console.error('Erro ao carregar histórico:', error);
      } finally {
        setLoading(false); // Finalizar o carregamento
      }
    };

    loadHistory();
  }, []);

  const handleDelete = async (bookId) => {
    Alert.alert('Confirmar Exclusão', 'Você deseja excluir este item do histórico?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Excluir',
        onPress: async () => {
          const updatedHistory = history.filter(item => item.id !== bookId);
          setHistory(updatedHistory);
          await AsyncStorage.setItem('readingHistory', JSON.stringify(updatedHistory));
        },
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={[styles.item, isDarkTheme ? styles.darkItem : styles.lightItem]}>
      <TouchableOpacity onPress={() => navigation.navigate('HistoryDetail', { item })}>
        <Text style={[styles.title, isDarkTheme ? styles.darkText : styles.lightText]}>{item.bookName}</Text>
      </TouchableOpacity>
      <Text style={[styles.date, isDarkTheme ? styles.darkText : styles.lightText]}>
        Ouvido em: {new Date(item.date).toLocaleDateString()}
      </Text>
      <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
        <Ionicons name="trash-bin-outline" size={24} color={isDarkTheme ? '#ff4081' : '#ff4081'} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, isDarkTheme ? styles.darkContainer : styles.lightContainer]}>
      <Text style={[styles.header, isDarkTheme ? styles.darkText : styles.lightText]}>Histórico de Audiolivros</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#ff4081" />
      ) : history.length > 0 ? (
        <FlatList
          data={history}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text style={[styles.emptyText, isDarkTheme ? styles.darkText : styles.lightText]}>
          Nenhum histórico de audiolivros encontrado.
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
  darkContainer: {
    backgroundColor: '#333',
  },
  lightContainer: {
    backgroundColor: '#f5f5f5',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  date: {
    fontSize: 14,
    color: '#555',
    marginRight: 10,
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
  deleteButton: {
    padding: 5,
  },
});
