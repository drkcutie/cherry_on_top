import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {Link, Tabs} from 'expo-router';
import {Pressable} from 'react-native';

import Colors from '@/constants/Colors';
import {useColorScheme} from '@/components/useColorScheme';
import {useClientOnlyValue} from '@/components/useClientOnlyValue';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import TabTwoScreen from "@/app/(tabs)/two";
import {House, Smartphone, Trophy, User, UserRound} from "lucide-react-native";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

export default function TabLayout() {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator screenOptions={{tabBarActiveTintColor: 'green', tabBarInactiveTintColor: 'white'}}>
            <Tab.Screen
                name="Feed"
                component={TabTwoScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({focused}) => (
                    <House color={focused ? 'green' : 'white'} />
                    ),
                }}
            />
            <Tab.Screen
                name="Socials"
                component={TabTwoScreen}
                options={{
                    tabBarLabel: 'Socials',
                    tabBarIcon: ({focused}) => (
                    <UserRound color={focused ? 'green' : 'white'} />
                    ),
                }}

            />
            <Tab.Screen
                name="Scan"
                component={TabTwoScreen}
                options={{
                    tabBarLabel: 'Scan',
                    tabBarIcon: ({focused}) => (
                    <Smartphone color={focused ? 'green' : 'white'} />
                    ),
                }}
            />
            <Tab.Screen
                name="Rewards"
                component={TabTwoScreen}
                options={{
                    tabBarLabel: 'Rewards',
                    tabBarIcon: ({focused}) => (
                    <Trophy color={focused ? 'green' : 'white'} />

                    ),
                }}
            />
            <Tab.Screen
                name="Account"
                component={TabTwoScreen}
                options={{
                    tabBarLabel: 'Account',
                    tabBarIcon: ({focused}) => (
                    <User color={focused ? 'green' : 'white'} />
            ),
                }}
            />
        </Tab.Navigator>
    );
}
