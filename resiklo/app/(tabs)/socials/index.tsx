import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import Reward from '@/components/RewardPoints';
import UserSocials from '@/components/UserSocials';

export default function SocialScreen() {
  return (
    <SafeAreaView className="flex-1">
      <ScrollView contentContainerClassName="p-5">
          <View className="min-h-[500px] flex flex-col gap-2 p-5 pt-10 pb-10 items-left">
              <View className="flex flex-col  items-left justify-center">
                <UserSocials firstName={"Derik"} lastName={"Binembang"} profilePicture={""}>

                </UserSocials>

              </View>

          </View>
      </ScrollView>

    </SafeAreaView>
  );
}
