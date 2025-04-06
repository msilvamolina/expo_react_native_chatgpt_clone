import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Page = () => {
  const { url, prompt } = useLocalSearchParams<{ url: string; prompt?: string }>();
  const { bottom } = useSafeAreaInsets();

  const onCopyPrompt = () => {
    console.log('Copy prompt');
  };

  return (
    <View>
      <Text>Page</Text>
    </View>
  );
};

export default Page;
