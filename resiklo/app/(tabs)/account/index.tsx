import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import Reward from '@/components/RewardPoints';
import UserSocials from '@/components/UserSocials';
import UserProfile from "@/components/UserProfile";


export default function AccountScreen() {
    return (
        <SafeAreaView className="flex-1">
            <ScrollView contentContainerClassName="p-5">
                <View className="min-h-[500px] flex flex-col gap-2 p-5 pt-10 pb-10 items-left">
                    <View className="flex flex-col  items-left justify-center">

                        <UserProfile firstName={"Derrick"} lastName={"Binembang"} profilePicture={""}></UserProfile>

                    </View>

                </View>
            </ScrollView>

        </SafeAreaView>
    );
}
