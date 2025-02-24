import { Text, View } from 'react-native';
import { useEffect, useState } from 'react';

const onboardingOptions = [{}];

export default function OnboardingScreen() {
  return (
    <View className="h-screen-safe w-screen items-center justify-center">
      <Text className="text-darthmouth text-4xl">Resiklo</Text>
    </View>
  );
}
