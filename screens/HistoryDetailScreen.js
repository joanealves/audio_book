import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

const HistoryDetailScreen = ({ route, navigation }) => {
    const { item } = route.params; // Recebe o item do histórico

    const handleEditFeedback = () => {
        // Lógica para edição de feedback
        Alert.alert('Editar Feedback', 'Funcionalidade de edição de feedback.');
    };

    const handleDeleteHistory = () => {
        // Lógica para deletar o histórico
        Alert.alert('Excluir Histórico', 'O histórico foi excluído.');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title} onPress={() => navigation.navigate('BookDetail', { bookId: item.bookId })}>
                {item.bookName}
            </Text>
            <Text style={styles.date}>
                {new Date(item.date).toLocaleDateString('pt-BR', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })}
            </Text>
            <Text style={styles.feedback}>Feedback: {item.feedback}</Text>

            <View style={styles.buttonsContainer}>
                <Button title="Editar Feedback" onPress={handleEditFeedback} />
                <Button title="Excluir Histórico" onPress={handleDeleteHistory} color="red" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#121212',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ff4081',
        marginBottom: 10,
        textDecorationLine: 'underline', // Para indicar que o nome do livro é clicável
    },
    date: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 10,
    },
    feedback: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 20,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default HistoryDetailScreen;
