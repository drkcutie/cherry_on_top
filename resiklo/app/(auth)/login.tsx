import InputField from '@/components/InputField';

import { Link } from 'expo-router';
import { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, Pressable } from 'react-native';

interface UserInfo {
  email: string;
  password: string;
}

// TODO: Put functions for corresponding action buttons and navigation links.

export default function LoginScreen() {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    email: '',
    password: ''
  });

  const updateUserInfo = (key: keyof UserInfo, val: string) => {
    setUserInfo((prev) => ({
      ...prev,
      [key]: val
    }));
  };

  return (
    <SafeAreaView className="h-screen-safe flex w-screen flex-col items-center justify-center gap-12 px-8 py-4">
      <Text className="font-montserrat-semi-bold text-3xl text-darthmouth">Login to Resiklo</Text>
      <View className="flex w-full flex-col gap-8">
        <InputField
          label={'Email Address'}
          value={userInfo.email}
          onChange={(e) => {
            updateUserInfo('email', e);
          }}
          keyboardType="email-address"
          textContentType="emailAddress"
          secureTextEntry={false}
        />

        <InputField
          label={'Password'}
          value={userInfo.password}
          onChange={(e) => {
            updateUserInfo('password', e);
          }}
          keyboardType="default"
          textContentType="password"
          secureTextEntry={true}
        />
      </View>
      <View className="flex w-full flex-col items-center gap-4">
        <Link href={'/(auth)/login'} className="ml-auto font-roboto-medium text-darthmouth">
          Forgot Password?
        </Link>
        <Pressable className="w-full rounded-full bg-darthmouth py-4">
          <Text className="text-center font-montserrat-medium text-white">Login</Text>
        </Pressable>
        <Link href={'/(auth)/login'} className="font-roboto-regular text-jet">
          Don't have an account? <Text className="font-roboto-medium text-darthmouth">Sign Up</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
}
