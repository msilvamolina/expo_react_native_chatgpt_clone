import { useAuth } from '@clerk/clerk-react';
import { FlashList } from '@shopify/flash-list';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
} from 'react-native';

import ChatMessage from '~/components/ChatMessage';
import HeaderDropDown from '~/components/HeaderDropDown';
import MessageIdeas from '~/components/MessageIdeas';
import MessageInput from '~/components/MessageInput';
import Colors from '~/constants/Colors';
import { defaultStyles } from '~/constants/Styles';
import { Message, Role } from '~/utils/interfaces';

const DUMMY_MESSAGES: Message[] = [
  {
    content: 'Hello, how can I help you today?',
    role: Role.Bot,
  },
  {
    content:
      'I need help with muy React Native app. I need help with muy React Native app. I need help with muy React Native app. I need help with muy React Native app. I need help with muy React Native app. I need help with muy React Native app. I need help with muy React Native app. I need help with muy React Native app',
    role: Role.User,
  },
  {
    content: 'Hello, how can I help you today?',
    role: Role.Bot,
  },
  {
    content:
      'I need help with muy React Native app. I need help with muy React Native app. I need help with muy React Native app. I need help with muy React Native app. I need help with muy React Native app. I need help with muy React Native app. I need help with muy React Native app. I need help with muy React Native app',
    role: Role.User,
  },
  {
    content: 'Hello, how can I help you today?',
    role: Role.Bot,
  },
  {
    content:
      'I need help with muy React Native app. I need help with muy React Native app. I need help with muy React Native app. I need help with muy React Native app. I need help with muy React Native app. I need help with muy React Native app. I need help with muy React Native app. I need help with muy React Native app',
    role: Role.User,
  },
  {
    content: 'Hello, how can I help you today?',
    role: Role.Bot,
  },
  {
    content:
      'I need help with muy React Native app. I need help with muy React Native app. I need help with muy React Native app. I need help with muy React Native app. I need help with muy React Native app. I need help with muy React Native app. I need help with muy React Native app. I need help with muy React Native app',
    role: Role.User,
  },
  {
    content: 'Hello, how can I help you today?',
    role: Role.Bot,
  },
  {
    content:
      'I need help with muy React Native app. I need help with muy React Native app. I need help with muy React Native app. I need help with muy React Native app. I need help with muy React Native app. I need help with muy React Native app. I need help with muy React Native app. I need help with muy React Native app',
    role: Role.User,
  },
  {
    content: 'Hello, how can I help you today?',
    role: Role.Bot,
  },
  {
    content:
      'I need help with muy React Native app. I need help with muy React Native app. I need help with muy React Native app. I need help with muy React Native app. I need help with muy React Native app. I need help with muy React Native app. I need help with muy React Native app. I need help with muy React Native app',
    role: Role.User,
  },
  {
    content: 'Hello, how can I help you today?',
    role: Role.Bot,
  },
  {
    content:
      'I need help with muy React Native app. I need help with muy React Native app. I need help with muy React Native app. I need help with muy React Native app. I need help with muy React Native app. I need help with muy React Native app. I need help with muy React Native app. I need help with muy React Native app',
    role: Role.User,
  },
  {
    content: 'Hello, how can I help you today?',
    role: Role.Bot,
  },
  {
    content:
      'I need help with muy React Native app. I need help with muy React Native app. I need help with muy React Native app. I need help with muy React Native app. I need help with muy React Native app. I need help with muy React Native app. I need help with muy React Native app. I need help with muy React Native app',
    role: Role.User,
  },
  {
    content: 'Hello, how can I help you today?',
    role: Role.Bot,
  },
  {
    content:
      'I need help with muy React Native app. I need help with muy React Native app. I need help with muy React Native app. I need help with muy React Native app. I need help with muy React Native app. I need help with muy React Native app. I need help with muy React Native app. I need help with muy React Native app',
    role: Role.User,
  },
  {
    content: 'Hello, how can I help you today?',
    role: Role.Bot,
  },
  {
    content:
      'I need help with muy React Native app. I need help with muy React Native app. I need help with muy React Native app. I need help with muy React Native app. I need help with muy React Native app. I need help with muy React Native app. I need help with muy React Native app. I need help with muy React Native app',
    role: Role.User,
  },
  {
    content: 'Hello, how can I help you today?',
    role: Role.Bot,
  },
  {
    content:
      'I need help with muy React Native app. I need help with muy React Native app. I need help with muy React Native app. I need help with muy React Native app. I need help with muy React Native app. I need help with muy React Native app. I need help with muy React Native app. I need help with muy React Native app',
    role: Role.User,
  },
];
const Page = () => {
  const { signOut } = useAuth();
  const [gptVersion, setGPTVersion] = useState('3.5');
  const [messages, setMessages] = useState<Message[]>(DUMMY_MESSAGES);
  const [height, setHeight] = useState(0);

  const getCompletion = async (message: string) => {
    console.log('Getting completion for:', message);
  };

  const onLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;
    console.log('Height:', height);
    setHeight(height);
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
      <View style={{ flex: 1 }} onLayout={onLayout}>
        {messages.length === 0 && (
          <View style={[styles.logoContainer, { marginTop: height / 2 - 100 }]}>
            <Image source={require('~/assets/images/logo-white.png')} style={styles.image} />
            {/* <Text style={{ fontSize: 20, fontWeight: 'bold', color: Colors.grey }}>ChatGPT</Text> */}
          </View>
        )}
        <FlashList
          data={messages}
          renderItem={({ item }) => <ChatMessage {...item} />}
          estimatedItemSize={400}
          contentContainerStyle={{
            paddingBottom: 150,
            paddingTop: 30,
          }}
          keyboardDismissMode="on-drag"
        />
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

const styles = StyleSheet.create({
  logoContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    backgroundColor: '#000',
    borderRadius: 50,
  },
  image: {
    width: 30,
    height: 30,
    resizeMode: 'cover',
  },
});

export default Page;
