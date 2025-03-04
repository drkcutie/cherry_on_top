import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import UserProfile from '@/components/UserProfile';
import { useUser } from '@/app/provider';

export default function AccountScreen() {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <ScrollView contentContainerClassName="p-5">
        <View className="items-left flex min-h-[500px] flex-col gap-2 p-5 pb-10 pt-10">
          <View className="items-left flex flex-col justify-center">
            <UserProfile
              firstName={user?.first_name!}
              lastName={user?.last_name!}
              profilePicture={user?.image_url!}
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
