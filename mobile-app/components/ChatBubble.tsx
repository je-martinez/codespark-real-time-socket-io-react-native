import React from 'react';
import { Text, View } from 'react-native';

type Props = {
  id: string;
  letter: string;
  message: string;
  isMe: boolean;
};

export const ChatBubble = ({ letter, message, isMe }: Props) => {
  return (
    <>
      <View className="rounded-lg py-3">
        <View className={`flex flex-row items-center ${!isMe ? '' : 'flex-row-reverse'}`}>
          <View className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500">
            <Text>{letter}</Text>
          </View>
          <View
            className={`relative ${!isMe ? 'ml-3' : 'mr-3'} rounded-xl bg-white px-4 py-2 text-sm shadow`}>
            <Text>{message}</Text>
          </View>
        </View>
      </View>
    </>
  );
};
