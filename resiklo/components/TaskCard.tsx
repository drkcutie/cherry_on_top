import React from "react";
import {View, Text, Pressable, Image} from "react-native";
import {router} from "expo-router";

interface TaskCardProps {
    type: string;
    description: string;
    taskType: string;
    pointsToBeCompleted: number;
}
//TODO connect to supabase and real time
export default function TaskCard() {
    return <>
            <View className='flex-row flex  items-center p-3 justify-between gap-2  w-full  bg-off-white rounded-3xl shadow-2xl bg-off-white'>
                <View className='flex flex-row items-center justify-center gap-4'>
                    <View className="bg-malachite flex justify-center items-center h-16 w-16 rounded-2xl">
                        <Image source={require("@/assets/images/trash_type/plastic/1.png")}></Image>
                    </View>
                    <View className='flex flex-col'>
                        <Text className='text-md font-roboto-bold'>
                            Scan 50 Plastic Caps
                        </Text>
                        <Text className='text-sm font-roboto-bold text-darthmouth'>
                            26/50 Completed
                        </Text>
                    </View>

                </View>
                <Pressable onPressIn={() => router.replace('/(tabs)/scan') } className="bg-jet h-16 w-24 rounded-2xl active:scale-105  flex items-center justify-center">
                    <Text className="font-roboto-bold text-malachite " >Scan now</Text>
                </Pressable>



            </View>
    </>;
}
