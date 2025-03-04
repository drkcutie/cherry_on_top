import { useState } from 'react';
import { View, Text, Pressable, SafeAreaView, TextInput, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function CommentInput() {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    { id: 1, user: 'Alex', text: 'This is amazing!', timestamp: '2h ago' },
    { id: 2, user: 'Jamie', text: 'I totally agree with this!', timestamp: '30m ago' },
    { id: 3, user: 'Kaz', text: 'Oh my God', timestamp: '2m ago' },
    { id: 4, user: 'Derik', text: 'Damn!', timestamp: '1m ago' }
  ]);

  const handleSubmit = () => {
    if (comment.trim() === '') return;

    const newComment = {
      id: comments.length + 1,
      user: 'You',
      text: comment,
      timestamp: 'Just now'
    };

    setComments([newComment, ...comments]);
    setComment('');
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-5 py-6">
      {/* Title */}
      <Text className="mb-6 text-lg font-bold">Comments</Text>

      {/* Comments Section */}
      <ScrollView className="mb-6 flex-1">
        {comments.map((item) => (
          <View key={item.id} className="mb-6 flex-row items-start">
            {/* User Avatar */}
            <View className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-gray-300">
              <Text className="text-lg font-bold text-gray-600">{item.user.charAt(0)}</Text>
            </View>

            {/* Comment Content */}
            <View className="flex-1">
              <Text className="text-sm font-semibold">{item.user}</Text>
              <Text className="text-sm leading-tight text-gray-800">{item.text}</Text>
              <Text className="mt-1 text-xs text-gray-500">{item.timestamp}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Fixed Comment Input */}
      <View className="mb-6 rounded-lg border border-gray-300 px-4 py-2">
        <TextInput
          className="w-full py-2 text-base text-gray-900"
          placeholder="Write a comment..."
          placeholderTextColor="#999"
          value={comment}
          onChangeText={setComment}
          multiline
        />
      </View>

      {/* Submit Button */}
      <Pressable onPress={handleSubmit} className="overflow-hidden rounded-full">
        <LinearGradient
          colors={['#1D6742', '#3ACD83']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="flex h-12 w-full items-center justify-center rounded-full"
        >
          <Text className="text-base font-bold text-white">Post</Text>
        </LinearGradient>
      </Pressable>
    </SafeAreaView>
  );
}
