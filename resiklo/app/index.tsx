import { Stack, router } from 'expo-router';
import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setSession } from '@/services/auth';

export default function IndexScreen() {
  const [loading, setLoading] = useState(true);
  const [viewedOnboarding, setViewedOnboarding] = useState(false);

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const val = await AsyncStorage.getItem('@viewedOnboarding');
        setViewedOnboarding(val !== null && JSON.parse(val));
      } catch (e) {
        console.error('Error @checkOnboarding: ', e);
      } finally {
        setLoading(false);
      }
    };

    checkOnboarding();
  }, []);

  // Automatic sign-in if access token is available
  const checkUserSession = async () => {
    const accessToken = await SecureStore.getItemAsync('access_token');
    const refreshToken = await SecureStore.getItemAsync('refresh_token');

    if (accessToken) {
      await setSession(accessToken, refreshToken || '');
      router.replace('/(tabs)/home');
    } else {
      router.replace('/(auth)/login');
    }
  };

  useEffect(() => {
    if (!loading) {
      if (viewedOnboarding) {
        checkUserSession();
      } else {
        router.replace('/(onboarding)');
      }
    }
  }, [loading, viewedOnboarding]);

  if (loading) {
    return null;
  }

  return null;
}
