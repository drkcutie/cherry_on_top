import React, {useEffect, useState} from "react";
import {Image, Pressable, StyleSheet, Text, View} from "react-native";
import {Style} from "domelementtype";
import iconImages from "@/constants/icons";
import {Simulate} from "react-dom/test-utils";
import progress = Simulate.progress;
import {Lock, LockKeyhole, LockKeyholeOpen} from "lucide-react-native";


interface RewardCardProps {
    company: string;
    description: string;
    points: number;
}
interface ProgressBarProps {
    points : number
    progress: number;
    completedProgress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress , completedProgress }) => {
    const progressPercentage = (progress / completedProgress) * 100;

    return (
        <View className="w-full h-2 bg-gray-300 rounded-full">
            <View
                className={`h-full rounded-full ${progress === completedProgress ? "bg-malachite" : "bg-orange-500"}`}
                style={{ width: `${progressPercentage}%` }}
            />
        </View>
    );
};;

export default function RewardCard() {
    const [points, setPoints] = useState(100);
    const progress = 50
    const completeProgress = 100


    function handleClick(){

    }
    return (
        <Pressable
            className="flex flex-row w-full h-24 p-5 justify-between items-center rounded-2xl  active:opacity-50 gap-2 bg-off-white"
            style={{
                shadowColor: "#000",
                shadowOffset: {width: 0, height: 4}, // Moves shadow to the bottom
                shadowOpacity: 0.2, // Adjust for desired visibility
                shadowRadius: 4, // Softens the shadow
                elevation: 4, // Ensures shadow appears on Android
            }}
            onPressIn={() => handleClick()}
        >
            <Image source={iconImages.star} className='self-center'></Image>
            <View className='h-full w-[2px] border-dashed bg-gray-500 border-l-2 '></View>
            <View className="flex flex-col items-start justify-start gap-2">
                <Text>10% off your next purchase </Text>
                <ProgressBar progress = {progress} completedProgress={completeProgress}></ProgressBar>
                <Text className='text-left'>{points} points</Text>
            </View>
            {progress === completeProgress?
                <LockKeyholeOpen className='self-center ' width={25} height={25} color={'#2E2E2E'} /> :     <LockKeyhole className='self-center ' width={25} height={25} color={'#2E2E2E'}/>
            }
        </Pressable>

    )


}
