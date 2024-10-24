import React, { useEffect, useState } from 'react';
import { View, Button, Text, Alert, FlatList, TouchableOpacity, TextInput, ActivityIndicator, StyleSheet } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GoogleDrive } from 'react-native-google-drive-api-wrapper';

const DriveIntegration = () => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: 'YOUR_WEB_CLIENT_ID', // Certifique-se de configurar corretamente
        });
    }, []);

    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            Alert.alert('Sucesso', 'Usuário autenticado com sucesso!');
            listFiles(); // Chamar listFiles após autenticação
        } catch (error) {
            Alert.alert('Erro', 'Falha ao autenticar. Tente novamente.');
        }
    };

    const listFiles = async () => {
        setLoading(true);
        try {
            const response = await GoogleDrive.files.list({
                q: "mimeType='application/pdf' or mimeType='application/epub+zip'",
                fields: 'files(id, name)',
            });
            setFiles(response.files);
        } catch (error) {
            Alert.alert('Erro', 'Erro ao listar arquivos do Google Drive.');
        } finally {
            setLoading(false);
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.fileItem} onPress={() => Alert.alert('Selecionado', item.name)}>
            <Text style={styles.fileText}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Button title="Login com Google" onPress={signIn} color="#1E90FF" />

            <TextInput
                style={styles.searchBar}
                placeholder="Buscar arquivos no Google Drive"
                value={searchQuery}
                onChangeText={setSearchQuery}
            />

            {loading ? (
                <ActivityIndicator size="large" color="#1E90FF" style={styles.loader} />
            ) : (
                <FlatList
                    data={files.filter(file => file.name.toLowerCase().includes(searchQuery.toLowerCase()))}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    ListEmptyComponent={<Text style={styles.emptyText}>Nenhum arquivo encontrado.</Text>}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    searchBar: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginVertical: 20,
    },
    fileItem: {
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 10,
        elevation: 2, // Para uma leve sombra
    },
    fileText: {
        fontSize: 16,
        color: '#333',
    },
    loader: {
        marginVertical: 20,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#666',
    },
});

export default DriveIntegration;
