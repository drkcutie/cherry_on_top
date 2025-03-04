import React from 'react';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

interface TaskCardProps {
  type: string;
  description: string;
  taskType: string;
  pointsToBeCompleted: number;
}
//TODO connect to supabase and real time
export default function TaskCard() {
  return (
    <>
      <View className="flex w-full flex-row items-center justify-between gap-2 rounded-3xl bg-off-white p-3 shadow-sm drop-shadow-md">
        <View className="flex flex-row items-center justify-center gap-4">
          <View className="flex h-16 w-16 items-center justify-center rounded-2xl bg-malachite">
            <Image source={require('@/assets/images/trash_type/plastic/1.png')}></Image>
          </View>
          <View className="flex flex-col">
            <Text className="text-md font-roboto-bold">Scan 50 Plastic Caps</Text>
            <Text className="font-roboto-bold text-sm text-gray-400">26/50 Completed</Text>
          </View>
        </View>
        <LinearGradient
          colors={['#1E6A44', '#2A9761']}
          className="rounded-full"
          style={styles.buttonContainer}
          start={{ x: 0, y: 0.5 }} // Start from the left
          end={{ x: 1, y: 0.5 }}
        >
          <Pressable
            onPress={() => router.replace('/stack/waste-stack')}
            className="flex h-10 w-24 items-center justify-center rounded-2xl bg-transparent active:scale-105"
          >
            <Text className="font-roboto-bold text-white">Scan now</Text>
          </Pressable>
        </LinearGradient>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 16, // Ensures Pressable has rounded corners
    overflow: 'hidden', // Ensures the gradient doesn't overflow
    transform: [{ scale: 1 }] // For potential scaling effects
  },
  buttonBackground: {
    flex: 1, // Makes the gradient fill the entire Pressable
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16 // Ensures LinearGradient has rounded corners
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  }
});
