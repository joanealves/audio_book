import React, { useContext } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { ThemeContext } from '../ThemeContext'; // Importar o ThemeContext

const faqs = [
  { question: "Como importar um livro?", answer: "Você pode importar um livro usando a tela de Importação e selecionando um arquivo de áudio." },
  { question: "Como marcar um livro como favorito?", answer: "Na tela de detalhes do livro, clique no ícone de coração para adicionar o livro aos favoritos." },
  { question: "Como ouvir um audiobook?", answer: "Selecione um livro da biblioteca e clique no botão 'Ouvir' para iniciar a reprodução do audiobook." },
  // Adicione mais perguntas e respostas conforme necessário
];

export default function HelpScreen() {
  const { isDarkTheme } = useContext(ThemeContext); // Usar o contexto para tema

  return (
    <ScrollView style={[styles.container, isDarkTheme ? styles.darkContainer : styles.lightContainer]}>
      <Text style={[styles.header, isDarkTheme ? styles.darkText : styles.lightText]}>Perguntas Frequentes (FAQ)</Text>
      {faqs.map((faq, index) => (
        <View key={index} style={styles.faqContainer}>
          <Text style={[styles.question, isDarkTheme ? styles.darkText : styles.lightText]}>{faq.question}</Text>
          <Text style={[styles.answer, isDarkTheme ? styles.darkText : styles.lightText]}>{faq.answer}</Text>
        </View>
      ))}
    </ScrollView>
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
  faqContainer: {
    marginBottom: 15,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  answer: {
    fontSize: 16,
    marginBottom: 10,
  },
  lightText: {
    color: '#000',
  },
  darkText: {
    color: '#fff',
  },
});
