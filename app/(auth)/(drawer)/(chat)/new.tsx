import { useAuth } from '@clerk/clerk-react';
import { FlashList } from '@shopify/flash-list';
import { Redirect, Stack } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
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
import { useMMKVString } from 'react-native-mmkv';
import OpenAI from 'react-native-openai';

import ChatMessage from '~/components/ChatMessage';
import HeaderDropDown from '~/components/HeaderDropDown';
import MessageIdeas from '~/components/MessageIdeas';
import MessageInput from '~/components/MessageInput';
import Colors from '~/constants/Colors';
import { defaultStyles } from '~/constants/Styles';
import { Storage } from '~/utils/Storage';
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
];
const Page = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [height, setHeight] = useState(0);

  const [key, setKey] = useMMKVString('apiKey', Storage);
  const [organization, setOrganization] = useMMKVString('org', Storage);
  const [gptVersion, setGPTVersion] = useMMKVString('gptVersion', Storage);

  if (!key || key === '' || !organization || organization === '') {
    return <Redirect href="/(auth)/(modal)/settings" />;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const openAi = useMemo(() => new OpenAI({ apiKey: key, organization }), []);

  const getCompletion = async (message: string) => {
    console.log('Getting completion for:', message);
    if (message.length === 0) {
    }

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        content: message,
        role: Role.User,
      },
      { role: Role.Bot, content: '' },
    ]);

    openAi.chat.stream({
      messages: [
        {
          role: 'user',
          content: message,
        },
      ],
      model: gptVersion === '4' ? 'gpt-4' : 'gpt-3.5-turbo',
    });
  };

  const onLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;
    console.log('Height:', height);
    setHeight(height);
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const handleMessage = (payload: any) => {
      console.log('Received message:', payload);
      setMessages((messages) => {
        const newMessage = payload.choices[0].delta.content;

        if (newMessage) {
          messages[messages.length - 1].content += newMessage;
          return [...messages];
        }

        if (payload.choices[0]?.finishReason) {
          console.log('Stream ended');
        }
        return messages;
      });
    };

    openAi.chat.addListener('onChatMessageReceived', handleMessage);

    return () => {
      openAi.chat.removeListener('onChatMessageReceived');
    };
  }, [openAi]);

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
