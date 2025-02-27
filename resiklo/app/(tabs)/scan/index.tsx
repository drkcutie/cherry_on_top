import { useState, useRef, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraView, useCameraPermissions, CameraType } from 'expo-camera';
import { Pressable, View, Text, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SwitchCamera } from 'lucide-react-native';
import React from 'react';

export default function ScanScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [uri, setUri] = useState<string | null>(null);
  const ref = useRef<CameraView>(null);

  if (!permission) {
    // Put code here for no camera permissions
    return <View />;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <View className="flex h-96 w-full flex-col items-center justify-between gap-4 px-8">
          <Text>We need your permission to show the camera</Text>
          <View className="w-full overflow-hidden rounded-full">
            <LinearGradient
              colors={['#1D6742', '#3ACD83']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Pressable className="w-full py-4 active:opacity-80" onPress={requestPermission}>
                <Text className="text-center font-montserrat-bold text-xl uppercase tracking-wide text-white">
                  Request Permission
                </Text>
              </Pressable>
            </LinearGradient>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  const toggleCameraFacing = () => {
    setFacing((curr) => (curr === 'back' ? 'front' : 'back'));
  };

  const takePicture = async () => {
    const photo = await ref.current?.takePictureAsync();

    if (photo) {
      setUri(photo?.uri);
    }
  };

  const renderPicture = () => {
    return (
      <>
        <View>{uri && <Image source={{ uri }} />}</View>
      </>
    );
  };

  const renderCamera = () => {
    return (
      <CameraView
        facing={facing}
        className="h-full w-full"
        ref={ref}
        responsiveOrientationWhenOrientationLocked
      >
        <View></View>
        <View className="relative h-full w-full items-end justify-end p-12">
          <Pressable onPress={takePicture} className="h-12 w-12 bg-white" />
          <TouchableOpacity
            className="h-16 w-16 items-center justify-center rounded-full bg-darthmouth p-2"
            onPress={toggleCameraFacing}
          >
            <SwitchCamera size={24} color="white" />
          </TouchableOpacity>
        </View>
      </CameraView>
    );
  };

  return (
    <SafeAreaView className="h-full w-full">{uri ? renderPicture() : renderCamera()}</SafeAreaView>
  );
}
