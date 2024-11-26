import { Stack } from 'expo-router';

import { SocketProvider } from '~/lib/store/providers';
import '../global.css';

export default function Layout() {
  return (
    <SocketProvider>
      <Stack />
    </SocketProvider>
  );
}
