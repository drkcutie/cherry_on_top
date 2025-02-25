import InputField from '@/components/InputField';
import { Link } from 'expo-router';
import { useState } from 'react';
import { View, Text, SafeAreaView, Pressable } from 'react-native';
import { z } from 'zod';
import { Lock, Mail } from 'lucide-react-native';

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' })
});

interface UserInfo {
  email: string;
  password: string;
}

export default function LoginScreen() {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const updateUserInfo = (key: keyof UserInfo, val: string) => {
    setUserInfo((prev) => ({
      ...prev,
      [key]: val
    }));
  };

  const handleLogin = () => {
    const validation = loginSchema.safeParse(userInfo);

    if (!validation.success) {
      const formattedErrors = validation.error.format();
      setErrors({
        email: formattedErrors.email?._errors[0],
        password: formattedErrors.password?._errors[0]
      });
      return;
    }

    setErrors({});
  };

  return (
    <SafeAreaView className="h-screen-safe mx-auto flex w-96 flex-col items-center justify-center gap-12">
      <Text className="font-montserrat-semi-bold text-3xl text-darthmouth">Login to Resiklo</Text>
      <View className="flex w-full flex-col gap-8">
        <View className="flex flex-col gap-2">
          <InputField
            label={'Email Address'}
            value={userInfo.email}
            onChange={(e) => {
              updateUserInfo('email', e);
            }}
            icon={<Mail size={20} color="#a3a3a3" />}
            keyboardType="email-address"
            textContentType="emailAddress"
            secureTextEntry={false}
          />
          {errors.email && <Text className="text-red-500">{errors.email}</Text>}
        </View>

        <View className="flex flex-col gap-2">
          <InputField
            label={'Password'}
            value={userInfo.password}
            onChange={(e) => {
              updateUserInfo('password', e);
            }}
            icon={<Lock size={20} color="#a3a3a3" />}
            keyboardType="default"
            textContentType="password"
            secureTextEntry={true}
          />
          {errors.password && <Text className="text-red-500">{errors.password}</Text>}
        </View>
      </View>

      <View className="flex w-full flex-col items-center gap-4">
        <Link
          href={'/(auth)/forgot-password'}
          className="ml-auto font-roboto-medium text-darthmouth"
        >
          Forgot Password?
        </Link>
        <Pressable
          className="w-full rounded-full bg-darthmouth py-4 active:opacity-80"
          onPress={handleLogin}
        >
          <Text className="text-center font-montserrat-medium text-white">Login</Text>
        </Pressable>
        <Link href={'/(auth)/login'} className="font-roboto-regular text-jet">
          Don't have an account? <Text className="font-roboto-medium text-darthmouth">Sign Up</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
}
