import InputField from '@/components/InputField';
import { Link } from 'expo-router';
import { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, Pressable } from 'react-native';
import { z } from 'zod';

const userSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Confirm password must be at least 8 characters')
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignUpScreen() {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const updateUserInfo = (key: keyof UserInfo, val: string) => {
    setUserInfo((prev) => ({
      ...prev,
      [key]: val
    }));
  };

  const handleSignUp = () => {
    const result = userSchema.safeParse(userInfo);
    if (!result.success) {
      console.error(result.error.format());
      return;
    }

    // Handle sign-up logic
    console.log('User information is valid:', userInfo);
  };

  return (
    <SafeAreaView className="h-screen-safe flex w-screen flex-col items-center justify-center gap-12 px-8 py-4 ">
      <Text className="font-montserrat-semi-bold text-3xl text-gray">Sign Up for Resi{""}
        <Text className="font-montserrat-semi-bold text-3xl text-darthmouth">klo </Text>
      </Text>
      <View className="flex w-full flex-col gap-8 p-10">
        <View>
          <InputField
            label={'First Name'}
            value={userInfo.firstName}
            onChange={(e) => {
              updateUserInfo('firstName', e);
            }}
            keyboardType="default"
            textContentType="givenName"
            secureTextEntry={false}
          />
          <InputField
            label={'Last Name'}
            value={userInfo.lastName}
            onChange={(e) => {
              updateUserInfo('lastName', e);
            }}
            keyboardType="default"
            textContentType="familyName"
            secureTextEntry={false}
          />
        </View>

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

        <InputField
          label={'Confirm Password'}
          value={userInfo.confirmPassword}
          onChange={(e) => {
            updateUserInfo('confirmPassword', e);
          }}
          keyboardType="default"
          textContentType="password"
          secureTextEntry={true}
        />
      </View>
      <View className="flex w-full flex-col items-center gap-4">
        <Pressable className="w-full rounded-full bg-darthmouth py-4" onPress={handleSignUp}>
          <Text className="text-center font-montserrat-medium text-white">Sign Up</Text>
        </Pressable>
        <Link href={'/(auth)/login'} className="font-roboto-regular text-jet">
          Already have an account? <Text className="font-roboto-medium text-darthmouth">Login</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
}