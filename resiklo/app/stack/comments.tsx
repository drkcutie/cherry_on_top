import { useState } from "react";
import { View, Text, Pressable, SafeAreaView, TextInput, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function CommentInput() {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([
    { id: 1, user: "Alex", text: "This is amazing!", timestamp: "2h ago" },
    { id: 2, user: "Jamie", text: "I totally agree with this!", timestamp: "30m ago" },
    { id: 3, user: "Kaz", text: "Oh my God", timestamp: "2m ago" },
    { id: 4, user: "Derik", text: "Damn!", timestamp: "1m ago" },
  ]);

  const handleSubmit = () => {
    if (comment.trim() === "") return;

    const newComment = {
      id: comments.length + 1,
      user: "You",
      text: comment,
      timestamp: "Just now",
    };

    setComments([newComment, ...comments]);
    setComment("");
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-5 py-6">
      {/* Title */}
      <Text className="text-lg font-bold mb-6">Comments</Text>

      {/* Comments Section */}
      <ScrollView className="flex-1 mb-6">
        {comments.map((item) => (
          <View key={item.id} className="flex-row items-start mb-6">
            {/* User Avatar */}
            <View className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-4">
              <Text className="text-lg font-bold text-gray-600">
                {item.user.charAt(0)}
              </Text>
            </View>

            {/* Comment Content */}
            <View className="flex-1">
              <Text className="font-semibold text-sm">{item.user}</Text>
              <Text className="text-sm text-gray-800 leading-tight">{item.text}</Text>
              <Text className="text-xs text-gray-500 mt-1">{item.timestamp}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Fixed Comment Input */}
      <View className="border border-gray-300 rounded-lg px-4 py-2 mb-6">
        <TextInput
          className="text-base text-gray-900 w-full py-2"
          placeholder="Write a comment..."
          placeholderTextColor="#999"
          value={comment}
          onChangeText={setComment}
          multiline
        />
      </View>

      {/* Submit Button */}
      <Pressable onPress={handleSubmit} className="rounded-full overflow-hidden">
        <LinearGradient
          colors={['#1D6742', '#3ACD83']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="w-full h-12 flex items-center justify-center rounded-full"
        >
          <Text className="text-white font-bold text-base">Post</Text>
        </LinearGradient>
      </Pressable>
    </SafeAreaView>
  );
}
