import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { ChatBubble, Container } from '~/components';
import useChat from '~/lib/hooks/useChat';
import { useAppStore } from '~/lib/store';
import { Message } from '~/types';

export default function Chat() {
  const { id } = useLocalSearchParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const allMessages = useAppStore((store) => store.messages);

  const getRoom = useAppStore((store) => store.getRoom);
  const getMessagesByRoom = useAppStore((store) => store.getMessagesByRoom);

  useEffect(() => {
    setMessages(getMessagesByRoom(id as string));
  }, [allMessages]);

  const { sendMessage } = useChat();

  const room = getRoom(id as string);
  const username = useAppStore((store) => store.username);
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      message: '',
    },
  });

  const onSubmit = ({ message }: { message: string }) => {
    if (message.trim().length > 0) {
      sendMessage(id as string, message);
      reset({ message: '' });
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const flatListRef = useRef<FlatList<Message>>(null);

  const renderItem = useCallback(
    ({ item }: { item: Message }) => (
      <ChatBubble
        id={item.id}
        message={item.message}
        isMe={item.user === username}
        letter={username?.charAt(0) ?? ''}
      />
    ),
    []
  );

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-gray-100"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90}>
      <Stack.Screen options={{ title: room?.name }} />
      <Container>
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.timestamp.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 10 }}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />
        <View className="flex-row items-center border-t border-gray-300 bg-white p-3">
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="mr-3 h-10 flex-1 rounded-full border border-gray-400 px-4"
                placeholder="Escribe un mensaje..."
                value={value}
                onChangeText={onChange}
              />
            )}
            name="message"
          />
          <TouchableOpacity
            className="rounded-full bg-blue-500 px-4 py-2"
            onPress={handleSubmit(onSubmit)}>
            <Text className="text-sm text-white">Enviar</Text>
          </TouchableOpacity>
        </View>
      </Container>
    </KeyboardAvoidingView>
  );
}
