import { Tabs } from 'expo-router';
import { House, Users, Smartphone, Trophy, UserRound } from 'lucide-react-native';

const FOCUSED_COLOR = '#1D6742'; // green
const NOT_FOCUSED_COLOR = '#A3A3A3'; // neutral

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: FOCUSED_COLOR,
        tabBarInactiveTintColor: NOT_FOCUSED_COLOR,
        headerShown: false
      }}
    >
      {/* Home */}
      <Tabs.Screen
        name="home/index"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => <House color={focused ? FOCUSED_COLOR : NOT_FOCUSED_COLOR} />
        }}
      />
      {/* Socials */}
      <Tabs.Screen
        name="socials/index"
        options={{
          tabBarLabel: 'Socials',
          tabBarIcon: ({ focused }) => <Users color={focused ? FOCUSED_COLOR : NOT_FOCUSED_COLOR} />
        }}
      />
      {/* Scan */}
      <Tabs.Screen
        name="scan/index"
        options={{
          tabBarLabel: 'Scan',
          tabBarIcon: ({ focused }) => (
            <Smartphone color={focused ? FOCUSED_COLOR : NOT_FOCUSED_COLOR} />
          )
        }}
      />
      {/* Rewards */}
      <Tabs.Screen
        name="rewards/index"
        options={{
          tabBarLabel: 'Rewards',
          tabBarIcon: ({ focused }) => (
            <Trophy color={focused ? FOCUSED_COLOR : NOT_FOCUSED_COLOR} />
          )
        }}
      />
      {/* Account */}
      <Tabs.Screen
        name="account/index"
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({ focused }) => (
            <UserRound color={focused ? FOCUSED_COLOR : NOT_FOCUSED_COLOR} />
          )
        }}
      />
    </Tabs>
  );
}
