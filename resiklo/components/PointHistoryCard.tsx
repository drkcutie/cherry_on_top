import React from 'react';
import { View, Text } from 'react-native';

interface PointHistoryCardProps {
  title: string;
  points: number;
  date: string;
}

export default function PointHistoryCard({ title, points, date }: PointHistoryCardProps) {
  return (
    <>
      <View className="shadow-inner flex h-20 w-full flex-row justify-between rounded-2xl bg-off-white p-5 drop-shadow-sm">
        <View className="flex flex-col items-start justify-between gap-1">
          <Text className="font-montserrat-semi-bold">{title}</Text>
          <Text className="font-montserrat-medium text-gray-400">{date}</Text>
        </View>
        <View
          className={`flex h-auto min-h-10 items-center justify-center rounded-full p-2 ${points < 0 ? 'bg-red-200' : 'bg-malachite'}`}
        >
          <Text className={`font-montserrat-bold ${points < 0 ? 'text-red-500' : 'text-black'}`}>
            {points < 0 ? '' : '+'}
            {points}
          </Text>
        </View>
      </View>
    </>
  );
}
