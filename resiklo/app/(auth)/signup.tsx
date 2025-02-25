import {Text, View, TextInput, Button, Alert, SafeAreaView, Pressable} from 'react-native';
import {useForm, Controller} from "react-hook-form";
import React, {useState} from 'react';
import {Eye, Lock, LucideMail} from "lucide-react-native";
import ForgotPassword from "@/app/(auth)/forgot-password";
import {Link} from "expo-router";

export default function SignUpScreen() {
    const {control, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirm_password: ''
        }
    });
    const [passwordVisible, setPasswordIsNotVisible] = useState(true)

    const [confirmPasswordVisible, setConfirmPasswordNotVisible] = useState(true)

    const onSubmit = (data: any) => {
        console.log(data.firstName)
        console.log(data.lastName)
    }


    return (
        <SafeAreaView className='m-auto flex flex-col justify-start  items-center gap-20 '>

            <Text className="font-montserrat-semi-bold text-3xl text-gray">Signup to Resi{""}
                <Text className="font-montserrat-semi-bold text-3xl text-darthmouth">klo</Text>
            </Text>
            <View className='flex flex-col gap-10'>
                <View className='flex flex-row gap-2'>
                    <View>
                        <Text className='text-black text-sm font-roboto-light mb-1'>First Name</Text>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({field: {onChange, onBlur, value}}) => (
                                <TextInput
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    className=' border-jet  border rounded  min-w-48 min-h-12 p-2'
                                />
                            )}
                            name="firstName"
                        />
                        {errors.firstName && <Text>This is required.</Text>}
                    </View>

                    <View>
                        <Text className='text-black text-sm font-roboto-light mb-1'>Last Name</Text>
                        <Controller
                            control={control}
                            rules={{
                                maxLength: 100,
                            }}
                            render={({field: {onChange, onBlur, value}}) => (
                                <TextInput
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    className='border border-jet rounded  min-w-48 min-h-12 p-2'
                                />
                            )}
                            name="lastName"
                        />

                    </View>
                </View>
                <View>
                    <Text className='text-black text-sm font-roboto-light mb-1'>Email</Text>
                    <View className="grid grid-rows-2">
                        <View className="flex-row items-center border border-jet rounded min-w-48 min-h-12 ">
                            <View className="border-r-2 border-gray-500 p-3">
                                <LucideMail color={"#2E2E2E"} size={20}/>
                            </View>
                            <Controller
                                control={control}
                                rules={{maxLength: 100}}
                                render={({field: {onChange, onBlur, value}}) => (
                                    <TextInput
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        className="flex-1 text-base text-black p-2"
                                    />
                                )}
                                name="email"
                            />
                        </View>
                    </View>


                </View>
                <View>
                    <Text className='text-black text-sm font-roboto-light mb-1'>Password</Text>
                    <View className="grid grid-rows-2">
                        <View className="flex-row items-center border border-jet rounded min-w-48 min-h-12 ">
                            <View className="border-r-2 border-gray-500 p-3">
                                <Lock color={"#2E2E2E"} size={20}/>
                            </View>
                            <Controller
                                control={control}
                                rules={{maxLength: 100}}
                                render={({field: {onChange, onBlur, value}}) => (
                                    <TextInput
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        className="flex-1 text-base text-black p-2"
                                        placeholder=""
                                        secureTextEntry={passwordVisible}
                                    />
                                )}
                                name="password"
                            />
                            <Pressable onPressIn={() => setPasswordIsNotVisible(false)}
                                       onPressOut={() => setPasswordIsNotVisible(true)}

                                       className="self-center p-2">
                                <Eye color={"#2E2E2E"} size={20}/>
                            </Pressable>

                        </View>
                    </View>
                </View>
                <View>
                    <Text className='text-black text-sm font-roboto-light mb-1'>Confirm Password</Text>
                    <View className="grid grid-rows-2">
                        <View className="flex-row items-center border border-jet rounded min-w-48 min-h-12 ">
                            <View className="border-r-2 border-gray-500 p-3">
                                <Lock color={"#2E2E2E"} size={20}/>
                            </View>
                            <Controller
                                control={control}
                                rules={{maxLength: 100}}
                                render={({field: {onChange, onBlur, value}}) => (
                                    <TextInput
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        className="flex-1 text-base text-black p-2"
                                        placeholder=""
                                        secureTextEntry={confirmPasswordVisible}
                                    />
                                )}
                                name="confirm_password"
                            />
                            <Pressable onPressIn={() => setConfirmPasswordNotVisible(false)}
                                       onPressOut={() => setConfirmPasswordNotVisible(true)}
                                       className="self-center p-2">
                                <Eye color={"#2E2E2E"} size={20}/>
                            </Pressable>
                        </View>
                    </View>
                </View>
                <Pressable onPress={handleSubmit(onSubmit)}
                           className='self-center rounded-full  bg-darthmouth pl-12 pr-12 p-5   '>
                    <Text className='text-white text-2xl font-montserrat-medium'>Create Account</Text>
                </Pressable>
                <Text className='self-center'>
                    Already have an account? {" "}
                    <Link href={"/(auth)/login"} className='font-darthmouth'>
                       <Text className='text-darthmouth font-bold'>Login</Text>
                </Link>
                </Text>

            </View>
        </SafeAreaView>

    );
}
