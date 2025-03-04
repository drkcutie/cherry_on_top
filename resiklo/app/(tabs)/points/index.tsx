import { SafeAreaView, ScrollView, Text, View } from "react-native";
import React from "react";
import { ChevronLeft } from "lucide-react-native";

export default function PointHistoryScreen() {
    return (
        <SafeAreaView className="flex-1">
            {/* Header */}
            <View className="flex-row items-center justify-start p-4 border-b border-gray-300">
                <ChevronLeft className="mr-2 self-start" />
                <Text className="text-lg font-semibold">Points History</Text>
            </View>

            {/* Content */}
            <ScrollView contentContainerStyle={{ padding: 20 }}>
                <View className="min-h-[500px] flex flex-col gap-2 items-center"></View>
            </ScrollView>
        </SafeAreaView>
    );
}
