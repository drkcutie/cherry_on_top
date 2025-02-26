import { Stack, router } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  useEffect(() => {
    if (!loading) {
      if (viewedOnboarding) {
        router.replace('/(auth)/login');
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
