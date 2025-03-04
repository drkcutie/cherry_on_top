import React from 'react';
import { Text, View } from 'react-native';

export default function Divider() {
  return (
    <View className="flex w-[90%] flex-row items-center justify-center">
      <View className="h-[1px] flex-1 bg-gray-400" />
      <Text className="mx-2 text-gray-600">OR</Text>
      <View className="h-[1px] flex-1 bg-gray-400" />
    </View>
  );
}
