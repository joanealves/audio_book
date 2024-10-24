import React, { useState, useContext } from 'react';
import { View, Text, Switch, StyleSheet, Button, TouchableOpacity, Alert, Picker } from 'react-native';
import * as Notifications from 'expo-notifications';
import { ThemeContext } from '../ThemeContext'; // Importando o ThemeContext

export default function NotificationSettingsScreen() {
  const { isDarkTheme } = useContext(ThemeContext); // Usar o contexto para tema
  const [notificationsEnabled, setNotificationsEnabled] = useState(false); // Estado para notificações
  const [notificationFrequency, setNotificationFrequency] = useState('daily'); // Estado para frequência de notificação
  const [silentMode, setSilentMode] = useState(false); // Estado para notificações silenciosas

  const toggleNotifications = async () => {
    if (notificationsEnabled) {
      await Notifications.cancelAllScheduledNotificationsAsync();
      setNotificationsEnabled(false);
      Alert.alert('Notificações', 'Notificações desativadas.');
    } else {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status === 'granted') {
        setNotificationsEnabled(true);
        Alert.alert('Notificações', 'Notificações ativadas.');
      } else {
        Alert.alert('Erro', 'Permissão para notificações não concedida.');
      }
    }
  };

  const scheduleNotification = async () => {
    let interval;
    switch (notificationFrequency) {
      case 'daily':
        interval = 24 * 60 * 60; // 24 horas
        break;
      case 'weekly':
        interval = 7 * 24 * 60 * 60; // 7 dias
        break;
      case 'monthly':
        interval = 30 * 24 * 60 * 60; // 30 dias
        break;
      default:
        interval = 60; // Teste com 60 segundos
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Lembrete de Audiolivro",
        body: "Não se esqueça de ouvir seu audiolivro!",
        sound: silentMode ? null : 'default', // Definir notificação silenciosa
      },
      trigger: { seconds: interval, repeats: true }, // Notificação recorrente
    });
    Alert.alert('Notificação Agendada', `Notificações agendadas para repetirem a cada ${notificationFrequency}.`);
  };

  return (
    <View style={[styles.container, isDarkTheme ? styles.darkContainer : styles.lightContainer]}>
      <Text style={[styles.header, isDarkTheme ? styles.darkText : styles.lightText]}>Configurações de Notificações</Text>

      {/* Ativar/Desativar Notificações */}
      <View style={styles.option}>
        <Text style={[styles.optionText, isDarkTheme ? styles.darkText : styles.lightText]}>Ativar Notificações</Text>
        <Switch value={notificationsEnabled} onValueChange={toggleNotifications} />
      </View>

      {/* Configurar Frequência de Notificações */}
      {notificationsEnabled && (
        <>
          <View style={styles.option}>
            <Text style={[styles.optionText, isDarkTheme ? styles.darkText : styles.lightText]}>Frequência de Notificações</Text>
            <Picker
              selectedValue={notificationFrequency}
              style={styles.picker}
              onValueChange={(itemValue) => setNotificationFrequency(itemValue)}
            >
              <Picker.Item label="Diário" value="daily" />
              <Picker.Item label="Semanal" value="weekly" />
              <Picker.Item label="Mensal" value="monthly" />
            </Picker>
          </View>

          {/* Modo Silencioso */}
          <View style={styles.option}>
            <Text style={[styles.optionText, isDarkTheme ? styles.darkText : styles.lightText]}>Modo Silencioso</Text>
            <Switch value={silentMode} onValueChange={setSilentMode} />
          </View>

          {/* Botão para Agendar Notificação */}
          <Button 
            title="Agendar Notificação" 
            onPress={scheduleNotification} 
            accessibilityLabel="Agendar uma notificação" 
          />
        </>
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
    backgroundColor: '#1e1e1e',
  },
  lightContainer: {
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  optionText: {
    fontSize: 18,
  },
  picker: {
    height: 50,
    width: 150,
  },
  darkText: {
    color: '#fff',
  },
  lightText: {
    color: '#000',
  },
});
