import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useRef, useState } from 'react';
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
import { useAppStore } from '~/lib/store';
import { Message } from '~/types';
import { generateGUID } from '~/utils';

export default function Chat() {
  const { id } = useLocalSearchParams();

  const getRoom = useAppStore((store) => store.getRoom);
  const getMessagesByRoom = useAppStore((store) => store.getMessagesByRoom);
  const appendNewMessage = useAppStore((store) => store.appendMessage);

  const room = getRoom(id as string);
  const sessionId = useAppStore((store) => store.id);
  const username = useAppStore((store) => store.username);

  const [input, setInput] = useState('');
  const flatListRef = useRef<FlatList<Message>>(null);

  const sendMessage = () => {
    if (input.trim().length > 0) {
      const newMessage: Message = {
        id: generateGUID(),
        username: username ?? '',
        userId: sessionId ?? '',
        message: input,
        date: new Date(),
        roomId: id as string,
      };

      appendNewMessage(newMessage);
      setInput('');

      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const renderItem = ({ item }: { item: Message }) => (
    <ChatBubble
      id={item.id}
      message={item.message}
      isMe={item.userId === sessionId}
      letter={username?.charAt(0) ?? ''}
    />
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
          data={getMessagesByRoom(id as string)}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 10 }}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />
        <View className="flex-row items-center border-t border-gray-300 bg-white p-3">
          <TextInput
            className="mr-3 h-10 flex-1 rounded-full border border-gray-400 px-4"
            placeholder="Escribe un mensaje..."
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity className="rounded-full bg-blue-500 px-4 py-2" onPress={sendMessage}>
            <Text className="text-sm text-white">Enviar</Text>
          </TouchableOpacity>
        </View>
      </Container>
    </KeyboardAvoidingView>
  );
}
