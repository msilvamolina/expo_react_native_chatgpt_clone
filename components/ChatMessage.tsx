import React from 'react';
import { View, Text } from 'react-native';

import { Message } from '~/utils/interfaces';

const ChatMessage = ({ content, role, imageUrl, prompt }: Message) => {
  return (
    <View>
      <Text>ChatMessage</Text>
    </View>
  );
};

export default ChatMessage;
