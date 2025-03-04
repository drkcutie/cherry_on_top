import {ActivityIndicator, SafeAreaView, ScrollView, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import defaultImages from "@/constants/defaultImages";
import Animated, {
    FadeInUp,
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withRepeat,
    Easing
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

export default function WasteScreen() {
    const points = 50;
    const waste_type = "Plastic";
    const waste_count = 3;

    // Waste Recycling Suggestions
    const suggestions = [
        "Use reusable bags instead of plastic bags.",
        "Clean and dry plastic containers before recycling.",
        "Participate in local recycling programs.",
        "Repurpose plastic bottles for home use.",
        "Avoid single-use plastics whenever possible."
    ];

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2500); // Simulate AI processing for 2.5s
    }, []);

    // Animation for pulsing dots (thinking effect)
    const dotsOpacity = useSharedValue(1);
    dotsOpacity.value = withRepeat(
        withTiming(0, { duration: 500, easing: Easing.inOut(Easing.ease) }),
        -1,
        true
    );

    const dotsStyle = useAnimatedStyle(() => ({
        opacity: dotsOpacity.value,
    }));

    // Animation for magnifying glass (up and down movement)
    const magnifyTranslateY = useSharedValue(0);
    magnifyTranslateY.value = withRepeat(
        withTiming(-10, { duration: 1000, easing: Easing.inOut(Easing.sin) }),
        -1,
        true
    );

    const magnifyStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: magnifyTranslateY.value }],
    }));

    // Animation for thumbs up (side-to-side movement)
    const thumbsTranslateX = useSharedValue(0);
    thumbsTranslateX.value = withRepeat(
        withTiming(10, { duration: 1500, easing: Easing.inOut(Easing.sin) }),
        -1,
        true
    );

    const thumbsStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: thumbsTranslateX.value }],
    }));

    return (
        <SafeAreaView className="flex-1">
            <ScrollView contentContainerClassName="pt-10">
                <View className="min-h-[500px] flex flex-col gap-4 items-center">

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
                        <Text className="font-montserrat-bold text-3xl text-center">
                            <Text className="text-darthmouth">{waste_type}</Text> and{" "}
                            <Text className="text-darthmouth">{waste_count} other{"\n"}</Text>wastes found!
                        </Text>
                    </Animated.View>

                    {/* Animated Gradient Card */}
                    <Animated.View
                        className="w-[90%] h-80 mt-4 rounded-3xl overflow-hidden"
                        entering={FadeInUp.duration(500).delay(600)}
                    >
                        <LinearGradient
                            colors={["#1D6742", "#3ACD83"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            className="w-[90%] h-full  rounded-2xl"
                        >
                            <View className="relative w-full h-full flex items-center justify-center">
                                <Text className="text-black text-left font-montserrat-semi-bold text-jet text-5xl">
                                    You've earned  {"\n"}
                                    <Text className="font-montserrat-bold">{points} points</Text> for {"\n"}this scan!
                                </Text>
                            </View>

                            {/* Animated Thumbs-Up Image */}
                            <Animated.Image
                                source={defaultImages.thumbs_up}
                                className="h-44 w-44 absolute bottom-0 right-4"
                                resizeMode="contain"
                                entering={FadeInUp.duration(500)}
                                style={thumbsStyle}
                            />
                        </LinearGradient>
                    </Animated.View>

                    {/* Recycling Subtitle */}
                    <Animated.View entering={FadeInUp.duration(500).delay(700)}>
                        <Text className="text-center text-default_gray text-xl font-montserrat-semi-bold">
                            Here are ways you can recycle waste{"\n"} responsibly.
                        </Text>
                    </Animated.View>

                    <Animated.View
                        className="w-[90%] bg-white p-10 rounded-3xl shadow-sm mt-4 h-auto"
                        entering={FadeInUp.duration(500).delay(800)}
                    >
                        <Text className="text-center font-montserrat-bold text-3xl text-black mb-2">
                            Recycling Suggestions
                        </Text>
                        <View className='bg-default_gray h-[2px] mb-5'></View>

                        {loading ? (
                            <View className="flex items-center justify-center">
                                <ActivityIndicator size="large" color="#3ACD83" />
                                <Text className="text-default_gray text-lg mt-2">Generating insights</Text>
                                <Animated.Text className="text-default_gray text-lg font-montserrat-medium" style={dotsStyle}>
                                    . . .
                                </Animated.Text>
                            </View>
                        ) : (
                            suggestions.map((tip, index) => (
                                <Animated.View key={index} entering={FadeInUp.duration(500).delay(900 + index * 100)}>
                                    <Text className="text-black font-montserrat-medium text-xl">
                                        • {tip}
                                    </Text>
                                </Animated.View>
                            ))
                        )}
                    </Animated.View>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
