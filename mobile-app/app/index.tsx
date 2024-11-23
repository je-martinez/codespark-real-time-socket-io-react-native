import { Link, Stack } from 'expo-router';
import React, { useMemo } from 'react';
import { View } from 'react-native';

import { EnterUsername, RoomList } from '~/components';
import { Button } from '~/components/Button';
import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';
import { useAppStore } from '~/lib/store';

export default function Home() {
  const sessionId = useAppStore((store) => store.id);

  const title = useMemo(() => {
    return sessionId ? 'Home' : 'Enter Username';
  }, [sessionId]);

  return (
    <>
      <Stack.Screen options={{ title }} />
      <Container>
        <View className="m-8 flex justify-center">
          {!sessionId && <EnterUsername />}
          {sessionId && <RoomList />}
        </View>
      </Container>
    </>
  );
}
