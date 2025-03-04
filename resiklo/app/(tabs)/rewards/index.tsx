import {Pressable, SafeAreaView, ScrollView, Text, View} from 'react-native';
import Reward from "@/components/RewardPoints";
import RewardCard from "@/components/RewardCard";
import { useRouter} from "expo-router";

export default function RewardScreen() {
    const router = useRouter()
    return (
        <SafeAreaView className="flex-1">
            <ScrollView contentContainerClassName="p-5">
                <View className="min-h-[500px] flex flex-col gap-2  p-5 pt-10 pb-10 items-center">
                    <Reward ></Reward>
                    <View className='flex flex-row w-full p-3 justify-between items-center'>
                        <Text className='font-montserrat-bold text-xl'>All Rewards</Text>
                        <Pressable onPressIn={() => router.push("../stack/point-history")}>
                            <Text className='font-montserrat-medium text-darthmouth underline text-md'>My Redemption History</Text>
                        </Pressable>
                    </View>
                    <View className='flex flex-col gap-5 items-center justify-center'>
                        {[...Array(10)].map((_, index) =>
                            <RewardCard key = {index}></RewardCard>
                        )}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}