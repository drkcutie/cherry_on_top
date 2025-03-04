import { Image, Text, View } from 'react-native';
import React from "react";
import defaultImages from '@/constants/defaultImages';


interface User {
  firstName: string;
  lastName: string;
  profilePicture: string ;
  dailyPoints: number;
  totalPoints: number;
  achievments: number;
}


export default function UserSocials({firstName,lastName, profilePicture, dailyPoints, totalPoints, achievments}: User) {
  const defaultPP = "ass"
  return (


      <View className="flex flex-col justify-center items-center gap-3 p-4 rounded-lg w-full">
          <View className="flex flex-row gap-3 justify-center">
              <Image source={defaultImages.derik} className="w-12 h-12 rounded-full">
                </Image>

                <View className="flex flex-col flex-1">
                  <Text className="text-lg font-semibold">{firstName} {lastName}</Text>
                    <Text className="">1hr ago</Text>

                </View>
          </View>

        <View className="flex flex-row mt-2 gap-3 justify-between w-full items-center">
          <View className="flex flex-col items-center">
            <Text className="text-sm">Daily Points</Text>
            <Text className="font-bold">{dailyPoints} pts</Text>
          </View>
          <View className="flex flex-col items-center">
            <Text className="text-sm">Total Points</Text>
            <Text className="font-bold">{totalPoints} pts</Text>
          </View>

          <View className="flex flex-col items-center">
            <Text className="text-sm text-gray-500">Achievements</Text>
            <Text className="font-bold">hi</Text>
          </View>

        </View>


      </View>



  )
}
