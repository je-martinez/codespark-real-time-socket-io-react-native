import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';

import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';

export default function Chat() {
  const { name } = useLocalSearchParams();
  return (
    <>
      <Stack.Screen options={{ title: 'Chat' }} />
      <Container>
        <ScreenContent path="screens/details.tsx" title={`Showing details for user ${name}`} />
      </Container>
    </>
  );
}
