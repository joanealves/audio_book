import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../ThemeContext'; // Importar o ThemeContext

export default function FeedbackHistoryScreen() {
    const { isDarkTheme } = useContext(ThemeContext); // Usar o contexto
    const [feedbackList, setFeedbackList] = useState([]);
    const [loading, setLoading] = useState(true); // Estado para controle de carregamento

    useEffect(() => {
        const loadFeedback = async () => {
            try {
                const storedFeedback = await AsyncStorage.getItem('feedback');
                const feedback = storedFeedback ? JSON.parse(storedFeedback) : [];
                setFeedbackList(feedback);
            } catch (error) {
                console.error('Erro ao carregar feedback:', error);
            } finally {
                setLoading(false); // Finalizar o carregamento
            }
        };

        loadFeedback();
    }, []);

    const renderItem = ({ item }) => (
        <View style={[styles.item, isDarkTheme ? styles.darkItem : styles.lightItem]}>
            <Text style={[styles.feedbackText, isDarkTheme ? styles.darkText : styles.lightText]}>{item}</Text>
        </View>
    );

    return (
        <View style={[styles.container, isDarkTheme ? styles.darkContainer : styles.lightContainer]}>
            <Text style={[styles.header, isDarkTheme ? styles.darkText : styles.lightText]}>Histórico de Feedback</Text>
            {loading ? ( // Exibir indicador de carregamento
                <ActivityIndicator size="large" color="#ff4081" />
            ) : (
                <FlatList
                    data={feedbackList}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={feedbackList.length === 0 ? styles.emptyList : null}
                    ListEmptyComponent={<Text style={[styles.emptyText, isDarkTheme ? styles.darkText : styles.lightText]}>Nenhum feedback enviado ainda.</Text>}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
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
    item: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: '#1e1e1e',
    },
    feedbackText: {
        fontSize: 16,
        color: '#fff',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#fff',
    },
    darkItem: {
        backgroundColor: '#444',
    },
    lightItem: {
        backgroundColor: '#fff',
    },
});
