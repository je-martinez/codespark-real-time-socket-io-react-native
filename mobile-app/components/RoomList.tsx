import React, { useCallback } from 'react';
import { Button, FlatList, View } from 'react-native';

import { StatusIndicator } from './StatusIndicator';
import { RoomItem } from './RoomItem';

import { useAppStore } from '~/lib/store';
import { Room } from '~/types';

export const RoomList = () => {
  const rooms = useAppStore((store) => store.rooms);
  const resetSession = useAppStore((store) => store.resetSession);

  const renderPostItem = useCallback(({ item }: { item: Room }) => {
    return <RoomItem room={item} />;
  }, []);

  const renderHeader = useCallback(() => {
    return (
      <View className="flex flex-row items-center pb-4">
        <View className="w-1/2 items-start">
          <StatusIndicator isOnline={true} />
        </View>
        <View className="w-1/2 items-end">
          <Button onPress={resetSession} title="Logout" />
        </View>
      </View>
    );
  }, []);

  return (
    <FlatList
      ListHeaderComponent={renderHeader}
      data={rooms}
      keyExtractor={(item) => item.id}
      renderItem={renderPostItem}
    />
  );
};
