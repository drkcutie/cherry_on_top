import React, { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import iconImages from '@/constants/icons';
import { LockKeyhole, LockKeyholeOpen } from 'lucide-react-native';

interface RewardCardProps {
  company: string;
  description: string;
  points: number;
}

interface ProgressBarProps {
  points: number;
  progress: number;
  completedProgress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, completedProgress }) => {
  const progressPercentage = (progress / completedProgress) * 100;

  return (
    <View className="h-2 w-full rounded-full bg-gray-300">
      <View
        className={`h-full rounded-full ${progress === completedProgress ? 'bg-malachite' : 'bg-orange-500'}`}
        style={{ width: `${progressPercentage}%` }}
      />
    </View>
  );
};

export default function RewardCard() {
  const [points, setPoints] = useState(100);
  const progress = 50;
  const completeProgress = 100;

  function handleClick() {}

  return (
    <Pressable
      className="flex h-24 w-full flex-row items-center justify-between gap-2 rounded-2xl bg-off-white p-5 active:opacity-50"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4
      }}
      onPressIn={() => handleClick()}
    >
      <Image source={iconImages.star} className="self-center"></Image>
      <View className="h-full w-[2px] border-l-2 border-dashed bg-gray-500"></View>
      <View className="flex flex-col items-start justify-start gap-2">
        <Text>10% off your next purchase </Text>
        <ProgressBar
          progress={progress}
          completedProgress={completeProgress}
          points={0}
        ></ProgressBar>
        <Text className="text-left">{points} points</Text>
      </View>
      {progress === completeProgress ? (
        <LockKeyholeOpen className="self-center" width={25} height={25} color={'#2E2E2E'} />
      ) : (
        <LockKeyhole className="self-center" width={25} height={25} color={'#2E2E2E'} />
      )}
    </Pressable>
  );
}
