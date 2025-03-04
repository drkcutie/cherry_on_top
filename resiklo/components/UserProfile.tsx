import { Image, Pressable, Text, View } from 'react-native';
import React from 'react';
import defaultImages from '@/constants/defaultImages';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import UserSocials from '@/components/UserSocials';

interface UserProfile {
  firstName: string;
  lastName: string;
  profilePicture: string;
  dailyPoints: number;
  topPoints: number;
  streaks: number;
}

export default function UserProfile({
  firstName,
  lastName,
  profilePicture,
  dailyPoints,
  topPoints,
  streaks
}: UserProfile) {
  const defaultPP = 'ass';

  return (
    <View className="flex w-full flex-col items-center justify-center gap-3 rounded-lg p-4">
      <View className="flex flex-row items-center gap-3">
        <Image source={defaultImages.derik} style={{ width: 90, height: 90, borderRadius: 50 }} />

        <View className="flex-1">
          <Text className="text-2xl font-bold">
            {firstName} {lastName}
          </Text>

          <Pressable
            onPressIn={() => router.replace('/(tabs)/scan')}
            className="overflow-hidden rounded-full"
          >
            <LinearGradient
              colors={['#1D6742', '#3ACD83']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                width: 100,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 25
              }}
            >
              <Text className="font-roboto-bold text-white">Edit Profile</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </View>
      <View
        style={{
          width: 420,
          height: 7,
          backgroundColor: '#aaaaaa',
          opacity: 0.3,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      />
      <Text className="ml-2 mt-2 self-start font-montserrat-semi-bold text-xl text-black">
        This week
      </Text>
      <View className="mt-2 flex w-full flex-row items-center justify-between gap-3">
        <View className="flex flex-col items-center">
          <Text className="font-roboto-bold text-xl text-malachite">{(dailyPoints = 63)} pts</Text>
          <Text className="text-sm">Daily Points</Text>
        </View>

        <View className="flex flex-col items-center">
          <Text className="font-roboto-bold text-xl text-malachite">{(topPoints = 788)} pts</Text>
          <Text className="text-sm">Top Points</Text>
        </View>

        <View className="flex flex-col items-center">
          <Text className="font-roboto-bold text-xl text-malachite">{(streaks = 7)}</Text>
          <Text className="text-sm">Streaks</Text>
        </View>
      </View>
      <View
        style={{
          width: 320,
          height: 150,
          backgroundColor: '#48e27b',
          opacity: 0.3,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,

          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 4
        }}
      />
      //Activity (Socials) to get from zak
      <Text className="ml-2 mt-2 self-start font-montserrat-semi-bold text-xl text-black">
        Activity
      </Text>
      <View className="items-left flex flex-col justify-center">
        <UserSocials
          firstName={'Derik'}
          lastName={'Binembang'}
          profilePicture={''}
          dailyPoints={0}
          totalPoints={0}
          achievements={0}
          caption={''}
        />

        <View
          style={{
            width: 320,
            height: 150,
            backgroundColor: '#aaaaaa',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,

            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 4
          }}
        />
      </View>
    </View>
  );
}
