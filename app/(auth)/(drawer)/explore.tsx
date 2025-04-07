import { Ionicons } from '@expo/vector-icons';
import { Header, getHeaderTitle, useHeaderHeight } from '@react-navigation/elements';
import { BlurView } from 'expo-blur';
import Drawer from 'expo-router/drawer';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

import Colors from '~/constants/Colors';
const sections = [
  { title: 'Top Picks', label: 'Curated top picks from this week' },
  { title: 'Dall·E', label: 'Transform your ideas into amazing images' },
  {
    title: 'Writing',
    label: 'Enhance your writing with tools for creation, editing, and style refinement',
  },
  { title: 'Productivity', label: 'Increase your efficiency' },
  { title: 'Research & Analysis', label: 'Find, evaluate, interpret, and visualize information' },
  { title: 'Programming', label: 'Write code, debug, test, and learn' },
];

const Explore = () => {
  const headerHeight = useHeaderHeight();
  const [selected, setSelected] = useState(sections[0]);
  return (
    <View style={styles.container}>
      <Drawer.Screen
        options={{
          headerTransparent: true,
          headerBackground: () => (
            <BlurView
              intensity={60}
              tint="light"
              style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(256,256,256,0.5' }]}
            />
          ),
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 16 }}>
              <Ionicons name="search" size={24} color={Colors.grey} />
            </TouchableOpacity>
          ),
          header: ({ options, route }) => (
            <View>
              <Header {...options} title={getHeaderTitle(options, route.name)} />
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 8 }}>
                {sections.map((section, index) => (
                  <TouchableOpacity
                    key={index}
                    style={{ padding: 16 }}
                    onPress={() => setSelected(section)}>
                    <Text>{section.title}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          ),
        }}
      />
      <ScrollView contentContainerStyle={{ paddingTop: headerHeight }}>
        {Array.from({ length: 20 }).map((_, index) => (
          <View key={index} style={{ padding: 16, backgroundColor: 'red' }}>
            <Text>Text</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light,
  },
});

export default Explore;
