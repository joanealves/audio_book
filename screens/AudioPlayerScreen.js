import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Slider, Button, ActivityIndicator } from 'react-native';
import { Audio } from 'expo-av'; // Biblioteca para áudio
import { ThemeContext } from '../ThemeContext'; // Importar o ThemeContext

export default function AudioPlayerScreen({ route }) {
  const { audioFile } = route.params; // Recebe o arquivo de áudio
  const { isDarkTheme } = useContext(ThemeContext); // Usar o contexto para tema
  const [sound, setSound] = useState(null); // Estado para o áudio
  const [isPlaying, setIsPlaying] = useState(false); // Estado para reproduzir/pausar
  const [position, setPosition] = useState(0); // Posição atual do áudio
  const [duration, setDuration] = useState(0); // Duração total do áudio
  const [loading, setLoading] = useState(true); // Estado para controle de carregamento

  useEffect(() => {
    const loadAudio = async () => {
      const { sound: playbackObject } = await Audio.Sound.createAsync(
        { uri: audioFile },
        { shouldPlay: true }
      );
      setSound(playbackObject);
      setLoading(false);
      playbackObject.setOnPlaybackStatusUpdate(updatePlaybackStatus);
    };

    loadAudio();

    return () => {
      if (sound) {
        sound.unloadAsync(); // Descarregar o áudio ao sair
      }
    };
  }, [audioFile]);

  const updatePlaybackStatus = (status) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      setDuration(status.durationMillis);
      if (status.didJustFinish) {
        setIsPlaying(false); // Parar ao fim do áudio
      }
    }
  };

  const handlePlayPause = async () => {
    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = async (value) => {
    await sound.setPositionAsync(value);
  };

  return (
    <View style={[styles.container, isDarkTheme ? styles.darkContainer : styles.lightContainer]}>
      {loading ? (
        <ActivityIndicator size="large" color="#ff4081" />
      ) : (
        <>
          <Text style={[styles.title, isDarkTheme ? styles.darkText : styles.lightText]}>Reproduzindo: {audioFile}</Text>
          <Slider
            style={styles.slider}
            value={position}
            minimumValue={0}
            maximumValue={duration}
            onValueChange={handleSeek}
            minimumTrackTintColor="#ff4081"
            maximumTrackTintColor={isDarkTheme ? "#555" : "#ccc"}
          />
          <Text style={[styles.time, isDarkTheme ? styles.darkText : styles.lightText]}>
            {Math.floor(position / 1000)}s / {Math.floor(duration / 1000)}s
          </Text>
          <Button
            title={isPlaying ? "Pausar" : "Tocar"}
            onPress={handlePlayPause}
            accessibilityLabel={isPlaying ? "Pausar reprodução" : "Iniciar reprodução"}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  lightContainer: {
    backgroundColor: '#f5f5f5',
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  slider: {
    width: '100%',
    height: 40,
    marginBottom: 10,
  },
  time: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  lightText: {
    color: '#000',
  },
  darkText: {
    color: '#fff',
  },
});
