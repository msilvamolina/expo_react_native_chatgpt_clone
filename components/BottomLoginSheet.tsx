import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Colors from '~/constants/Colors';
import { defaultStyles } from '~/constants/Styles';

const BottomLoginSheet = () => {
  const { bottom } = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: bottom }]}>
      <TouchableOpacity style={[defaultStyles.btn, styles.btnLight]}>
        <Ionicons name="logo-apple" size={24} style={styles.btnIcon} />
        <Text style={styles.btnLightText}>Continue with Apple</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[defaultStyles.btn, styles.btnDark]}>
        <Ionicons name="logo-google" size={24} style={styles.btnIcon} color="#fff" />
        <Text style={styles.btnDarkText}>Continue with Google</Text>
      </TouchableOpacity>
      <Link
        href={{
          pathname: '/login',
          params: {
            type: 'register',
          },
        }}
        asChild
        style={[defaultStyles.btn, styles.btnDark]}>
        <TouchableOpacity>
          <Ionicons name="mail" size={24} style={styles.btnIcon} color="#fff" />
          <Text style={styles.btnDarkText}>Sign up with Email</Text>
        </TouchableOpacity>
      </Link>
      <Link
        href={{
          pathname: '/login',
          params: {
            type: 'login',
          },
        }}
        asChild
        style={[defaultStyles.btn, styles.btnDark]}>
        <TouchableOpacity>
          <Text style={styles.btnDarkText}>Log in</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#000',
    padding: 26,
    gap: 14,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  btnLight: {
    backgroundColor: '#fff',
  },
  btnIcon: {
    paddingRight: 7,
  },
  btnLightText: {
    fontSize: 20,
  },
  btnDark: {
    backgroundColor: Colors.grey,
  },
  btnDarkText: {
    fontSize: 20,
    color: '#fff',
  },
  btnOutline: {
    borderWidth: 3,
    borderColor: Colors.grey,
  },
  btnOutlineText: {
    fontSize: 20,
    color: '#fff',
  },
});

export default BottomLoginSheet;
