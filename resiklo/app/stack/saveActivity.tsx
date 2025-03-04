import React, { useState } from "react";
import { View, Text, Pressable, Image, SafeAreaView, ScrollView, TextInput } from "react-native";
import * as ImagePicker from "expo-image-picker";
import defaultImages from '@/constants/defaultImages';
import { LinearGradient } from "expo-linear-gradient";
import { Link, router } from 'expo-router';

interface User {
    firstName: string;
    lastName: string;
    profilePicture: string ;
    dailyPoints: number;
    totalPoints: number;
    achievments: number;
}

export default function UploadPhoto({firstName,lastName, profilePicture, dailyPoints, totalPoints, achievments}: User) {
    const [images, setImages] = useState([]);
    const [caption, setCaption] = useState("");


    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            alert("Permission to access gallery is required!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled && result.assets.length > 0) {
            setImages([...images, result.assets[0].uri]); // Add new image to array
        }
    };

    return (
        <SafeAreaView>
            <View style={{ alignItems: "center" }}>
                <Text className="text-xl text-black font-montserrat-semi-bold mt-2">
                    Save Activity
                </Text>
            </View>


            <View className="flex flex-col justify-center items-center gap-3 p-4 rounded-lg w-full">


                {/* Caption Box Title diay */}
                <View style={{
                    width: 320,
                    minHeight: 70,
                    maxHeight: 200,
                    justifyContent: "flex-start",
                    alignItems: "center",
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor: "#aaaaaa",
                    padding: 10,
                }}
                >
                    <TextInput
                        style={{
                            width: "100%",
                            fontSize: 16,
                            color: "#000",
                            textAlignVertical: "top",
                        }}
                        placeholder="Add title"
                        placeholderTextColor="#999"
                        value={caption}
                        onChangeText={setCaption}
                        multiline={true}
                    />
                </View>

                {/* Statssss */}
                <View style={{
                    width: 320,
                    height: 80,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 5, // Add spacing from caption box
                }}
                >
                    <View style={{ alignItems: "center" }}>
                        <Text style={{ fontSize: 14 }}>Daily Points</Text>
                        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{dailyPoints = 48} pts</Text>
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <Text style={{ fontSize: 14 }}>Total Points</Text>
                        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{totalPoints = 164} pts</Text>
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <Text style={{ fontSize: 14, color: "#888" }}>Achievements</Text>
                        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{achievments = 2} 🏆</Text>
                    </View>
                </View>




                {/* Horiz scroll for images */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 30
                    }}
                >
                    {/* Total Points template */}
                    <Image
                        source={defaultImages.totalPoints}
                        style={{ width: 150, height: 150, borderRadius: 10, marginRight: 10 }}
                    />

                    {images.map((img, index) => (
                        <View key={index} style={{ marginRight: 10 }}>
                            <Image
                                source={{ uri: img }}
                                style={{ width: 150, height: 150, borderRadius: 10 }}
                            />
                        </View>
                    ))}

                    {/* Add Photo click */}
                    <Pressable
                        onPress={pickImage}
                        style={{
                            width: 150,
                            height: 150,
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 10,
                            borderWidth: 2,
                            borderColor: "#aaaaaa",
                            borderStyle: "dashed",
                        }}
                    >
                        <Text style={{ fontSize: 16, color: "#888" }}>Add Photo</Text>
                    </Pressable>
                </ScrollView>


                {/* Submit  */}
            <Pressable
                onPressIn={() => router.replace('')}
                className="rounded-full overflow-hidden"
            >
                <LinearGradient
                    colors={['#1D6742', '#3ACD83']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{
                        width: 320,
                        height: 40,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 25,

                    }}
                >
                    <Text className="font-roboto-bold text-white">Submit Activity</Text>
                </LinearGradient>
            </Pressable>
            </View>
        </SafeAreaView>
    );
}
