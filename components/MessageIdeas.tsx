import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
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
      <Text>MessageIdeas</Text>
    </View>
  );
};

const styles = StyleSheet.create({});
export default MessageIdeas;
