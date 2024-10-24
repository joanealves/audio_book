// SettingsScreen.js
import React, { useContext, useState } from 'react';
import { View, Text, Switch, StyleSheet, Picker, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../ThemeContext';
import i18n from '../i18n'; // Importar i18n

const SettingsScreen = () => {
  const { isDarkTheme, toggleTheme, fontSize, changeFontSize, language, changeLanguage } = useContext(ThemeContext);
  const [selectedFontSize, setSelectedFontSize] = useState(fontSize);
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    changeLanguage(lang);
    i18n.locale = lang; // Atualiza o idioma da aplicação
  };

  return (
    <View style={[styles.container, isDarkTheme ? styles.darkContainer : styles.lightContainer]}>
      <Text style={[styles.header, isDarkTheme ? styles.darkText : styles.lightText]}>{i18n.t('settings')}</Text>

      {/* Alternar Tema */}
      <View style={styles.option}>
        <Text style={[styles.optionText, isDarkTheme ? styles.darkText : styles.lightText]}>{i18n.t('dark_mode')}</Text>
        <Switch value={isDarkTheme} onValueChange={toggleTheme} />
      </View>

      {/* Alterar Tamanho da Fonte */}
      <View style={styles.option}>
        <Text style={[styles.optionText, isDarkTheme ? styles.darkText : styles.lightText]}>{i18n.t('font_size')}</Text>
        <Picker
          selectedValue={selectedFontSize}
          style={styles.picker}
          onValueChange={(itemValue) => {
            setSelectedFontSize(itemValue);
            changeFontSize(itemValue);
          }}
        >
          <Picker.Item label={i18n.t('small')} value="small" />
          <Picker.Item label={i18n.t('medium')} value="medium" />
          <Picker.Item label={i18n.t('large')} value="large" />
        </Picker>
      </View>

      {/* Alterar Idioma */}
      <View style={styles.option}>
        <Text style={[styles.optionText, isDarkTheme ? styles.darkText : styles.lightText]}>{i18n.t('language')}</Text>
        <Picker
          selectedValue={selectedLanguage}
          style={styles.picker}
          onValueChange={(itemValue) => handleLanguageChange(itemValue)}
        >
          <Picker.Item label="Português" value="pt" />
          <Picker.Item label="English" value="en" />
        </Picker>
      </View>

      {/* Notificações */}
      <View style={styles.option}>
        <Text style={[styles.optionText, isDarkTheme ? styles.darkText : styles.lightText]}>{i18n.t('notifications')}</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={() => setNotificationsEnabled(!notificationsEnabled)}
        />
      </View>

      {/* Redefinir Senha */}
      <TouchableOpacity style={styles.resetPasswordButton} onPress={() => alert(i18n.t('reset_password'))}>
        <Text style={[styles.resetPasswordText, isDarkTheme ? styles.darkText : styles.lightText]}>
          {i18n.t('reset_password')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

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
  resetPasswordButton: {
    backgroundColor: '#ff4081',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetPasswordText: {
    fontSize: 18,
    color: '#fff',
  },
  darkText: {
    color: '#fff',
  },
  lightText: {
    color: '#000',
  },
});

export default SettingsScreen;
