import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import Reward from '@/components/RewardPoints';
import UserSocials from '@/components/UserSocials';
import ImageCarousel from '@/components/ImageCarousel';
import EngagementSection from '@/components/EngagementSection';
import { useUser } from '@/app/provider';

export default function SocialScreen() {
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
          <View className="flex flex-col items-center justify-center">
            <UserSocials
              firstName={user?.first_name!}
              lastName={user?.last_name!}
              profilePicture={user?.image_url!}
              dailyPoints={21}
              totalPoints={59}
              achievements={2}
              caption={'Morning Walk around Campus'}
            ></UserSocials>
            <ImageCarousel></ImageCarousel>
            <EngagementSection likes={20} comments={5} postId={''}></EngagementSection>

            <UserSocials
              firstName={user?.first_name!}
              lastName={user?.last_name!}
              profilePicture={user?.image_url!}
              dailyPoints={21}
              totalPoints={59}
              achievements={2}
              caption={'Afternoon Park Jog'}
            ></UserSocials>
            <ImageCarousel></ImageCarousel>
            <EngagementSection likes={20} comments={5} postId={''}></EngagementSection>

            <UserSocials
              firstName={user?.first_name!}
              lastName={user?.last_name!}
              profilePicture={user?.image_url!}
              dailyPoints={21}
              totalPoints={59}
              achievements={2}
              caption={'Late Night Walk'}
            ></UserSocials>
            <ImageCarousel></ImageCarousel>
            <EngagementSection likes={20} comments={5} postId={''}></EngagementSection>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
