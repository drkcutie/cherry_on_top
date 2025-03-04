import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import React from 'react';
import { ChevronLeft } from 'lucide-react-native';
import PointHistoryCard from '@/components/PointHistoryCard';
import { useRouter } from 'expo-router';

//TODO FETCH DATA FROM BACKEND WITH DATES
export default function PointHistoryScreen() {
  const history = [1];
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-row items-center justify-between border-b border-gray-300 p-4">
        <Pressable onPressIn={() => router.back()}>
          <Text>
            <ChevronLeft stroke="#2E2E2E" className="self-start" />
          </Text>
        </Pressable>
        <Text className="flex-1 text-center font-montserrat-bold text-4xl font-semibold">
          Points History
        </Text>
        <View className="w-6" />
      </View>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View
          className={`flex min-h-[500px] flex-col items-center gap-2 p-5 ${history.length === 0 ? 'justify-center' : null}`}
        >
          {history.length === 0 ? (
            <Text className="font-montserrat-regular text-3xl text-gray-400">No History Found</Text>
          ) : null}
          <View className="flex w-full flex-col gap-5">
            <Text className="self-start font-montserrat-semi-bold text-2xl">February 2025</Text>
            {[...Array(10)].map((_, index) => (
              <PointHistoryCard
                key={index}
                date={'February 25, 2025'}
                points={-200}
                title={'Lorem Ipsum Oten'}
              ></PointHistoryCard>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
