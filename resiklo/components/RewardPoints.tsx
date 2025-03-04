import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import iconImages from '@/constants/icons';
import { History } from 'lucide-react-native';

export default function Reward() {
  const points = 1000;

  return (
    <LinearGradient colors={['#48E27B', '#287C43']} style={styles.gradientBackground}>
      <Text className="font-montserrat-bold text-2xl text-black">Rewards</Text>
      <View className="flex flex-row justify-between rounded-2xl bg-white p-5">
        <View className="flex flex-row gap-3">
          <Image source={iconImages.star} className="self-center"></Image>
          <View className="flex flex-col">
            <Text className="text-xl font-bold">{points}</Text>
            <Text className="font-montserrat-regular">Total points</Text>
          </View>
        </View>
        <Pressable className="flex flex-row items-center justify-center gap-2 rounded-2xl bg-jet p-4 pb-1 pt-1 active:opacity-80">
          <History color={'#FFFFFF'} width={15} height={15} />
          <Text className="font-montserrat-medium text-white">History</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    width: '100%',
    padding: 30,
    borderRadius: 20,
    height: 160,
    justifyContent: 'center',
    gap: 10
  }
});
