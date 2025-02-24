import { useState } from 'react';
import { Text, View, Pressable } from 'react-native';
import ResikloWord from '@/components/svgs/ResikloWord';
import MobileHand from '@/components/svgs/MobileHand';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  FadeIn
} from 'react-native-reanimated';
import Smiley from '@/components/svgs/Smiley';
import Mushroom from '@/components/svgs/Mushroom';

// Static data for each onboarding screen
const onboardingScreens = [
  {
    image: <MobileHand />,
    title: 'Scan. Track. Reduce. Sustain.',
    desc: 'Effortlessly identify waste, monitor your impact, and build lasting sustainable habits.'
  },
  {
    image: <Smiley />,
    title: 'Turn Waste into Impact with AI.',
    desc: 'Use AI to detect, track, and reduce waste while making a real difference for the planet.'
  },
  {
    image: <Mushroom />,
    title: 'Gamify Your Sustainability Journey.',
    desc: 'Earn rewards, track progress, and compete in challenges to make sustainability fun!'
  }
];

// Onboarding screen makes use of React states to handle
// changing title, image, and descs for each onboarding
// screen.

// NOTE: in Figma, specific words are highlighted in title
// but I can't figure out how to do it dynamically here.

// TODO: Add redirect to auth once ready
// TODO: Add async storage so user only onboards once

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
      backgroundColor: pageIndex === index ? '#1D6742' : '#2E2E2E'
    }));

  return (
    <View className="h-screen-safe flex w-screen flex-col items-center justify-center gap-20">
      <View className="flex flex-col items-center justify-center gap-8">
        <Animated.View entering={FadeIn.duration(500)} className="mb-20">
          <ResikloWord />
        </Animated.View>
        <Animated.View entering={FadeIn.duration(500)}>
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
        <Text className="font-montserrat-bold text-center text-2xl">
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
              <Text className="font-montserrat text-darthmouth text-lg">Skip</Text>
            </Pressable>
            <Pressable className="bg-darthmouth rounded-lg px-16 py-4" onPress={handleNext}>
              <Text className="font-montserrat-bold text-lg text-white">Next</Text>
            </Pressable>
          </>
        ) : (
          <>
            <Pressable className="bg-darthmouth w-full rounded-lg py-4" onPress={handleNext}>
              <Text className="font-montserrat-bold text-center text-lg text-white">
                Let's get it!
              </Text>
            </Pressable>
          </>
        )}
      </View>
    </View>
  );
}
