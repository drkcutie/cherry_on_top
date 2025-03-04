import React from "react";
import {View, Text} from "react-native";

interface PointHistoryCardProps {
    title: string;
    points: number;
    date: string;
}

export default function PointHistoryCard({title, points, date} : PointHistoryCardProps) {
    return (
        <>
            <View
                className='w-full h-20  flex flex-row  justify-between bg-off-white rounded-2xl shadow-inner drop-shadow-sm p-5'>
                <View className='flex flex-col gap-1 items-start justify-between'>
                    <Text className='font-montserrat-semi-bold'>
                        {title}
                    </Text>
                    <Text className='text-gray-400  font-montserrat-medium'>
                        {date}
                    </Text>
                </View>
                <View
                    className={`min-h-10 min-h-10 p-2 h-auto rounded-full items-center justify-center flex ${points < 0 ? "bg-red-200" : "bg-malachite"}`}>
                    <Text className={` font-montserrat-bold ${points < 0 ? "text-red-500" : "text-black"}`}>{points < 0 ? '' : '+'}{points}</Text>
                </View>

            </View>
        </>

    )
}