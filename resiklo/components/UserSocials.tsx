import { Dimensions, FlatList, Image, Text, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import defaultImages from '@/constants/defaultImages';

interface User {
  firstName: string;
  lastName: string;
  profilePicture: string;
  dailyPoints: number;
  totalPoints: number;
  achievements: number;
  likes: number;
  comments: number;
}

const carouselData = [
  { id: 1, color: '#B0604D' },
  { id: 2, color: '#899F9C' },
  { id: 3, color: '#B3C680' },
  { id: 4, color: '#5C6265' },
  { id: 5, color: '#F5D399' }
];

const { width: windowWidth } = Dimensions.get('window');
const itemWidth = windowWidth * 0.6;
const itemHeight = itemWidth * 4 / 3;

export default function UserSocials({firstName, lastName, profilePicture, dailyPoints,totalPoints,achievements, likes, comments}: User) {
  return (
    <View className="flex flex-col justify-center items-center gap-3 p-4 rounded-lg w-full">


      <View className="flex flex-row gap-3 justify-center">
        <Image source={profilePicture ? { uri: profilePicture } : defaultImages.derik}
               className="w-12 h-12 rounded-full"
        />
        <View className="flex flex-col flex-1">
          <Text className="text-lg font-semibold">{firstName} {lastName}</Text>
          <Text className="">1hr ago</Text>
        </View>
      </View>


      <View className="flex flex-row mt-2 gap-3 justify-between w-full items-center">
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


      <View className="w-full mt-2 rounded-lg">
        <FlatList
          data={carouselData}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          snapToAlignment="start"
          decelerationRate="fast"
          renderItem={({ item }) => (
            <View
              className="rounded-lg mx-2"
              style={{
                width: itemWidth,
                height: itemHeight,
                backgroundColor: item.color
              }}
            />
          )}
        />
      </View>

      <View className="w-full">
        <Text className="text-base font-semibold">Top points for this week!</Text>

        <View className="flex flex-row justify-between items-center mt-2 mb-2">
          <View className="flex flex-row items-center gap-1">
            <Icon name="thumbs-up" size={20} color="#555" />
            <Text className="text-sm"> {likes}</Text>
          </View>

          <View className="flex flex-row items-center gap-1">
            <Icon name="message-circle" size={20} color="#555" />
            <Text className="text-sm"> {comments}</Text>
          </View>

          <Icon name="send" size={20} color="#555" />
        </View>
      </View>

    </View>
  );
}
