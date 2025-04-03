import { Stack } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';

import HeaderDropDown from '~/components/HeaderDropDown';
import { defaultStyles } from '~/constants/Styles';

const Dalle = () => {
  return (
    <View style={defaultStyles.pageContainer}>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <HeaderDropDown
              title="Dall-E"
              onSelect={(key) => {}}
              // selected={gptVersion}
              items={[
                { key: 'share', title: 'Share GPT', icon: 'square.and.arrow.up' },
                { key: 'details', title: 'See Details', icon: 'info.circle' },
                { key: 'keep', title: 'Keep in Sidebar', icon: 'pin' },
              ]}
            />
          ),
        }}
      />
      <Text>Dalle</Text>
    </View>
  );
};

export default Dalle;
