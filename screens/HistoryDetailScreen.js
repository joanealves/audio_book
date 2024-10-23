import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HistoryDetailScreen = ({ route }) => {
    const { item } = route.params; // Recebe o item do histórico

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{item.bookName}</Text>
            <Text style={styles.date}>{new Date(item.date).toLocaleDateString()}</Text>
            <Text style={styles.feedback}>Feedback: {item.feedback}</Text>
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
    },
    date: {
        fontSize: 16,
        color: '#fff',
    },
    feedback: {
        fontSize: 16,
        color: '#fff',
    },
});

export default HistoryDetailScreen;