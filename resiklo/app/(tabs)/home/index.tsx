import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { supabase } from '@/lib/supabase';
import Carousel from '@/components/Carousel';
import HeyUser from '@/components/HeyUser';
import TaskCard from '@/components/TaskCard';
import defaultImages from '@/constants/defaultImages';
import { useUser } from '@/app/provider';

export default function HomeScreen() {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <ScrollView contentContainerClassName="">
        <View className="flex min-h-[500px] flex-col items-center gap-2">
          <Carousel />
          <View className="-mt-10 flex flex-col gap-5 rounded-t-3xl bg-white p-5 pt-10">
            <View className="border-1 relative border-black">
              <HeyUser firstName={user?.first_name!} />
              <Image
                source={defaultImages.globe}
                className="absolute bottom-[-10px] right-[-30px] h-80 border-black"
                resizeMode="contain"
              />
            </View>
            <Text className="ml-2 self-start font-montserrat-semi-bold text-xl text-default_gray">
              You've recycled <Text className="font-montserrat-bold text-darthmouth">24</Text> this
              {'\n'}week. Keep going!
            </Text>
            <View className="flex flex-col items-center justify-center gap-7">
              {[...Array(10)].map((_, index) => (
                <TaskCard key={index}></TaskCard>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
