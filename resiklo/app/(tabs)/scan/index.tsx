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

  useEffect(() => {
    if (permission && !permission.granted) {
      requestPermission();
    }
  }, []);

  useEffect(() => {
    console.log(uri);
  }, [uri]);

  if (!permission) {
    // Put code here for no camera permissions
    return <View />;
  }

  const toggleCameraFacing = () => {
    setFacing((curr) => (curr === 'back' ? 'front' : 'back'));
  };

  const takePicture = async () => {
    if (!ref.current) {
      console.log('Camera reference is null');
      return;
    }

    try {
      const photo = await ref.current.takePictureAsync();
      console.log('Captured photo:', photo);

      if (photo?.uri) {
        setUri(photo.uri);
      } else {
        console.log('Photo URI is null!');
      }
    } catch (error) {
      console.error('Error taking picture:', error);
    }
  };

  const renderPicture = () => {
    return (
      <View className="flex h-full w-full items-center justify-center gap-8">
        {uri && <Image source={{ uri }} className="h-96 w-96" />}
        <LinearGradient
          className="overflow-hidden rounded-xl px-8 py-1"
          colors={['#1D6742', '#3ACD83']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Pressable onPress={() => setUri(null)} className="w-full py-4 active:opacity-80">
            <Text className="text-center font-montserrat-bold text-xl uppercase tracking-wide text-white">
              Retake Image
            </Text>
          </Pressable>
        </LinearGradient>
      </View>
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
        <View className="relative h-full w-full items-center justify-end p-12">
          <View className="h-fit w-fit rounded-full border-2 border-malachite p-1">
            <TouchableOpacity onPress={takePicture} className="h-12 w-12 rounded-full bg-white" />
          </View>
          <TouchableOpacity
            className="ml-auto h-16 w-16 items-center justify-center rounded-full bg-darthmouth p-2"
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
