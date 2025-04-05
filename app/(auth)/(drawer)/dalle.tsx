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

// const dummyMessages = [
//   {
//     role: Role.Bot,
//     content: '',
//     imageUrl: 'https://galaxies.dev/img/meerkat_2.jpg',
//     prompt:
//       'A meerkat astronaut in a futuristic spacesuit, standing upright on a rocky, alien landscape resembling the surface of Mars. The spacesuit is highly detailed with reflective visor and intricate life-support systems. The background shows a distant starry sky and a small Earth visible in the far horizon. The meerkat looks curious and brave, embodying the spirit of exploration.',
//   },
//   {
//     role: Role.Bot,
//     loading: true,
//   },
// ];
const Page = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [height, setHeight] = useState(0);

  const [key, setKey] = useMMKVString('apiKey', Storage);
  const [organization, setOrganization] = useMMKVString('org', Storage);
  const [gptVersion, setGPTVersion] = useMMKVString('gptVersion', Storage);

  const [working, setWorking] = useState(false);

  if (!key || key === '' || !organization || organization === '') {
    return <Redirect href="/(auth)/(modal)/settings" />;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const openAi = useMemo(() => new OpenAI({ apiKey: key, organization }), []);

  const getCompletion = async (message: string) => {
    setWorking(true);

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        content: message,
        role: Role.User,
      },
    ]);

    const result = await openAi.image.create({
      prompt: message,
    });
    console.log('Result:', result);
    if (result.data && result.data.length > 0) {
      const imageUrl = result.data[0].url;
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: Role.Bot,
          content: '',
          imageUrl,
          prompt: message,
        },
      ]);
    }
    setWorking(false);
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
              title="Dall·E"
              items={[
                { key: 'share', title: 'Share GPT', icon: 'square.and.arrow.up' },
                { key: 'details', title: 'See Details', icon: 'info.circle' },
                { key: 'keep', title: 'Keep in Sidebar', icon: 'pin' },
              ]}
              onSelect={() => {}}
            />
          ),
        }}
      />
      <View style={{ flex: 1 }} onLayout={onLayout}>
        {messages?.length === 0 && (
          <View style={{ marginTop: height / 2 - 100, alignItems: 'center', gap: 16 }}>
            <View style={[styles.logoContainer]}>
              <Image source={require('~/assets/images/dalle.png')} style={styles.image} />
            </View>
            <Text style={styles.label}>Let me turn your imagination into imagery.</Text>
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
          ListFooterComponent={
            <>{working && <ChatMessage {...{ role: Role.Bot, content: '', loading: true }} />}</>
          }
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
        <MessageInput onShouldSendMessage={getCompletion} />
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    color: Colors.grey,
    fontSize: 16,
  },
  logoContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    backgroundColor: '#000',
    borderRadius: 50,
    overflow: 'hidden',
    borderColor: Colors.greyLight,
    borderWidth: 1,
  },
  image: {
    resizeMode: 'cover',
  },
});

export default Page;
