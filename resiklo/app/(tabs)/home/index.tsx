import { useEffect, useState } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { supabase } from '@/lib/supabase';

export default function HomeScreen() {
  // Testing if login works
  const [userEmail, setUserEmail] = useState('');
  useEffect(() => {
    const setEmail = async () => {
      const { data: user } = await supabase.auth.getUser();

      if (user.user?.email) {
        setUserEmail(user.user.email);
      }
    };

    setEmail();
  }, []);

  return (
    <SafeAreaView>
      <Text>This is the Home Screen</Text>
      <Text>This is your email: {userEmail}</Text>
    </SafeAreaView>
  );
}
