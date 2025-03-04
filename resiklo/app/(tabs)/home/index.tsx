import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, ScrollView, Text, View} from 'react-native';
import {supabase} from '@/lib/supabase';
import Carousel from "@/components/Carousel";
import HeyUser from "@/components/HeyUser";
import TaskCard from "@/components/TaskCard";
import defaultImages from "@/constants/defaultImages";
import Animated, {
    Easing,
    FadeInUp,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming
} from "react-native-reanimated";

export default function HomeScreen() {
    // Testing if login works
    const [userEmail, setUserEmail] = useState('');
    useEffect(() => {
        const setEmail = async () => {
            const {data: user} = await supabase.auth.getUser();

            if (user.user?.email) {
                setUserEmail(user.user.email);
            }
        };

        setEmail();
    }, []);


    const globeTranslateX = useSharedValue(0);
    globeTranslateX.value = withRepeat(
        withTiming(10, { duration: 1500, easing: Easing.inOut(Easing.sin) }),
        -1,
        true
    );

    const globeStyle= useAnimatedStyle(() => ({
        transform: [{ translateX: globeTranslateX.value }],
    }));

    return (
        <SafeAreaView className="flex-1">
            <ScrollView contentContainerClassName="">
                <View className="min-h-[500px] flex flex-col gap-2   items-center">
                    <Carousel></Carousel>
                    <View className='flex flex-col gap-5 p-5 bg-white -mt-10 rounded-t-3xl pt-10'>
                        <View className="relative  border-1 border-black">
                            <HeyUser firstName="Zak" />
                            <Animated.Image
                                source={defaultImages.globe}
                                className="h-80 absolute bottom-[-10px] right-[-30px] border-black"
                                resizeMode="contain"
                                entering={FadeInUp.duration(500)}
                                style={globeStyle}
                            />

                        </View>
                        <Text className="text-default_gray font-montserrat-semi-bold text-xl  ml-2 self-start">
                            You've recycled <Text className="text-darthmouth font-montserrat-bold">24</Text> this{'\n'}week. Keep going!
                        </Text>
                        <View className='flex flex-col gap-7 items-center justify-center'>
                            {[...Array(10)].map((_,index) => (
                                <TaskCard key = {index}></TaskCard>
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}