import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Button, Switch, Alert, ActivityIndicator } from 'react-native';
import * as Notifications from 'expo-notifications'; // Biblioteca para notificações
import { ThemeContext } from '../ThemeContext'; // Importar o ThemeContext

export default function NotificationSettingsScreen() {
  const { isDarkTheme } = useContext(ThemeContext); // Usar o contexto para tema
  const [notificationsEnabled, setNotificationsEnabled] = useState(false); // Estado para notificações
  const [loading, setLoading] = useState(true); // Estado para controle de carregamento

  useEffect(() => {
    const checkNotificationPermissions = async () => {
      try {
        const { status } = await Notifications.getPermissionsAsync();
        setNotificationsEnabled(status === 'granted'); // Verificar se as permissões estão ativas
      } catch (error) {
        console.error('Erro ao verificar permissões de notificação:', error);
      } finally {
        setLoading(false); // Finalizar o carregamento
      }
    };

    checkNotificationPermissions();
  }, []);

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
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Lembrete de Audiolivro",
        body: "Não se esqueça de ouvir seu audiolivro!",
      },
      trigger: { seconds: 60 }, // Notificação em 60 segundos para teste
    });
    Alert.alert('Notificação Agendada', 'Você receberá um lembrete em 60 segundos.');
  };

  return (
    <View style={[styles.container, isDarkTheme ? styles.darkContainer : styles.lightContainer]}>
      <Text style={[styles.header, isDarkTheme ? styles.darkText : styles.lightText]}>Configurações de Notificações</Text>
      
      {loading ? (
        <ActivityIndicator size="large" color="#ff4081" />
      ) : (
        <View style={styles.option}>
          <Text style={[styles.optionText, isDarkTheme ? styles.darkText : styles.lightText]}>
            Ativar Notificações
          </Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={toggleNotifications}
            accessibilityLabel="Ativar ou desativar notificações"
          />
        </View>
      )}

      {notificationsEnabled && (
        <Button 
          title="Agendar Notificação" 
          onPress={scheduleNotification} 
          accessibilityLabel="Agendar uma notificação"
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
    backgroundColor: '#121212',
  },
  darkContainer: {
    backgroundColor: '#1e1e1e',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#ff4081',
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  optionText: {
    fontSize: 18,
    color: '#fff',
  },
  lightText: {
    color: '#000',
  },
  darkText: {
    color: '#fff',
  },
});
