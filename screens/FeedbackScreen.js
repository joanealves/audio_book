import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, ActivityIndicator, Text, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FeedbackScreen = () => {
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false); // Estado para controlar carregamento
    const [isAnonymous, setIsAnonymous] = useState(false); // Estado para feedback anônimo

    const handleSubmit = async () => {
        // Validação da avaliação
        if (isNaN(rating) || rating < 0 || rating > 5) {
            Alert.alert('Erro', 'Por favor, insira uma avaliação válida entre 0 e 5.');
            return;
        }

        if (!comment) {
            Alert.alert('Erro', 'Por favor, insira um comentário.');
            return;
        }

        setLoading(true);

        const feedback = {
            rating,
            comment,
            anonymous: isAnonymous,
            date: new Date().toLocaleString(),
        };

        try {
            const storedFeedback = await AsyncStorage.getItem('feedback');
            const feedbackList = storedFeedback ? JSON.parse(storedFeedback) : [];
            feedbackList.push(feedback);
            await AsyncStorage.setItem('feedback', JSON.stringify(feedbackList));

            Alert.alert('Sucesso', 'Feedback enviado com sucesso!');
            setRating('');
            setComment('');
        } catch (error) {
            Alert.alert('Erro', 'Ocorreu um erro ao enviar o feedback.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Enviar Feedback</Text>

            <TextInput
                style={styles.input}
                placeholder="Avaliação (0-5)"
                keyboardType="numeric"
                value={rating}
                onChangeText={text => setRating(text)}
                placeholderTextColor="#888"
            />
            <TextInput
                style={styles.input}
                placeholder="Comentário"
                value={comment}
                onChangeText={setComment}
                multiline
                placeholderTextColor="#888"
            />

            <View style={styles.anonymousOption}>
                <Text style={styles.label}>Enviar anonimamente</Text>
                <Switch value={isAnonymous} onValueChange={setIsAnonymous} />
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#1E90FF" />
            ) : (
                <Button title="Enviar Feedback" onPress={handleSubmit} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#fff',
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
        color: '#000',
    },
    anonymousOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        color: '#333',
    },
});

export default FeedbackScreen;
