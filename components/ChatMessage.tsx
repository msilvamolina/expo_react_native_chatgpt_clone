import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import { Message, Role } from '~/utils/interfaces';

const ChatMessage = ({ content, role, imageUrl, prompt }: Message) => {
  return (
    <View style={styles.row}>
      {role === Role.Bot ? (
        <View style={[styles.item]}>
          <Image source={require('~/assets/images/logo-white.png')} style={styles.avatarBot} />
        </View>
      ) : (
        <Image source={{ uri: 'http://galaxies.dev/img/meerkat_2.jpg' }} style={styles.avatar} />
      )}
      <Text style={styles.text}>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 14,
    gap: 14,
    marginVertical: 12,
  },
  item: {
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  avatarBot: {
    width: 20,
    height: 20,
    margin: 5,
    borderRadius: 15,
    backgroundColor: '#000',
  },
  btnImage: {
    margin: 6,
    width: 16,
    height: 16,
  },
  text: {
    padding: 4,
    fontSize: 16,
    flexWrap: 'wrap',
    flex: 1,
  },
});

export default ChatMessage;
