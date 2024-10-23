import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../ThemeContext'; // Importar o ThemeContext

export default function ReminderScreen() {
  const { isDarkTheme } = useContext(ThemeContext); // Usar o contexto para tema
  const [reminder, setReminder] = useState(''); // Estado para o lembrete
  const [reminders, setReminders] = useState([]); // Lista de lembretes
  const [loading, setLoading] = useState(true); // Estado para controle de carregamento

  useEffect(() => {
    const loadReminders = async () => {
      try {
        const storedReminders = await AsyncStorage.getItem('reminders');
        const remindersList = storedReminders ? JSON.parse(storedReminders) : [];
        setReminders(remindersList);
      } catch (error) {
        console.error('Erro ao carregar lembretes:', error);
      } finally {
        setLoading(false); // Finalizar o carregamento
      }
    };

    loadReminders();
  }, []);

  const handleAddReminder = async () => {
    if (!reminder.trim()) { // Verifica se o lembrete não é vazio
      Alert.alert('Erro', 'Por favor, insira um lembrete.');
      return;
    }

    const newReminders = [...reminders, reminder];
    try {
      await AsyncStorage.setItem('reminders', JSON.stringify(newReminders));
      setReminders(newReminders);
      setReminder(''); // Limpar o campo
      Alert.alert('Sucesso', 'Lembrete adicionado com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Erro ao adicionar lembrete.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={[styles.item, isDarkTheme ? styles.darkItem : styles.lightItem]}>
      <Text style={[styles.reminderText, isDarkTheme ? styles.darkText : styles.lightText]}>{item}</Text>
    </View>
  );

  return (
    <View style={[styles.container, isDarkTheme ? styles.darkContainer : styles.lightContainer]}>
      <Text style={[styles.header, isDarkTheme ? styles.darkText : styles.lightText]}>Lembretes</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu lembrete aqui..."
        value={reminder}
        onChangeText={setReminder}
        accessibilityLabel="Campo para inserir lembrete"
      />
      <Button title="Adicionar Lembrete" onPress={handleAddReminder} accessibilityLabel="Adicionar lembrete" />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={reminders}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={<Text style={[styles.emptyText, isDarkTheme ? styles.darkText : styles.lightText]}>Nenhum lembrete agendado.</Text>}
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
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  reminderText: {
    fontSize: 16,
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
