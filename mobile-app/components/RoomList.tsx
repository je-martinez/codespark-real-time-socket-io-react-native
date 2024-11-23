import React, { useCallback } from 'react';
import { FlatList } from 'react-native';

import { RoomItem } from './RoomItem';

import { useAppStore } from '~/lib/store';
import { Room } from '~/types';

export const RoomList = () => {
  const rooms = useAppStore((store) => store.rooms);

  const renderPostItem = useCallback(({ item }: { item: Room }) => {
    return <RoomItem room={item} />;
  }, []);

  return <FlatList data={rooms} keyExtractor={(item) => item.id} renderItem={renderPostItem} />;
};
