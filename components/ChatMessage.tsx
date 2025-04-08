import { Link } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, Pressable } from 'react-native';
import * as ContextMenu from 'zeego/context-menu';

import Colors from '~/constants/Colors';
import { copyImageToClipboard, downloadAndSaveImage, shareImage } from '~/utils/Image';
import { Message, Role } from '~/utils/interfaces';

const ChatMessage = ({
  content,
  role,
  imageUrl,
  prompt,
  loading,
}: Message & { loading?: boolean }) => {
  const isUser = role === Role.User;

  const contextItems = [
    { title: 'Copy', systemIcon: 'doc.on.doc', action: () => copyImageToClipboard(imageUrl!) },
    {
      title: 'Save to Photos',
      systemIcon: 'arrow.down.to.line',
      action: () => downloadAndSaveImage(imageUrl!),
    },
    { title: 'Share', systemIcon: 'square.and.arrow.up', action: () => shareImage(imageUrl!) },
  ];

  return (
    <View style={[styles.row, { justifyContent: isUser ? 'flex-end' : 'flex-start' }]}>
      {!isUser && (
        <Image source={require('~/assets/images/logo-white.png')} style={styles.avatar} />
      )}

      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator color={Colors.primary} />
        </View>
      ) : (
        <View style={[styles.bubble, isUser ? styles.userBubble : styles.botBubble]}>
          {content === '' && imageUrl ? (
            <ContextMenu.Root>
              <ContextMenu.Trigger>
                <Link
                  href={`/(auth)/(modal)/${encodeURIComponent(imageUrl)}?prompt=${encodeURIComponent(prompt!)}`}
                  asChild>
                  <Pressable>
                    <Image source={{ uri: imageUrl }} style={styles.previewImage} />
                  </Pressable>
                </Link>
              </ContextMenu.Trigger>
              <ContextMenu.Content>
                {contextItems.map((item) => (
                  <ContextMenu.Item key={item.title} onSelect={item.action}>
                    <ContextMenu.ItemTitle>{item.title}</ContextMenu.ItemTitle>
                    <ContextMenu.ItemIcon ios={{ name: item.systemIcon, pointSize: 18 }} />
                  </ContextMenu.Item>
                ))}
              </ContextMenu.Content>
            </ContextMenu.Root>
          ) : (
            <Text style={[styles.text, isUser ? styles.userText : styles.botText]}>{content}</Text>
          )}
        </View>
      )}

      {isUser && (
        <Image source={{ uri: 'http://galaxies.dev/img/meerkat_2.jpg' }} style={styles.avatar} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 14,
    marginVertical: 6,
    gap: 8,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#000',
  },
  bubble: {
    maxWidth: '75%',
    borderRadius: 16,
    padding: 10,
  },
  userBubble: {
    backgroundColor: '#007AFF',
    borderTopRightRadius: 0,
  },
  botBubble: {
    backgroundColor: '#E5E5EA',
    borderTopLeftRadius: 0,
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
  },
  userText: {
    color: '#fff',
  },
  botText: {
    color: '#000',
  },
  previewImage: {
    width: 240,
    height: 240,
    borderRadius: 10,
  },
  loading: {
    justifyContent: 'center',
    height: 26,
    marginLeft: 14,
  },
});

export default ChatMessage;
