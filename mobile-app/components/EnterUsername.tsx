import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text, TextInput, View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

import { Button } from './Button';

import { useAppStore } from '~/lib/store';

type UsernameForm = {
  username: string | undefined;
};

export const EnterUsername = () => {
  const setAuthSession = useAppStore((store) => store.setAuthSession);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UsernameForm>({
    defaultValues: {
      username: undefined,
    },
  });

  const onSubmit = (data: UsernameForm) => setAuthSession(data.username!);

  return (
    <>
      <View className="relative">
        <View className="absolute right-0 mt-8 h-6 w-6">
          <Svg
            className="h-6 w-6 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <Path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </Svg>
        </View>
        <Text className="text-sm font-bold tracking-wide text-gray-700">Username</Text>
        <Controller
          control={control}
          rules={{
            required: true,
            minLength: 3,
            maxLength: 20,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                placeholder="Add your username"
                className=" w-full border-b border-gray-300 py-4 focus:border-indigo-500 focus:outline-none"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            </>
          )}
          name="username"
        />
        {errors.username && <Text className="mt-4 text-red-500">This is a required field</Text>}
        <Button className="mt-8" title="Enter" onPress={handleSubmit(onSubmit)} />
      </View>
    </>
  );
};
