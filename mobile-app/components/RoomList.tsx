import { Link } from 'expo-router';
import React from 'react';
import { Button, View, Image, Text, Pressable } from 'react-native';

export const RoomList = () => {
  return (
    <Link href={{ pathname: '/chat', params: { id: 'Dan' } }} asChild>
      <Pressable className="shadow-3xl dark:bg-navy-800 relative flex w-[350px] flex-col items-center rounded-[20px] bg-white p-4">
        <View className="relative flex h-32 w-full items-center justify-center overflow-hidden rounded-xl">
          <Image
            source={{
              uri: 'https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/banner.ef572d78f29b0fee0a09.png',
            }}
            className="absolute h-full w-full"
          />
          <View className="dark:border-navy-700 absolute flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400">
            <Image
              source={{
                uri: 'https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/avatar11.1060b63041fdffa5f8ef.png',
              }}
              className="h-full w-full rounded-full"
            />
          </View>
        </View>
        <View className="mt-16 flex flex-col items-center">
          <Text className="text-navy-700 text-xl font-bold dark:text-white">Room #1</Text>
        </View>
      </Pressable>
    </Link>
  );
};
