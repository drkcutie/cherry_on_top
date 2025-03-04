import { View, FlatList, Dimensions } from "react-native";
import React from "react";

const carouselData = [
  { id: 1, color: "#B0604D" },
  { id: 2, color: "#899F9C" },
  { id: 3, color: "#B3C680" },
  { id: 4, color: "#5C6265" },
  { id: 5, color: "#F5D399" },
];

const { width: windowWidth } = Dimensions.get("window");
const itemWidth = windowWidth * 0.6;
const itemHeight = itemWidth * 4 / 3;

export default function ImageCarousel() {
  return (
    <View className="w-full mt-2 rounded-lg">
      <FlatList
        data={carouselData}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        snapToAlignment="start"
        decelerationRate="fast"
        renderItem={({ item }) => (
          <View
            className="rounded-lg mx-2"
            style={{
              width: itemWidth,
              height: itemHeight,
              backgroundColor: item.color,
            }}
          />
        )}
      />
    </View>
  );
}
