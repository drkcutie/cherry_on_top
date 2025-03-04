import { useState, useRef, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraView, useCameraPermissions, CameraType } from 'expo-camera';
import { Pressable, View, Text, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SwitchCamera } from 'lucide-react-native';
import React from 'react';
import Animated, { FadeIn } from 'react-native-reanimated';
import {useMutation, useQuery} from "@tanstack/react-query";
import {uploadAsync} from "expo-file-system";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';


export default function ScanScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [uri, setUri] = useState<string | null>(null);
  const ref = useRef<CameraView>(null);

  const mutation = useMutation({
    mutationFn: async (uri: string) => {
      const formData = new FormData();
      const uniqueImageName =  uuidv4() + ".jpg";
      formData.append("file", {
        uri,
        name: uniqueImageName,
        type: "image/jpeg",
      } as any); // Type assertion to fix FormData TypeScript issues

      return axios.post("https://your-api.com/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: (data) => {
      console.log("Upload successful!", data);
    },
    onError: (error) => {
      console.error("Upload failed:", error);
    },

  });

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

  const sendToModel = () => {
    if(uri !== null)
    mutation.mutate(uri)
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

  const retakePicture = () => {
    setUri(null);
  };

  const renderPicture = () => {
    return (
      <View className="flex h-full w-full items-center justify-center gap-8">
        {uri && <Image source={{ uri }} className="h-screen w-full" />}
        <View className="absolute bottom-20 flex w-full flex-col items-center gap-4 px-16">
          <View className="w-full overflow-hidden rounded-full border-2 border-malachite py-1">
            <Pressable onPress={() => setUri(null)} className="w-full py-2 active:opacity-80">
              <Text className="text-center font-montserrat-bold text-lg uppercase tracking-wide text-malachite">
                Retake
              </Text>
            </Pressable>
          </View>

          <LinearGradient
            className="w-full overflow-hidden rounded-full py-1"
            colors={['#1D6742', '#3ACD83']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Pressable onPress={() => sendToModel()} className="w-full py-2 active:opacity-80">
              <Text className="text-center font-montserrat-bold text-lg uppercase tracking-wide text-white">
                Submit
              </Text>
            </Pressable>
          </LinearGradient>
        </View>
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
        <View className="relative h-full w-full items-center justify-end p-12">
          <View className="h-fit w-fit rounded-full border-2 border-malachite p-1">
            <TouchableOpacity onPress={takePicture} className="h-16 w-16 rounded-full bg-white" />
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
