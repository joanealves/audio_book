import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';

export default function LoadingSpinner({ color = "#0000ff", message = "Carregando..." }) {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={color} accessibilityLabel="Carregando" />
            <Text style={styles.text}>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    text: {
        marginTop: 20,
        fontSize: 18,
    },
});
