import React, { useCallback, useEffect } from 'react';
import { Button, FlatList, View } from 'react-native';

import { RoomItem } from './RoomItem';
import { StatusIndicator } from './StatusIndicator';

import useChat from '~/lib/hooks/useChat';
import useSocket from '~/lib/hooks/useSocket';
import { useAppStore } from '~/lib/store';
import { Room } from '~/types';

export const RoomList = () => {
  const rooms = useAppStore((store) => store.rooms);
  const resetSession = useAppStore((store) => store.resetSession);
  const { init, isConnected, disconnect } = useSocket();
  const { joinAllRooms, leaveAllRooms } = useChat();
  const username = useAppStore((store) => store.username);

  const renderPostItem = useCallback(({ item }: { item: Room }) => {
    return <RoomItem room={item} />;
  }, []);

  useEffect(() => {
    if (!isConnected) {
      init(username);
    }
    return () => {
      disconnect();
    };
  }, []);

  useEffect(() => {
    if (isConnected) {
      joinAllRooms();
    }
    return () => {
      leaveAllRooms();
    };
  }, [isConnected]);

  const renderHeader = useCallback(() => {
    return (
      <View className="flex flex-row items-center pb-4">
        <View className="w-1/2 items-start">
          <StatusIndicator isOnline={isConnected} />
        </View>
        <View className="w-1/2 items-end">
          <Button onPress={resetSession} title="Logout" />
        </View>
      </View>
    );
  }, [isConnected]);

  return (
    <FlatList
      ListHeaderComponent={renderHeader}
      data={rooms}
      keyExtractor={(item) => item.id}
      renderItem={renderPostItem}
    />
  );
};
