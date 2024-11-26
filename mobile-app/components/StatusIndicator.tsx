import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

interface Props {
  isOnline?: boolean;
}

export const StatusIndicator = ({ isOnline = false }: Props) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (isOnline) {
      const interval = setInterval(() => {
        setIsVisible((prev) => !prev);
      }, 500);
      return () => clearInterval(interval);
    } else {
      setIsVisible(true);
    }
  }, [isOnline]);

  return (
    <View className="flex-row items-center gap-4 space-x-2">
      <View
        className={`h-4 w-4 rounded-full ${
          isOnline ? (isVisible ? 'bg-green-500' : 'bg-transparent') : 'bg-red-500'
        }`}
      />
      <Text className="text-base font-medium">{isOnline ? 'Connected' : 'Disconnected'}</Text>
    </View>
  );
};
