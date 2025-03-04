import React from "react";
import { Text, View } from "react-native";

export default function Divider() {
    return (
        <View className="w-[90%] flex flex-row items-center justify-center">
            <View className="flex-1 h-[1px] bg-gray-400" />
            <Text className="mx-2 text-gray-600">OR</Text>
            <View className="flex-1 h-[1px] bg-gray-400" />
        </View>
    );
}
