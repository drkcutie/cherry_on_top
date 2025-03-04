import { View, Text, Image } from 'react-native';
import React from 'react';
import defaultImages from '@/constants/defaultImages';

interface UserProps {
  firstName: string;
  lastName: string;
  profilePicture: string;
  caption: string;
  dailyPoints: number;
  totalPoints: number;
  achievements: number;
}

export default function UserSocials({
  firstName,
  lastName,
  profilePicture,
  dailyPoints,
  totalPoints,
  achievements,
  caption
}: UserProps) {
  return (
    <View className="flex w-full flex-col items-center justify-center gap-3 rounded-lg p-4">
      <View className="flex flex-row justify-center gap-3">
        <Image
          source={profilePicture ? { uri: profilePicture } : defaultImages.derik}
          className="h-12 w-12 rounded-full"
        />
        <View className="flex flex-1 flex-col">
          <Text className="text-lg font-semibold">
            {firstName} {lastName}
          </Text>
          <Text>1hr ago</Text>
        </View>
      </View>

      <Text className="self-start pt-1 text-2xl font-bold">{caption}</Text>

      <View className="flex w-full flex-row items-center justify-between gap-3">
        <View className="flex flex-col items-center">
          <Text className="text-sm">Daily Points</Text>
          <Text className="font-bold">{dailyPoints} pts</Text>
        </View>
        <View className="flex flex-col items-center">
          <Text className="text-sm">Total Points</Text>
          <Text className="font-bold">{totalPoints} pts</Text>
        </View>
        <View className="flex flex-col items-center">
          <Text className="text-sm">Achievements</Text>
          <Text className="font-bold">🏆 {achievements}</Text>
        </View>
      </View>
    </View>
  );
}
