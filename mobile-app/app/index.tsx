import { Link, Stack } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import { EnterUsername } from '~/components';
import { Button } from '~/components/Button';
import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';
import { useAppStore } from '~/lib/store';

export default function Home() {
  const sessionId = useAppStore((store) => store.id);

  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <Container>
        <View className="m-8 flex justify-center">
          {!sessionId && <EnterUsername />}
          {/* <ScreenContent path="app/index.tsx" title="Home" />

        <Link href={{ pathname: '/details', params: { name: 'Dan' } }} asChild>
          <Button title="Show Details" />
        </Link>
        <Link className="mt-4" href={{ pathname: '/chat', params: { name: 'Dan' } }} asChild>
          <Button title="Show Chat" />
        </Link> */}
        </View>
      </Container>
    </>
  );
}
