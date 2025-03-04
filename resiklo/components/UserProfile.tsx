import {Image, Pressable, Text, View} from 'react-native';
import React from "react";
import defaultImages from '@/constants/defaultImages';
import {router} from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import UserSocials from "@/components/UserSocials";


interface UserProfile {
    firstName: string;
    lastName: string;
    profilePicture: string ;
    dailyPoints: number;
    topPoints: number;
    streaks: number;
}


export default function UserProfile({firstName,lastName, profilePicture, dailyPoints, topPoints, streaks}: UserProfile) {
    const defaultPP = "ass"

    return (


        <View className="flex flex-col justify-center items-center gap-3 p-4 rounded-lg w-full">

//PROFILEEEEEE
            <View className="flex flex-row gap-3 items-center">
                <Image
                    source={defaultImages.derik}
                    style={{ width: 90, height: 90, borderRadius: 50 }}
                />

                <View className="flex-1">
                    <Text className="text-2xl font-bold">{firstName} {lastName}</Text>

                    <Pressable
                        onPressIn={() => router.replace('/(tabs)/scan')}
                        className="rounded-full overflow-hidden"
                    >
                        <LinearGradient
                            colors={['#1D6742', '#3ACD83']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={{
                                width: 100,
                                height: 30,
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 25,
                            }}
                        >
                            <Text className="font-roboto-bold text-white">Edit Profile</Text>
                        </LinearGradient>
                    </Pressable>
                </View>
            </View>

//grey thingy haha
            <View
                style={{ width: 420,
                    height: 7,
                    backgroundColor: "#aaaaaa",
                    opacity: 0.3,
                    justifyContent: "center",
                    alignItems: "center",
                }} />

//STATS
            <Text className="text-xl text-black font-montserrat-semi-bold  mt-2 ml-2 self-start">
                This week
            </Text>

            <View className="flex flex-row mt-2 gap-3 justify-between w-full items-center">
                <View className="flex flex-col items-center">
                    <Text className="text-xl font-roboto-bold text-malachite ">{dailyPoints = 63} pts</Text>
                    <Text className="text-sm">Daily Points</Text>
                </View>

                <View className="flex flex-col items-center">
                    <Text className="text-xl font-roboto-bold text-malachite ">{topPoints = 788} pts</Text>
                    <Text className="text-sm">Top Points</Text>
                </View>

                <View className="flex flex-col items-center">
                    <Text className="text-xl font-roboto-bold text-malachite ">{streaks = 7}</Text>
                    <Text className="text-sm ">Streaks</Text>
                </View>

            </View>
//Stats Chart
            <View
                style={{ width: 320,
                    height: 150,
                    backgroundColor: "#48e27b",
                    opacity: 0.3,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,

                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.2,
                    shadowRadius: 4
                    }} />



 //Activity (Socials) to get from zak

            <Text className="text-xl text-black font-montserrat-semi-bold  mt-2 ml-2 self-start">
               Activity
            </Text>

            <View className="flex flex-col  items-left justify-center">
                <UserSocials firstName={"Derik"} lastName={"Binembang"} profilePicture={""}>

                </UserSocials>

                <View
                    style={{ width: 320,
                        height: 150,
                        backgroundColor: "#aaaaaa",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 10,

                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.2,
                        shadowRadius: 4
                    }} />

            </View>

        </View>




    )
}
