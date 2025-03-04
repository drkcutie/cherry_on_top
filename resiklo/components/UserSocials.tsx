import { View, Text, Image } from "react-native";
import React from "react";
import defaultImages from "@/constants/defaultImages";

interface UserProps {
  firstName: string;
  lastName: string;
  profilePicture: string;
  caption: string;
  dailyPoints: number;
  totalPoints: number;
  achievements: number;
}

export default function UserSocials({firstName,lastName,profilePicture,dailyPoints,totalPoints,achievements,caption,}: UserProps) {
  return (
    <View className="flex flex-col justify-center items-center gap-3 p-4 rounded-lg w-full">


      <View className="flex flex-row gap-3 justify-center">
        <Image
          source={profilePicture ? { uri: profilePicture } : defaultImages.derik}
          className="w-12 h-12 rounded-full"
        />
        <View className="flex flex-col flex-1">
          <Text className="text-lg font-semibold">{firstName} {lastName}</Text>
          <Text>1hr ago</Text>
        </View>
      </View>

      <Text className="text-2xl font-bold self-start pt-1">{caption}</Text>


      <View className="flex flex-row gap-3 justify-between w-full items-center">
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
