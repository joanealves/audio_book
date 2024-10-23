import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../ThemeContext'; // Importar o ThemeContext

export default function ImportScreen() {
    const { isDarkTheme } = useContext(ThemeContext); // Usar o contexto
    const [url, setUrl] = useState('');
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false); // Estado para controle de carregamento

    const handleImport = async () => {
        if (!url || !title || !author) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        // Validação da URL (opcional)
        if (!isValidURL(url)) {
            Alert.alert('Erro', 'Por favor, insira uma URL válida.');
            return;
        }

        const newBook = {
            id: Date.now().toString(),
            title,
            author,
            description,
            url,
            favorite: false,
            rating: 0,
        };

        setLoading(true); // Iniciar o carregamento
        try {
            const storedBooks = await AsyncStorage.getItem('books');
            const books = storedBooks ? JSON.parse(storedBooks) : [];
            books.push(newBook);
            await AsyncStorage.setItem('books', JSON.stringify(books));
            Alert.alert('Sucesso', 'Livro importado com sucesso!');
            setUrl('');
            setTitle('');
            setAuthor('');
            setDescription('');
        } catch (error) {
            Alert.alert('Erro', 'Erro ao importar o livro.');
        } finally {
            setLoading(false); // Finalizar o carregamento
        }
    };

    const isValidURL = (string) => {
        const res = string.match(/(http|https):\/\/[^\s/$.?#].[^\s]*/);
        return res !== null;
    };

    return (
        <View style={[styles.container, isDarkTheme ? styles.darkContainer : styles.lightContainer]}>
            <Text style={[styles.header, isDarkTheme ? styles.darkText : styles.lightText]}>Importar Livro</Text>
            <TextInput
                style={styles.input}
                placeholder="Título"
                value={title}
                onChangeText={setTitle}
                accessibilityLabel="Título do livro"
            />
            <TextInput
                style={styles.input}
                placeholder="Autor"
                value={author}
                onChangeText={setAuthor}
                accessibilityLabel="Autor do livro"
            />
            <TextInput
                style={styles.input}
                placeholder="Descrição"
                value={description}
                onChangeText={setDescription}
                accessibilityLabel="Descrição do livro"
            />
            <TextInput
                style={styles.input}
                placeholder="URL do Audiolivro"
                value={url}
                onChangeText={setUrl}
                accessibilityLabel="URL do audiolivro"
            />
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <Button title="Importar Livro" onPress={handleImport} accessibilityLabel="Importar livro" />
            )}
        </View>
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
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    lightText: {
        color: '#000',
    },
    darkText: {
        color: '#fff',
    },
});