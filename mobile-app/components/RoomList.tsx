import React, { useCallback } from 'react';
import { Button, FlatList, View } from 'react-native';

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
      <View className="flex flex-row items-center justify-end pb-4">
        <Button onPress={resetSession} title="Logout" />
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
