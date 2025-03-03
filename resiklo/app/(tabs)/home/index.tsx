import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import {supabase} from '@/lib/supabase';
import Carousel from "@/components/Carousel";
import HeyUser from "@/components/HeyUser";
import TaskCard from "@/components/TaskCard";

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

    return (
        <SafeAreaView className="flex-1">
            <ScrollView contentContainerClassName="p-5">
                <View className="min-h-[500px] flex flex-col gap-2  p-5 pt-10 pb-10 items-center">
                    <HeyUser firstName = "Zak"></HeyUser>
                    <Carousel></Carousel>
                    <Text className="text-black font-montserrat-semi-bold text-2xl mt-2 ml-2 self-start">
                        You've recycled <Text className="text-darthmouth font-montserrat-bold">24</Text> this{'\n'}week. Keep going!
                    </Text>
                    <View className='flex flex-col gap-7 items-center justify-center'>
                        {[...Array(10)].map((_,index) => (
                            <TaskCard key = {index}></TaskCard>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}