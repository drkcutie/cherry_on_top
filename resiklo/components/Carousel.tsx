import React, {useState, useEffect} from "react";
import {View, Text, ImageBackground, Dimensions} from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";
import Animated, {useSharedValue, useAnimatedStyle, withTiming} from "react-native-reanimated";
import Texture from "@/constants/texture";

const {width} = Dimensions.get("window");
export default function Carousel() {

    // Text slides for the carousel
    const textSlides = [["Snap", "Recycle", "Make a", '{difference!}'], ["Small habits", "{massive}", "impact.", "Keep going!"], ["See.", "Sort.", "Save.", "{Sustain.}"]];
    const [textAlignment, setTextAlignment] = useState('text-right');
    const [index, setIndex] = useState(0);
    const translateX = useSharedValue(0); // Controls slide movement
    // Function to trigger sliding animation
    const slideText = (direction: "left" | "right") => {
        translateX.value = direction === "left" ? width : -width; // Move text off-screen
        translateX.value = withTiming(0, {duration: 300}); // Animate back to center
    };
    const progress = useSharedValue(20);

    // Auto-swiping every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            slideText("left");
            setIndex((prevIndex) => (prevIndex + 1) % textSlides.length);
        }, 8000); // Change slide every 3 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);


    useEffect(() => {
        if (index === 1) {
            setTextAlignment('text-left')
        } else {
            setTextAlignment('text-right')
        }
    }, [index]);

    // Handle swipe gestures (manual override)
    const onSwipeLeft = () => {
        slideText("left");
        setIndex((prevIndex) => (prevIndex + 1) % textSlides.length);
    };

    const onSwipeRight = () => {
        slideText("right");
        setIndex((prevIndex) => (prevIndex - 1 + textSlides.length) % textSlides.length);
    };


    // Apply animated slide effect
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{translateX: translateX.value}],
    }));

    const checkIfGreen = (text: string) => {
        return text[0] === "{" && text[text.length - 1] === "}" ? 'text-green-500' : 'text-neutral-100';
    }

    const cleanText = (text: string) => {
        return text.replace(/{|}/g, ""); // Removes curly braces
    };
    const animatedIndicator = (val: number) =>
        useAnimatedStyle(() => ({
            width:
                val === index ? withTiming(40, {duration: 300}) : withTiming(12, {duration: 300}),
            // if index is selected, then bg color is primary (dartmouth) else text color (jet)
            backgroundColor: val === index ? '#48E27B' : '#FFFFFF'
        }));

    return (
        <GestureRecognizer
            onSwipeLeft={onSwipeLeft}
            onSwipeRight={onSwipeRight}
            className='w-full'>
            <ImageBackground
                source={Texture.paper}
                resizeMode="cover"
                className="w-full self-center  h-96  overflow-hidden bg-green-600"
            >
                <View
                    className="w-full h-full border-1 text-right border-black bg-black/40 justify-center gap-5   pb-10  ">

                    <View className="flex min-h-10 flex-row items-center gap-4 self-center">
                        {[...Array(3)].map((_, index) => (
                            <Animated.View
                                key={index}
                                className="h-2 w-2 rounded-full"
                                style={[animatedIndicator(index)]}
                            />
                        ))}
                    </View>
                    <Animated.View style={[animatedStyle]} className="flex flex-col gap-3 text-right pl-5 h-[200px] border-black">

                        <Text
                            className={` font-roboto-bold text-5xl text-left ${checkIfGreen(textSlides[index][0])} `}>
                            {cleanText(textSlides[index][0])}
                        </Text>
                        <Text
                            className={` font-roboto-bold text-5xl  text-left ${checkIfGreen(textSlides[index][1])} `}>
                            {cleanText(textSlides[index][1])}
                        </Text>

                        <Text
                            className={` font-roboto-bold text-5xl text-left ${checkIfGreen(textSlides[index][2])} `}>
                            {cleanText(textSlides[index][2])}
                        </Text>

                        <Text
                            className={` font-roboto-bold  text-left ${checkIfGreen(textSlides[index][3])} ${index === 1 ?" text-4xl" : "text-5xl"} `}>
                            {cleanText(textSlides[index][3])}
                        </Text>
                    </Animated.View>
                </View>
            </ImageBackground>

        </GestureRecognizer>
    )
}