import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Colors from '~/constants/Colors';
const PredefinedMessages = [
  { title: 'Explain React Native', text: "like I'm five years old" },
  { title: 'Suggest fun activites', text: 'for a family visiting San Francisco' },
  { title: 'Recommed a dish', text: "to impress a date who's a picky eater" },
];

type Props = {
  onSelectCard: (message: string) => void;
};

const MessageIdeas = ({ onSelectCard }: Props) => {
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          gap: 16,
          paddingVertical: 10,
        }}>
        {PredefinedMessages.map((message, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => onSelectCard(`${message.title} ${message.text}`)}>
            <Text>{message.title}</Text>
            <Text>{message.text}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.input,
    padding: 14,
    borderRadius: 10,
  },
});
export default MessageIdeas;
