import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import LoadingSpinner from './components/LoadingSpinner';

export default function SomeScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulando uma chamada assíncrona (ex: API) que leva 3 segundos para carregar
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  if (isLoading) {
    return <LoadingSpinner color="#1E90FF" message="Aguarde, estamos carregando os dados..." />;
  }

  return (
    <View>
      <Text>Dados carregados com sucesso!</Text>
    </View>
  );
}
