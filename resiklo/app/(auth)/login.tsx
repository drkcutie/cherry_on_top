import { setSession, signInWithEmail } from '@/services/auth';
import InputField from '@/components/InputField';
import { Link, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Pressable, Switch, ActivityIndicator } from 'react-native';
import { z } from 'zod';
import { Lock, LucideMessageSquareWarning, Mail } from 'lucide-react-native';
import ResikloWord from '@/components/svgs/ResikloWord';
import Animated, { FadeIn } from 'react-native-reanimated';
import GoogleIcon from '@/components/svgs/GoogleIcon';

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

  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const updateUserInfo = (key: keyof UserInfo, val: string) => {
    setUserInfo((prev) => ({
      ...prev,
      [key]: val
    }));
  };

  const handleLogin = async () => {
    const validation = loginSchema.safeParse(userInfo);

    if (!validation.success) {
      setErrors('Invalid email or password');
      return;
    }

    setErrors('');
    setLoading(true);

    try {
      const session = await signInWithEmail(userInfo.email, userInfo.password, rememberMe);

      if (session) {
        router.replace('/(tabs)/home');
      }
    } catch (error) {
      console.error('Login failed: ', error);
      setErrors('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="h-screen-safe w-full bg-white">
      <View className="flex h-full w-full flex-col items-center gap-8 px-8 py-12">
        <View className="flex w-full flex-col items-center">
          <Animated.View entering={FadeIn.duration(500)}>
            <ResikloWord width="225" height="125" />
          </Animated.View>

          <View
            className={`${errors ? 'bg-red-500' : 'bg-transparent'} flex min-h-[24px] w-full flex-row items-center gap-4 px-8 py-4`}
          >
            <LucideMessageSquareWarning color="white" size={18} />
            {errors && <Text className="text-sm text-white">{errors}</Text>}
          </View>
        </View>

        <Animated.Text
          entering={FadeIn.duration(550)}
          className="font-montserrat-bold text-4xl tracking-tighter text-darthmouth"
        >
          Login to continue.
        </Animated.Text>
        <Animated.View entering={FadeIn.duration(560)} className="flex w-full flex-col gap-4">
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
            {/* Reserving space for errors */}
          </View>
          {/* Remember Me */}
          <View className="flex w-full flex-row items-center justify-between px-2">
            <Text className="text-neutral-500">Remember Me</Text>
            <Switch
              value={rememberMe}
              onValueChange={(value) => setRememberMe(value)}
              thumbColor={rememberMe ? '#008000' : '#f4f4f4'}
              trackColor={{ false: '#a3a3a3', true: '#d1fae5' }}
            />
          </View>
        </Animated.View>

        <View className="flex w-full flex-col items-center gap-2">
          <Pressable
            className="w-full rounded-full bg-darthmouth py-4 active:opacity-80"
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator />
            ) : (
              <Text className="text-center font-montserrat-bold text-xl uppercase tracking-wide text-white">
                {loading ? '' : 'Log In'}
              </Text>
            )}
          </Pressable>
          <View className="my-4 flex-row items-center">
            <View className="h-[1px] flex-1 bg-neutral-300" />
            <Text className="mx-4 text-neutral-500">OR</Text>
            <View className="h-[1px] flex-1 bg-neutral-300" />
          </View>
          <Pressable
            className="flex w-full flex-row items-center justify-center gap-4 rounded-full bg-white py-4 shadow-md active:opacity-80"
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator />
            ) : (
              <>
                <GoogleIcon width="24" height="24" />
                <Text className="items-center text-center font-montserrat-bold text-lg uppercase tracking-wide text-neutral-600">
                  {loading ? '' : 'Continue With Google'}
                </Text>
              </>
            )}
          </Pressable>
          <View className="my-4 flex flex-col items-center gap-8">
            <Link
              href={'/(auth)/signup'}
              className="font-roboto-semibold text-lg tracking-wider text-jet"
            >
              Don't have an account?{' '}
              <Text className="font-roboto-medium uppercase text-darthmouth underline">SignUp</Text>
            </Link>
            <Link
              href={'/(auth)/signup'}
              className="font-roboto-bold text-lg tracking-wider text-neutral-500"
            >
              RESET PASSWORD
            </Link>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
