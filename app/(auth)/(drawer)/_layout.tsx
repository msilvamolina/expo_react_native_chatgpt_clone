// import { FontAwesome6, Ionicons } from '@expo/vector-icons';
// import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
// import { DrawerActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Link, useNavigation, useRouter } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { TextInput, Text, Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import NewChat from './(chat)/new';

import Colors from '~/constants/Colors';

export function CustomDrawerContent(props: any) {
  const router = useRouter();

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label="ChatGPT"
        icon={({ color, size }) => (
          <View style={[styles.item, { backgroundColor: '#000' }]}>
            <Image source={require('~/assets/images/logo-white.png')} style={styles.btnImage} />
          </View>
        )}
        onPress={() => router.push('/(auth)/(drawer)/(chat)/new')}
      />
      <DrawerItem label="Explorar" onPress={() => router.push('/(auth)/(drawer)/explore')} />
    </DrawerContentScrollView>
  );
}
const Layout = () => {
  return (
    <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="(chat)/new"
        getId={() => Math.random().toString()}
        options={{
          title: 'ChagGPT',
          headerRight: () => (
            <Link href="/(auth)/(drawer)/(chat)/new" push asChild>
              <TouchableOpacity>
                <Ionicons
                  name="create-outline"
                  size={24}
                  color={Colors.grey}
                  style={{ marginRight: 16 }}
                />
              </TouchableOpacity>
            </Link>
          ),
        }}
      />
    </Drawer>
  );
};

const styles = StyleSheet.create({
  item: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  btnImage: {
    margin: 6,
    width: 16,
    height: 16,
  },
});

export default Layout;
