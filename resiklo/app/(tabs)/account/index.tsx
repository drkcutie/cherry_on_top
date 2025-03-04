import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import Reward from '@/components/RewardPoints';
import UserSocials from '@/components/UserSocials';
import UserProfile from '@/components/UserProfile';

export default function AccountScreen() {
  return (
    <SafeAreaView className="flex-1">
      <ScrollView contentContainerClassName="p-5">
        <View className="items-left flex min-h-[500px] flex-col gap-2 p-5 pb-10 pt-10">
          <View className="items-left flex flex-col justify-center">
            <UserProfile
              firstName={'Derrick'}
              lastName={'Binembang'}
              profilePicture={''}
              dailyPoints={0}
              topPoints={0}
              streaks={0}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
