import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';

import Colors from '~/constants/Colors';

const Layout = () => {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(modal)/settings"
        options={{
          headerTitle: 'Settings',
          presentation: 'modal',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.selected },
          headerRight: () => (
            <>
              {router.canGoBack() && (
                <TouchableOpacity
                  onPress={() => router.back()}
                  style={{ backgroundColor: Colors.greyLight, borderRadius: 20, padding: 6 }}>
                  <Ionicons name="close-outline" size={16} color="#fff" />
                </TouchableOpacity>
              )}
            </>
          ),
        }}
      />
      <Stack.Screen
        name="(modal)/[url]"
        options={{
          headerTitle: '',
          presentation: 'fullScreenModal',
          headerShadowVisible: false,
          headerBlurEffect: 'dark',
          headerStyle: { backgroundColor: 'rgba(0,0,0,0.4)' },
          headerLeft: () => (
            <>
              {router.canGoBack() && (
                <TouchableOpacity
                  onPress={() => router.back()}
                  style={{ borderRadius: 20, padding: 6 }}>
                  <Ionicons name="close-outline" size={16} color="#fff" />
                </TouchableOpacity>
              )}
            </>
          ),
        }}
      />
    </Stack>
  );
};

export default Layout;
