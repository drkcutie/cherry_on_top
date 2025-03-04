import { Text } from 'react-native';
import React from 'react';

interface User {
  firstName: string;
}

export default function HeyUser({ firstName }: User) {
  return (
    <>
      <Text className="self-start pl-2 font-montserrat-semi-bold text-3xl">
        Hey, {''}
        <Text className="self-start text-darthmouth">{firstName}!</Text>
      </Text>
    </>
  );
}
