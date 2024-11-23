import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';

import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';

export default function Chat() {
  const { id } = useLocalSearchParams();
  return (
    <>
      <Stack.Screen options={{ title: `Room #${id}` }} />
      <Container>
        <ScreenContent path="screens/chat.tsx" title="Showing details for user" />
      </Container>
    </>
  );
}
