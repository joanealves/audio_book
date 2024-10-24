import React, { useState, useContext } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { ThemeContext } from '../ThemeContext'; // Importar o ThemeContext

const faqs = [
  { question: "Como importar um livro?", answer: "Você pode importar um livro usando a tela de Importação e selecionando um arquivo de áudio." },
  { question: "Como marcar um livro como favorito?", answer: "Na tela de detalhes do livro, clique no ícone de coração para adicionar o livro aos favoritos." },
  { question: "Como ouvir um audiobook?", answer: "Selecione um livro da biblioteca e clique no botão 'Ouvir' para iniciar a reprodução do audiobook." },
  // Adicione mais perguntas e respostas conforme necessário
];

export default function HelpScreen() {
  const { isDarkTheme } = useContext(ThemeContext); // Usar o contexto para tema
  const [expandedIndex, setExpandedIndex] = useState(null); // Estado para controlar perguntas expandidas
  const [searchQuery, setSearchQuery] = useState(''); // Estado para a busca

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index); // Alterna a pergunta expandida
  };

  return (
    <ScrollView style={[styles.container, isDarkTheme ? styles.darkContainer : styles.lightContainer]}>
      <Text style={[styles.header, isDarkTheme ? styles.darkText : styles.lightText]}>Perguntas Frequentes (FAQ)</Text>

      <TextInput
        style={[styles.searchBar, isDarkTheme ? styles.darkInput : styles.lightInput]}
        placeholder="Buscar pergunta..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholderTextColor={isDarkTheme ? '#aaa' : '#555'}
      />

      {filteredFaqs.length > 0 ? (
        filteredFaqs.map((faq, index) => (
          <View key={index} style={styles.faqContainer}>
            <TouchableOpacity onPress={() => toggleExpand(index)}>
              <Text style={[styles.question, isDarkTheme ? styles.darkText : styles.lightText]}>
                {faq.question}
              </Text>
            </TouchableOpacity>
            {expandedIndex === index && (
              <Text style={[styles.answer, isDarkTheme ? styles.darkText : styles.lightText]}>
                {faq.answer}
              </Text>
            )}
          </View>
        ))
      ) : (
        <Text style={[styles.noResultsText, isDarkTheme ? styles.darkText : styles.lightText]}>
          Nenhuma pergunta encontrada.
        </Text>
      )}

      <TouchableOpacity style={styles.contactButton} onPress={() => alert('Fale Conosco')}>
        <Text style={styles.contactButtonText}>Fale Conosco</Text>
      </TouchableOpacity>
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
    marginTop: 5,
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  darkInput: {
    backgroundColor: '#555',
    color: '#fff',
  },
  lightInput: {
    backgroundColor: '#fff',
    color: '#000',
  },
  contactButton: {
    marginTop: 20,
    paddingVertical: 15,
    backgroundColor: '#1E90FF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  noResultsText: {
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
});
