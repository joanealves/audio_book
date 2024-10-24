import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import en from './locales/en.json';
import pt from './locales/pt.json';

// Inicializar i18next com as traduções
i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: Localization.locale || 'en', // Pega o idioma do dispositivo, ou usa inglês como fallback
  fallbackLng: 'en', // Idioma fallback se a tradução não estiver disponível
  resources: {
    en: { translation: en },
    pt: { translation: pt },
  },
  interpolation: {
    escapeValue: false, // React já faz a sanitização por padrão
  },
});

export default i18n;
