import { useAuth } from '@clerk/clerk-react';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { View, Text, Button, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

import HeaderDropDown from '~/components/HeaderDropDown';
import MessageIdeas from '~/components/MessageIdeas';
import MessageInput from '~/components/MessageInput';
import { defaultStyles } from '~/constants/Styles';
import { Message, Role } from '~/utils/interfaces';

const DUMMY_MESSAGES: Message[] = [
  {
    content: 'Hello, how are you?',
    role: Role.Bot,
  },
  {
    content: 'I need help with muy React Native app',
    role: Role.User,
  },
];
const Page = () => {
  const { signOut } = useAuth();
  const [gptVersion, setGPTVersion] = useState('3.5');
  const [messages, setMessages] = useState<Message[]>(DUMMY_MESSAGES);

  const getCompletion = async (message: string) => {
    console.log('Getting completion for:', message);
  };
  return (
    <View style={defaultStyles.pageContainer}>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <HeaderDropDown
              title="ChatGPT"
              onSelect={(key) => {
                setGPTVersion(key);
              }}
              selected={gptVersion}
              items={[
                { key: '3.5', title: 'GPT-3.5', icon: 'bolt' },
                { key: '4', title: 'GPT-4', icon: 'sparkles' },
              ]}
            />
          ),
        }}
      />
      <View style={{ flex: 1 }}>
        <Text>Hola</Text>
      </View>
      <KeyboardAvoidingView
        keyboardVerticalOffset={70}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
        }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {messages.length === 0 && <MessageIdeas onSelectCard={getCompletion} />}
        <MessageInput onShouldSendMessage={getCompletion} />
      </KeyboardAvoidingView>
    </View>
  );
};

export default Page;
