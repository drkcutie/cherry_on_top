import React from "react";
import {View, Text, StyleSheet, Image, Pressable} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import iconImages from "@/constants/icons";
import {History} from "lucide-react-native";

export default function Reward() {
    const points = 1000;

    return (
        <LinearGradient
            colors={["#48E27B", "#287C43"]}
            style={styles.gradientBackground}
        >
            <Text className="text-2xl font-montserrat-bold text-black">Rewards</Text>
            <View className="flex flex-row justify-between bg-white rounded-2xl p-5">
                <View className='flex flex-row gap-3'>
                    <Image source = {iconImages.star} className='self-center'></Image>
                    <View className="flex flex-col">
                        <Text className="font-bold text-xl">{points}</Text>
                        <Text className='font-montserrat-regular'>Total points</Text>
                    </View>
                </View>
                <Pressable className='rounded bg-jet flex flex-row items-center active:opacity-80 justify-center p-4 pt-1 pb-1 rounded-2xl gap-2'>
                    <History color={"#FFFFFF"} width={15} height={15}/>
                    <Text className='text-white font-montserrat-medium'>History</Text>
                </Pressable>
            </View>
        </LinearGradient>

    );
}


const styles = StyleSheet.create({
    gradientBackground: {
        width: "100%",
        padding: 30,
        borderRadius: 20,
        height: 160,
        justifyContent: "center",
        gap: 10,

    },
});
