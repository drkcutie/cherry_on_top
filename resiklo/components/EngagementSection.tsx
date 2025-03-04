import { View, Text, Pressable } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Feather";
import { router } from "expo-router";

interface EngagementProps {
  likes: number;
  comments: number;
  postId: string;
}

export default function EngagementSection({ likes, comments, postId }: EngagementProps) {
  const handleCommentPress = () => {
    router.push("/stack/comments");
    // router.push(`/stack/${postId}`);
  };

  return (
    <View className="w-full flex flex-col pl-10 pr-10">


      <View className="flex flex-row justify-between items-center mt-2 mb-2">

        <View className="flex flex-row items-center gap-1">
          <Icon name="thumbs-up" size={20} color="#555" />
          <Text className="text-sm">{likes}</Text>
        </View>


        <Pressable className="px-2 py-1" onPress={handleCommentPress}>
          <View className="flex flex-row items-center gap-1">
            <Icon name="message-circle" size={20} color="#555" />
            <Text className="text-sm">{comments}</Text>
          </View>
        </Pressable>

        <Icon name="send" size={20} color="#555" />
      </View>
    </View>
  );
}
