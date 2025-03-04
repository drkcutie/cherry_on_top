import React from "react";
import {View, Text, Pressable, Image, StyleSheet} from "react-native";
import {router} from "expo-router";
import {LinearGradient} from "expo-linear-gradient";

interface TaskCardProps {
    type: string;
    description: string;
    taskType: string;
    pointsToBeCompleted: number;
}
//TODO connect to supabase and real time
export default function TaskCard() {
    return <>
            <View className='flex-row flex  items-center p-3 justify-between gap-2  w-full  bg-off-white rounded-3xl shadow-sm drop-shadow-md bg-off-white'>
                <View className='flex flex-row items-center justify-center gap-4'>
                    <View className="bg-malachite flex justify-center items-center h-16 w-16 rounded-2xl">
                        <Image source={require("@/assets/images/trash_type/plastic/1.png")}></Image>
                    </View>
                    <View className='flex flex-col'>
                        <Text className='text-md font-roboto-bold'>
                            Scan 50 Plastic Caps
                        </Text>
                        <Text className='text-sm font-roboto-bold text-gray-400'>

                            26/50 Completed
                        </Text>
                    </View>

                </View>
                <LinearGradient
                    colors={["#1E6A44", "#2A9761"]}
                    className='rounded-full'
                    style={styles.buttonContainer}
                    start={{ x: 0, y: 0.5 }} // Start from the left
                    end={{ x: 1, y: 0.5 }}
                >

                <Pressable onPress={() => router.replace('/(tabs)/scan') } className="bg-transparent h-10 w-24 rounded-2xl active:scale-105  flex items-center justify-center">
                    <Text className="font-roboto-bold text-white" >Scan now</Text>
                </Pressable>
                </LinearGradient>



            </View>
    </>;
}

const styles = StyleSheet.create({
    buttonContainer: {

        borderRadius: 16, // Ensures Pressable has rounded corners
        overflow: "hidden", // Ensures the gradient doesn't overflow
        transform: [{ scale: 1 }], // For potential scaling effects

    },
    buttonBackground: {
        flex: 1, // Makes the gradient fill the entire Pressable
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 16, // Ensures LinearGradient has rounded corners
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
    },
});