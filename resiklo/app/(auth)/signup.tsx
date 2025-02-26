import {
    Text, View, TextInput, SafeAreaView, Pressable, Keyboard, TouchableWithoutFeedback
} from 'react-native';
import { useForm, Controller } from "react-hook-form";
import React, { useState } from 'react';
import { Eye, EyeOff, Lock, LucideMail } from "lucide-react-native";
import { Link } from "expo-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

// ✅ Define Zod schema for validation
const signUpSchema = z.object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirm_password: z.string()
}).refine(data => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
});

export default function SignUpScreen() {
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirm_password: ''
        }
    });

    const [passwordVisible, setPasswordIsNotVisible] = useState(true);
    const [confirmPasswordVisible, setConfirmPasswordNotVisible] = useState(true);

    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const handlePressIn = () => {
        scale.value = withSpring(0.95, { damping: 10, stiffness: 200 });
    };

    const handlePressOut = () => {
        scale.value = withSpring(1, { damping: 10, stiffness: 200 });
    };

    const onSubmit = (data: any) => {
        const validation = signUpSchema.safeParse(control);
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView className='m-auto flex flex-col justify-start items-center gap-20'>
                <Text className="font-montserrat-semi-bold text-3xl text-gray">
                    Signup to Resi{""}
                    <Text className="font-montserrat-semi-bold text-3xl text-darthmouth">klo</Text>
                </Text>

                <View className='flex flex-col gap-10'>
                    {/* First & Last Name Fields */}
                    <View className='flex flex-row gap-2'>
                        <View>
                            <Text className='text-black text-sm font-roboto-light mb-1'>First Name</Text>
                            <Controller
                                control={control}
                                name="firstName"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        className='border-gray-400 border rounded min-w-48 min-h-12 p-2'
                                    />
                                )}
                            />
                            {errors.firstName && <Text className="text-red-500">{errors.firstName.message}</Text>}
                        </View>

                        <View>
                            <Text className='text-black text-sm font-roboto-light mb-1'>Last Name</Text>
                            <Controller
                                control={control}
                                name="lastName"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        className='border border-gray-400 rounded min-w-48 min-h-12 p-2'
                                    />
                                )}
                            />
                            {errors.lastName && <Text className="text-red-500 mt-2">{errors.lastName.message}</Text>}
                        </View>
                    </View>

                    {/* Email Field */}
                    <View>
                        <Text className='text-black text-sm font-roboto-light mb-1'>Email</Text>
                        <View className="flex-row items-center border border-jet rounded min-w-48 min-h-12">
                            <View className="border-r-2 border-gray-500 p-3">
                                <LucideMail color={"#2E2E2E"} size={20}/>
                            </View>
                            <Controller
                                control={control}
                                name="email"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        className="border-gray-400 flex-1 text-base text-black p-2"
                                    />
                                )}
                            />
                        </View>
                        {errors.email && <Text className="text-red-500 mt-2">{errors.email.message}</Text>}
                    </View>

                    {/* Password Field */}
                    <View>
                        <Text className='text-black text-sm font-roboto-light mb-1'>Password</Text>
                        <View className="flex-row items-center border border-jet rounded min-w-48 min-h-12">
                            <View className="border-r-2 border-gray-500 p-3">
                                <Lock color={"#2E2E2E"} size={20}/>
                            </View>
                            <Controller
                                control={control}
                                name="password"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        className="flex-1 text-base text-black p-2"
                                        secureTextEntry={passwordVisible}
                                    />
                                )}
                            />
                            <Pressable
                                onPress={() => setPasswordIsNotVisible(!passwordVisible)}
                                className="self-center p-2"
                            >
                                {passwordVisible ? <Eye color={"#2E2E2E"} size={20}/> : <EyeOff color={"#2E2E2E"} size={20}/>}
                            </Pressable>
                        </View>
                        {errors.password && <Text className="text-red-500 mt-2">{errors.password.message}</Text>}
                    </View>

                    {/* Confirm Password Field */}
                    <View>
                        <Text className='text-black text-sm font-roboto-light mb-1'>Confirm Password</Text>
                        <View className="flex-row items-center border border-jet rounded min-w-48 min-h-12">
                            <View className="border-r-2 border-gray-500 p-3">
                                <Lock color={"#2E2E2E"} size={20}/>
                            </View>
                            <Controller
                                control={control}
                                name="confirm_password"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        className="flex-1 text-base text-black p-2"
                                        secureTextEntry={confirmPasswordVisible}
                                    />
                                )}
                            />
                            <Pressable
                                onPress={() => setConfirmPasswordNotVisible(!confirmPasswordVisible)}
                                className="self-center p-2"
                            >
                                {confirmPasswordVisible ? <Eye color={"#2E2E2E"} size={20}/> : <EyeOff color={"#2E2E2E"} size={20}/>}
                            </Pressable>
                        </View>
                        {errors.confirm_password && <Text className="text-red-500 mt-2">{errors.confirm_password.message}</Text>}
                    </View>

                    <Animated.View style={animatedStyle}>
                        <Pressable
                            onPressIn={handlePressIn}
                            onPressOut={handlePressOut}
                            onPress={handleSubmit(onSubmit)}
                            className="self-center rounded-full bg-darthmouth pl-12 pr-12 p-5"
                        >
                            <Text className="text-white text-2xl font-montserrat-medium">Create Account</Text>
                        </Pressable>
                    </Animated.View>

                    <Text className='self-center'>
                        Already have an account? {" "}
                        <Link href={"/(auth)/login"} className='font-darthmouth'>
                            <Text className='text-darthmouth font-bold'>Login</Text>
                        </Link>
                    </Text>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}
