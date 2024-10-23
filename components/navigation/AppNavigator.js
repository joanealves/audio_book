import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../screens/HomeScreen';
import LibraryScreen from '../../screens/LibraryScreen';
import ImportScreen from '../../screens/ImportScreen';
import AudioPlayerScreen from '../../screens/AudioPlayerScreen';
import BookDetailScreen from '../../screens/BookDetailScreen';
import FavoritesScreen from '../../screens/FavoritesScreen';
import AddBookScreen from '../../screens/AddBookScreen';
import SettingsScreen from '../../screens/SettingsScreen';
import HelpScreen from '../../screens/HelpScreen';
import HistoryScreen from '../../screens/HistoryScreen';
import NotificationSettingsScreen from '../../screens/NotificationSettingsScreen';
import FeedbackScreen from '../../screens/FeedbackScreen';
import ReminderScreen from '../../screens/ReminderScreen';
import SyncScreen from '../../screens/SyncScreen';
import SearchScreen from '../../screens/SearchScreen';
import AdvancedSearchScreen from '../../screens/AdvancedSearchScreen';
import FeedbackHistoryScreen from '../../screens/FeedbackHistoryScreen';
import NotificationHistoryScreen from '../../screens/NotificationHistoryScreen';
import HistoryDetailScreen from '../../screens/HistoryDetailScreen';
import TranslateScreen from '../../screens/TranslateScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Library" component={LibraryScreen} />
            <Stack.Screen name="Import" component={ImportScreen} />
            <Stack.Screen name="AudioPlayer" component={AudioPlayerScreen} />
            <Stack.Screen name="BookDetail" component={BookDetailScreen} />
            <Stack.Screen name="Favorites" component={FavoritesScreen} />
            <Stack.Screen name="AddBook" component={AddBookScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Help" component={HelpScreen} />
            <Stack.Screen name="History" component={HistoryScreen} />
            <Stack.Screen name="NotificationSettings" component={NotificationSettingsScreen} />
            <Stack.Screen name="Feedback" component={FeedbackScreen} />
            <Stack.Screen name="Reminder" component={ReminderScreen} />
            <Stack.Screen name="Sync" component={SyncScreen} />
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="AdvancedSearch" component={AdvancedSearchScreen} />
            <Stack.Screen name="FeedbackHistory" component={FeedbackHistoryScreen} />
            <Stack.Screen name="NotificationHistory" component={NotificationHistoryScreen} />
            <Stack.Screen name="HistoryDetail" component={HistoryDetailScreen} />
            <Stack.Screen name="Translate" component={TranslateScreen} />
        </Stack.Navigator>
    );
}