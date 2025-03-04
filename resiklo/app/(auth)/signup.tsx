import {
  Text,
  View,
  TextInput,
  SafeAreaView,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import React, { useState } from 'react';
import { Eye, EyeOff, Lock, LucideMail, LucideMessageSquareWarning } from 'lucide-react-native';
import { Link, router } from 'expo-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import Divider from '@/components/Divider';
import ResikloWord from '@/components/svgs/ResikloWord';
import { Image } from 'react-native';
import { signUpWithEmail } from '@/services/auth';
import { AuthError } from '@supabase/supabase-js';

const signUpSchema = z
  .object({
    firstName: z.string().min(2, 'First name is required'),
    lastName: z.string().min(2, 'Last name is required'),
    email: z.string().email('Invalid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirm_password: z.string()
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password']
  });

export default function SignUpScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirm_password: ''
    }
  });

  const [passwordVisible, setPasswordIsNotVisible] = useState(true);
  const [confirmPasswordVisible, setConfirmPasswordNotVisible] = useState(true);

  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95, { damping: 10, stiffness: 200 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 10, stiffness: 200 });
  };

  const onSubmit = async (data: any) => {
    const validation = signUpSchema.safeParse(data);

    if (!validation.success) {
      console.error('Validation failed:', validation.error.format());
      return;
    }

    try {
      const { session, error } = await signUpWithEmail(
        data.email,
        data.password,
        data.firstName,
        data.lastName
      );

      if (error) {
        console.error('Signup failed:', error);
        return;
      }

      if (!session) {
        console.warn('Please check your inbox for email verification!');
        return;
      }

      router.replace('/(tabs)/home');
    } catch (error) {
      console.error('Signup process failed:', error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView className="m-auto flex flex-col items-center justify-start gap-5">
        <View className="flex flex-col items-center gap-2">
          <Text className="text-gray font-montserrat-bold text-4xl">Sign Up to Resiklo</Text>
          <Text className="text-gray-400">let's create your account!</Text>
        </View>
        <Pressable className="w-80 flex-row items-center justify-center gap-3 rounded-full bg-facebook p-3 shadow-lg active:scale-105">
          <Image
            source={require('@/assets/images/facebook_logo_square.png')}
            style={{ width: 20, height: 20 }}
          />
          <Text className="text-center font-montserrat-medium text-lg text-white">
            SIGN UP WITH FACEBOOK
          </Text>
        </Pressable>
        <Divider />

        <View className="flex flex-col gap-3">
          {/* First & Last Name Fields */}
          <View className="flex flex-row gap-2">
            <View>
              <Text className="mb-1 font-roboto-light text-sm text-black">First Name</Text>
              <Controller
                control={control}
                name="firstName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    className="min-h-12 min-w-48 rounded border border-gray-400 p-2"
                  />
                )}
              />
              <View className="min-h-[20px]">
                {errors.firstName ? (
                  <Text className="mt-2 text-red-500">{errors.firstName.message}</Text>
                ) : null}
              </View>
            </View>

            <View>
              <Text className="mb-1 font-roboto-light text-sm text-black">Last Name</Text>
              <Controller
                control={control}
                name="lastName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    className="min-h-12 min-w-48 rounded border border-gray-400 p-2"
                  />
                )}
              />
              <View className="min-h-[20px]">
                {errors.lastName ? (
                  <Text className="mt-2 text-red-500">{errors.lastName.message}</Text>
                ) : null}
              </View>
            </View>
          </View>

          {/* Email Field */}
          <View>
            <Text className="mb-1 font-roboto-light text-sm text-black">Email</Text>
            <View className="min-h-12 min-w-48 flex-row items-center rounded border border-gray-400">
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Email Address"
                    className="flex-1 border-gray-400 p-2 pl-3 text-base text-black"
                  />
                )}
              />
              <View className="p-3">
                <Text>
                  <LucideMail color="#9CA3AF" size={20} className="stroke-gray-400" />
                </Text>
              </View>
            </View>

            <View className="min-h-[20px]">
              {errors.email && <Text className="mt-2 text-red-500">{errors.email.message}</Text>}
            </View>
          </View>

          {/* Password Field */}
          <View>
            <Text className="mb-1 font-roboto-light text-sm text-black">Password</Text>
            <View className="min-h-12 min-w-48 flex-row items-center rounded border border-gray-400">
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    onBlur={onBlur}
                    onChangeText={onChange}
                    placeholder="Password"
                    value={value}
                    className="flex-1 p-3 text-base text-black"
                    secureTextEntry={passwordVisible}
                  />
                )}
              />
              <Pressable
                onPress={() => setPasswordIsNotVisible(!passwordVisible)}
                className="self-center p-2"
              >
                {passwordVisible ? (
                  <Eye color={'#9CA3AF'} size={20} className="stroke-gray-400" />
                ) : (
                  <EyeOff color={'#9CA3AF'} size={20} className="stroke-gray-400" />
                )}
              </Pressable>
            </View>
            <View className="min-h-[20px]">
              {errors.password ? (
                <Text className="mt-2 text-red-500">{errors.password.message}</Text>
              ) : null}
            </View>
          </View>

          {/* Confirm Password Field */}
          <View>
            <Text className="mb-1 font-roboto-light text-sm text-black">Confirm Password</Text>
            <View className="min-h-12 min-w-48 flex-row items-center rounded border border-gray-400">
              <Controller
                control={control}
                name="confirm_password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Confirm Password"
                    className="flex-1 p-3 text-base text-black"
                    secureTextEntry={confirmPasswordVisible}
                  />
                )}
              />
              <Pressable
                onPress={() => setConfirmPasswordNotVisible(!confirmPasswordVisible)}
                className="self-center p-2"
              >
                {confirmPasswordVisible ? (
                  <Eye color={'#9CA3AF'} size={20} className="stroke-gray-400" />
                ) : (
                  <EyeOff color={'#9CA3AF'} size={20} className="stroke-gray-400" />
                )}
              </Pressable>
            </View>
            <View className="min-h-[20px]">
              {errors.confirm_password ? (
                <Text className="mt-2 text-red-500">{errors.confirm_password.message}</Text>
              ) : null}
            </View>
          </View>

          <Animated.View style={animatedStyle}>
            <Pressable
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={handleSubmit(onSubmit)}
              className="w-[90%] self-center rounded-full bg-darthmouth p-3 shadow-lg"
            >
              <Text className="self-center font-montserrat-semi-bold text-xl text-white">
                CONTINUE
              </Text>
            </Pressable>
          </Animated.View>

          <View className="flex flex-row items-center justify-center gap-2">
            <Text className="self-center font-roboto-medium">Already have an account?</Text>
            <Link href={'/(auth)/login'}>
              <Text className="font-roboto-medium font-bold text-darthmouth underline">LOGIN</Text>
            </Link>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
