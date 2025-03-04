import { ActivityIndicator, SafeAreaView, ScrollView, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import defaultImages from '@/constants/defaultImages';
import Animated, {
  FadeInUp,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  Easing
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

export default function WasteScreen() {
  const points = 50;
  const waste_type = 'Plastic';
  const waste_count = 3;

  const suggestions = [
    'Use reusable bags instead of plastic bags.',
    'Clean and dry plastic containers before recycling.',
    'Participate in local recycling programs.',
    'Repurpose plastic bottles for home use.',
    'Avoid single-use plastics whenever possible.'
  ];

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, []);

  const dotsOpacity = useSharedValue(1);
  dotsOpacity.value = withRepeat(
    withTiming(0, { duration: 500, easing: Easing.inOut(Easing.ease) }),
    -1,
    true
  );

  const dotsStyle = useAnimatedStyle(() => ({
    opacity: dotsOpacity.value
  }));

  const magnifyTranslateY = useSharedValue(0);
  magnifyTranslateY.value = withRepeat(
    withTiming(-10, { duration: 1000, easing: Easing.inOut(Easing.sin) }),
    -1,
    true
  );

  const magnifyStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: magnifyTranslateY.value }]
  }));

  const thumbsTranslateX = useSharedValue(0);
  thumbsTranslateX.value = withRepeat(
    withTiming(10, { duration: 1500, easing: Easing.inOut(Easing.sin) }),
    -1,
    true
  );

  const thumbsStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: thumbsTranslateX.value }]
  }));

  return (
    <SafeAreaView className="flex-1">
      <ScrollView contentContainerClassName="pt-10">
        <View className="flex min-h-[500px] flex-col items-center gap-4">
          {/* Animated Magnifying Glass */}
          <Animated.Image
            source={defaultImages.magnify}
            className="h-48 w-48"
            resizeMode="contain"
            entering={FadeInUp.duration(500)}
            style={magnifyStyle}
          />

          {/* Animated Waste Info Text */}
          <Animated.View entering={FadeInUp.duration(500).delay(200)}>
            <Text className="text-center font-montserrat-bold text-3xl">
              <Text className="text-darthmouth">{waste_type}</Text> and{' '}
              <Text className="text-darthmouth">
                {waste_count} other{'\n'}
              </Text>
              wastes found!
            </Text>
          </Animated.View>

          {/* Animated Gradient Card */}
          <Animated.View
            className="mt-4 h-80 w-[90%] overflow-hidden rounded-3xl"
            entering={FadeInUp.duration(500).delay(600)}
          >
            <LinearGradient
              colors={['#1D6742', '#3ACD83']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="h-full w-[90%] rounded-2xl"
            >
              <View className="relative flex h-full w-full items-center justify-center">
                <Text className="text-left font-montserrat-semi-bold text-5xl text-jet">
                  You've earned {'\n'}
                  <Text className="font-montserrat-bold">{points} points</Text> for {'\n'}this scan!
                </Text>
              </View>

              {/* Animated Thumbs-Up Image */}
              <Animated.Image
                source={defaultImages.thumbs_up}
                className="absolute bottom-0 right-4 h-44 w-44"
                resizeMode="contain"
                entering={FadeInUp.duration(500)}
                style={thumbsStyle}
              />
            </LinearGradient>
          </Animated.View>

          {/* Recycling Subtitle */}
          <Animated.View entering={FadeInUp.duration(500).delay(700)}>
            <Text className="text-center font-montserrat-semi-bold text-xl text-default_gray">
              Here are ways you can recycle waste{'\n'} responsibly.
            </Text>
          </Animated.View>

          <Animated.View
            className="mt-4 h-auto w-[90%] rounded-3xl bg-white p-10 shadow-sm"
            entering={FadeInUp.duration(500).delay(800)}
          >
            <Text className="mb-2 text-center font-montserrat-bold text-3xl text-black">
              Recycling Suggestions
            </Text>
            <View className="mb-5 h-[2px] bg-default_gray"></View>

            {loading ? (
              <View className="flex items-center justify-center">
                <ActivityIndicator size="large" color="#3ACD83" />
                <Text className="mt-2 text-lg text-default_gray">Generating insights</Text>
                <Animated.Text
                  className="font-montserrat-medium text-lg text-default_gray"
                  style={dotsStyle}
                >
                  . . .
                </Animated.Text>
              </View>
            ) : (
              suggestions.map((tip, index) => (
                <Animated.View
                  key={index}
                  entering={FadeInUp.duration(500).delay(900 + index * 100)}
                >
                  <Text className="font-montserrat-medium text-xl text-black">• {tip}</Text>
                </Animated.View>
              ))
            )}
          </Animated.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
