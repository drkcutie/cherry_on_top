import { useState } from 'react';
import { Text, View, Pressable, SafeAreaView, Image } from 'react-native';
import ResikloWord from '@/components/svgs/ResikloWord';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  FadeIn
} from 'react-native-reanimated';
import { Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';

// Static data for each onboarding screen
const onboardingScreens = [
  {
    image: <Image source={require('@/assets/images/onboarding-1.png')} />,
    title: 'Scan. Track. Reduce. Sustain.',
    desc: 'Effortlessly identify waste, monitor your impact, and build lasting sustainable habits.'
  },
  {
    image: <Image source={require('@/assets/images/onboarding-2.png')} />,
    title: 'Turn Waste into Impact with AI.',
    desc: 'Use AI to detect, track, and reduce waste while making a real difference for the planet.'
  },
  {
    image: <Image source={require('@/assets/images/onboarding-3.png')} />,
    title: 'Gamify Your Sustainability Journey.',
    desc: 'Earn rewards, track progress, and compete in challenges to make sustainability fun!'
  }
];

// Onboarding screen makes use of React states to handle
// changing title, image, and descs for each onboarding
// screen.

export default function OnboardingScreen() {
  const [pageIndex, setPageIndex] = useState(0);
  const progress = useSharedValue(0);

  const handleNext = () => {
    setPageIndex((pageIndex + 1) % 3);
    progress.value = withTiming((pageIndex + 1) % 3, { duration: 300 });
  };

  const handleSkip = () => {
    setPageIndex(2); // 3 onboarding screens in total
    progress.value = withTiming((pageIndex + 1) % 3, { duration: 300 });
  };

  const animatedIndicator = (index: number) =>
    useAnimatedStyle(() => ({
      width:
        pageIndex === index ? withTiming(40, { duration: 300 }) : withTiming(12, { duration: 300 }),
      // if index is selected, then bg color is primary (dartmouth) else text color (jet)
      backgroundColor: pageIndex === index ? '#1D6742' : '#525252'
    }));

  const handleViewedOnboarding = async () => {
    try {
      await AsyncStorage.setItem('@viewedOnboarding', 'true');
    } catch (e) {
      console.error('Error @handleViewedOnboarding: ', e);
    }
  };

  return (
    <SafeAreaView className="flex h-full w-screen flex-col items-center gap-20 py-12">
      <View className="flex flex-col items-center justify-center gap-8">
        <Animated.View entering={FadeIn.duration(500)} className="mb-14">
          <ResikloWord width="225" height="125" />
        </Animated.View>
        <Animated.View entering={FadeIn.duration(500)} className="mx-auto h-60 w-auto items-center">
          {onboardingScreens[pageIndex].image}
        </Animated.View>

        <View className="flex flex-row items-center gap-4">
          {[...Array(3)].map((_, index) => (
            <Animated.View
              key={index}
              className="h-3 rounded-full"
              style={[animatedIndicator(index)]}
            />
          ))}
        </View>
      </View>

      <View className="flex flex-col gap-6 px-16">
        <Text className="text-center font-montserrat-bold text-2xl text-darthmouth">
          {onboardingScreens[pageIndex].title}
        </Text>
        <Text className="text-center text-base text-neutral-500">
          {onboardingScreens[pageIndex].desc}
        </Text>
      </View>

      <View className="flex w-screen flex-row justify-between px-16">
        {pageIndex < 2 ? (
          <>
            <Pressable className="px-12 py-4" onPress={handleSkip}>
              <Text className="font-montserrat text-lg text-darthmouth">Skip</Text>
            </Pressable>
            <View className="overflow-hidden rounded-lg">
              <LinearGradient
                colors={['#1D6742', '#3ACD83']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Pressable className="px-16 py-4 active:opacity-80" onPress={handleNext}>
                  <Text className="font-montserrat-bold text-lg text-white">Next</Text>
                </Pressable>
              </LinearGradient>
            </View>
          </>
        ) : (
          <>
            <View className="w-full overflow-hidden rounded-lg">
              <LinearGradient
                colors={['#1D6742', '#3ACD83']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Link
                  className="w-full rounded-lg py-4"
                  href={'/(auth)/login'}
                  onPress={handleViewedOnboarding}
                >
                  <Text className="text-center font-montserrat-bold text-lg text-white">
                    Let's get started!
                  </Text>
                </Link>
              </LinearGradient>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
