import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';

const FeedbackScreen = () => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleSubmit = () => {
        // Lógica para enviar feedback
        Alert.alert('Sucesso', 'Feedback enviado com sucesso!');
    };

    return (
        <View>
            <TextInput
                placeholder="Avaliação (0-5)"
                keyboardType="numeric"
                value={rating.toString()}
                onChangeText={text => setRating(Number(text))}
            />
            <TextInput
                placeholder="Comentário"
                value={comment}
                onChangeText={setComment}
            />
            <Button title="Enviar Feedback" onPress={handleSubmit} />
        </View>
    );
};

export default FeedbackScreen;