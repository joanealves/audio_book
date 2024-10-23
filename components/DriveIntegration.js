import React, { useEffect, useState } from 'react';
import { View, Button, Text, Alert, FlatList, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GoogleDrive } from 'react-native-google-drive-api-wrapper';

const DriveIntegration = () => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: 'YOUR_WEB_CLIENT_ID',
        });
    }, []);

    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            Alert.alert('Sucesso', 'Usuário autenticado com sucesso!');
            listFiles();
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
        <TouchableOpacity onPress={() => Alert.alert('Selecionado', item.name)}>
            <Text>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View>
            <Button title="Login com Google" onPress={signIn} />
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={files.filter(file => file.name.toLowerCase().includes(searchQuery.toLowerCase()))}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            )}
        </View>
    );
};

export default DriveIntegration;