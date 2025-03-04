import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import Reward from '@/components/RewardPoints';
import UserSocials from '@/components/UserSocials';
import ImageCarousel from '@/components/ImageCarousel';
import EngagementSection from '@/components/EngagementSection';

export default function SocialScreen() {
  return (
    <SafeAreaView className="flex-1">
      <ScrollView contentContainerClassName="p-5">
          <View className="min-h-[500px] flex flex-col gap-2 p-5 pt-10 pb-10 items-left">
              <View className="flex flex-col  items-center justify-center ">
                <UserSocials firstName={"Derik"} lastName={"Binembang"} profilePicture={""} dailyPoints={21} totalPoints={59} achievements={2} caption={"Morning Walk around Campus"}></UserSocials>
                <ImageCarousel></ImageCarousel>
                <EngagementSection likes={20} comments={5}></EngagementSection>

                <UserSocials firstName={"Mai"} lastName={"Deir"} profilePicture={""} dailyPoints={21} totalPoints={59} achievements={2} caption={"Afternoon Park Jog"}></UserSocials>
                <ImageCarousel></ImageCarousel>
                <EngagementSection likes={20} comments={5}></EngagementSection>

                <UserSocials firstName={"Mai"} lastName={"Deir"} profilePicture={""} dailyPoints={21} totalPoints={59} achievements={2} caption={"Late Night Walk"}></UserSocials>
                <ImageCarousel></ImageCarousel>
                <EngagementSection likes={20} comments={5}></EngagementSection>

              </View>

          </View>
      </ScrollView>

    </SafeAreaView>
  );
}
