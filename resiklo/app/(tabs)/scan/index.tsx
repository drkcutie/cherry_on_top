import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Pressable, View, Text, TouchableOpacity } from 'react-native';

export default function ScanScreen() {
  const [facing, setFacing] = useState<'front' | 'back'>('back');
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Put code here for no camera permissions
    return <View />;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <Text>We need your permission to show the camera</Text>
        <Pressable onPress={requestPermission}>
          <Text>Request Permission</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  function toggleCameraFacing() {
    setFacing((curr) => (curr === 'back' ? 'front' : 'back'));
  }

  return (
    <SafeAreaView className="h-screen-safe w-full">
      <CameraView facing={facing} className="h-full w-full">
        <View className="relative h-full w-full">
          <TouchableOpacity>
            <Text>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </SafeAreaView>
  );
}
