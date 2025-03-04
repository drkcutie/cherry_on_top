import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import Reward from '@/components/RewardPoints';
import RewardCard from '@/components/RewardCard';
import { useRouter } from 'expo-router';

export default function RewardScreen() {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1">
      <ScrollView contentContainerClassName="p-5">
        <View className="flex min-h-[500px] flex-col items-center gap-2 p-5 pb-10 pt-10">
          <Reward />
          <View className="flex w-full flex-row items-center justify-between p-3">
            <Text className="font-montserrat-bold text-xl">All Rewards</Text>
            <Pressable onPressIn={() => router.push('../stack/point-history')}>
              <Text className="text-md font-montserrat-medium text-darthmouth underline">
                My Redemption History
              </Text>
            </Pressable>
          </View>
          <View className="flex flex-col items-center justify-center gap-5">
            {[...Array(10)].map((_, index) => (
              <RewardCard key={index}></RewardCard>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
