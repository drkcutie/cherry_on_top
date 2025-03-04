import { useState, useRef, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { CameraView, useCameraPermissions, CameraType } from "expo-camera";
import { Pressable, View, Text, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SwitchCamera } from "lucide-react-native";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import uuid from "react-native-uuid";

export default function ScanScreen() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [uri, setUri] = useState<string | null>(null);
  const [detectedImage, setDetectedImage] = useState<string | null>(null);
  const ref = useRef<CameraView>(null);

  const mutation = useMutation({
    mutationFn: async (uri: string) => {
      const formData = new FormData();
      const uniqueImageName = uuid.v4() + ".jpg";

      // Append file to FormData
      formData.append("file", {
        uri: uri,
        name: uniqueImageName,
        type: "image/jpeg",
      } as any);

      try {
        const response = await axios.post("http://192.168.2.1:8000/detect/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        return response.data;
      } catch (error) {
        console.error("Upload failed:", error);
        throw error;
      }
    },
    onSuccess: (data) => {
      console.log("Upload successful!", data);
      if (data.image_base64) {
        setDetectedImage(data.image_base64);
      }
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

  const sendToModel = () => {
    if (uri) {
      mutation.mutate(uri);
    }
  };

  const toggleCameraFacing = () => {
    setFacing((curr) => (curr === "back" ? "front" : "back"));
  };

  const takePicture = async () => {
    if (!ref.current) return;

    try {
      const photo = await ref.current.takePictureAsync();
      if (photo?.uri) {
        setUri(photo.uri);
      }
    } catch (error) {
      console.error("Error taking picture:", error);
    }
  };

  return (
      <SafeAreaView className="h-full w-full">
        {uri ? (
            <View className="flex h-full w-full items-center justify-center gap-8">
              {/* Detected Image Background */}
              <Image
                  source={{ uri: detectedImage || uri }}
                  className="absolute h-full w-full"
                  resizeMode="cover"
              />

              {/* Retake & Submit Buttons */}
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
                    colors={["#1D6742", "#3ACD83"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                >
                  <Pressable onPress={sendToModel} className="w-full py-2 active:opacity-80">
                    <Text className="text-center font-montserrat-bold text-lg uppercase tracking-wide text-white">
                      Submit
                    </Text>
                  </Pressable>
                </LinearGradient>
              </View>
            </View>
        ) : (
            <CameraView facing={facing} className="h-full w-full" ref={ref}>
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
        )}
      </SafeAreaView>
  );
}
