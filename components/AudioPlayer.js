import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Slider, ActivityIndicator } from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Para salvar o progresso

const AudioPlayer = ({ audioFile, audioId }) => {
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [isFavorite, setIsFavorite] = useState(false); // Estado para favoritar áudio

  useEffect(() => {
    const loadAudio = async () => {
      const savedPosition = await loadSavedProgress(); // Carregar progresso salvo
      const { sound: playbackObject } = await Audio.Sound.createAsync(
        { uri: audioFile },
        { shouldPlay: true, rate: playbackSpeed, positionMillis: savedPosition }
      );
      setSound(playbackObject);
      setLoading(false);
      playbackObject.setOnPlaybackStatusUpdate(updatePlaybackStatus);
    };

    loadAudio();

    return () => {
      if (sound) {
        saveProgress(); // Salvar progresso ao sair
        sound.unloadAsync();
      }
    };
  }, [audioFile, playbackSpeed]);

  const updatePlaybackStatus = (status) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      setDuration(status.durationMillis);
      if (status.didJustFinish) {
        setIsPlaying(false);
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

  const handleSkipForward = async () => {
    const newPosition = position + 10000;
    await sound.setPositionAsync(newPosition);
  };

  const handleSkipBackward = async () => {
    const newPosition = position - 10000 > 0 ? position - 10000 : 0;
    await sound.setPositionAsync(newPosition);
  };

  const handleSpeedChange = () => {
    setPlaybackSpeed(playbackSpeed === 1.0 ? 1.5 : 1.0);
  };

  const handleFavorite = async () => {
    setIsFavorite(!isFavorite);
    try {
      const favorites = await AsyncStorage.getItem('favorites');
      const favoritesArray = favorites ? JSON.parse(favorites) : [];
      if (!isFavorite) {
        favoritesArray.push(audioId);
      } else {
        const newFavorites = favoritesArray.filter(id => id !== audioId);
        await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
      }
    } catch (error) {
      console.error('Erro ao salvar favorito:', error);
    }
  };

  const saveProgress = async () => {
    try {
      await AsyncStorage.setItem(`audio_progress_${audioId}`, JSON.stringify(position));
    } catch (error) {
      console.error('Erro ao salvar progresso:', error);
    }
  };

  const loadSavedProgress = async () => {
    try {
      const savedPosition = await AsyncStorage.getItem(`audio_progress_${audioId}`);
      return savedPosition ? JSON.parse(savedPosition) : 0;
    } catch (error) {
      console.error('Erro ao carregar progresso salvo:', error);
      return 0;
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#ff4081" />
      ) : (
        <>
          <Text style={styles.time}>
            {Math.floor(position / 1000)} s / {Math.floor(duration / 1000)} s
          </Text>
          <Slider
            value={position}
            minimumValue={0}
            maximumValue={duration}
            onValueChange={value => sound.setPositionAsync(value)}
            style={styles.slider}
          />

          <View style={styles.controls}>
            <TouchableOpacity onPress={handleSkipBackward} style={styles.controlButton}>
              <Ionicons name="play-back" size={32} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity onPress={handlePlayPause} style={styles.controlButton}>
              <Ionicons name={isPlaying ? "pause" : "play"} size={48} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSkipForward} style={styles.controlButton}>
              <Ionicons name="play-forward" size={32} color="#fff" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={handleSpeedChange} style={styles.speedButton}>
            <Text style={styles.speedText}>Velocidade: {playbackSpeed}x</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleFavorite} style={styles.favoriteButton}>
            <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={32} color={isFavorite ? '#ff4081' : '#fff'} />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    marginTop: 20,
  },
  time: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  slider: {
    width: '90%',
    marginTop: 10,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginTop: 20,
  },
  controlButton: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 50,
  },
  speedButton: {
    marginTop: 20,
    backgroundColor: '#555',
    padding: 10,
    borderRadius: 20,
  },
  speedText: {
    color: '#fff',
    fontSize: 16,
  },
  favoriteButton: {
    marginTop: 20,
    padding: 10,
  },
});

export default AudioPlayer;
