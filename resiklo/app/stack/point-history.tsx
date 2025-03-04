import {Pressable, SafeAreaView, ScrollView, Text, View} from "react-native";
import React from "react";
import {ChevronLeft} from "lucide-react-native";
import PointHistoryCard from "@/components/PointHistoryCard";
import {useRouter} from "expo-router";


//TODO FETCH DATA FROM BACKEND WITH DATES
export default function PointHistoryScreen() {
    const history = [1];
    const router = useRouter()
    return (
        <SafeAreaView className="flex-1">
            <View className="flex-row items-center justify-between p-4 border-b border-gray-300">
                <Pressable onPressIn={() => router.back()}>
                    <Text>
                        <ChevronLeft stroke="#2E2E2E" className="self-start"/>
                    </Text>
                </Pressable>
                <Text className="font-semibold flex-1 text-center font-montserrat-bold text-4xl">
                    Points History
                </Text>
                <View className="w-6"/>
            </View>
            <ScrollView contentContainerStyle={{padding: 20}}>
                <View
                    className={`min-h-[500px] flex flex-col gap-2 items-center p-5  ${history.length === 0 ? "justify-center" : null}`}>
                    {history.length === 0 ?(
                        <Text className='text-3xl font-montserrat-regular text-gray-400'>No History Found</Text>
                    ): null}
                    <View className="flex flex-col w-full gap-5">
                        <Text className="self-start font-montserrat-semi-bold text-2xl">
                            February 2025
                        </Text>
                        {[...Array(10)].map((_, index) =>
                            <PointHistoryCard key={index} date={"February 25, 2025"} points={-200}
                                              title={"Lorem Ipsum Oten"}></PointHistoryCard>
                        )}
                    </View>

                </View>

            </ScrollView>
        </SafeAreaView>
    );
}
