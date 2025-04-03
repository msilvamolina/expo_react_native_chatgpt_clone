// import { FontAwesome6, Ionicons } from '@expo/vector-icons';
// import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
// import { DrawerActions } from '@react-navigation/native';
import { FontAwesome, FontAwesome6, Ionicons } from '@expo/vector-icons';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import { Link, useNavigation, useNavigationContainerRef, useRouter } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import {
  TextInput,
  Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
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
      <DrawerItem
        label="Dall-E"
        icon={({ color, size }) => (
          <View style={[styles.item, { backgroundColor: '#000' }]}>
            <Image source={require('~/assets/images/dalle.png')} style={styles.dalleEImage} />
          </View>
        )}
        onPress={() => router.push('/(auth)/(drawer)/dalle')}
      />
      <DrawerItem
        label="Explore GPTs"
        icon={({ color, size }) => (
          <View style={[styles.exploreItem]}>
            <Ionicons name="apps-outline" size={18} color="#000" s />
          </View>
        )}
        onPress={() => router.push('/(auth)/(drawer)/explore')}
      />
    </DrawerContentScrollView>
  );
}
const Layout = () => {
  const navigationRef = useNavigationContainerRef();
  const dimensions = useWindowDimensions();
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigationRef.dispatch(DrawerActions.toggleDrawer)}
            style={{ marginLeft: 16 }}>
            <FontAwesome6 name="grip-lines" size={20} color={Colors.grey} />
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: Colors.light,
        },
        headerShadowVisible: false,
        drawerActiveBackgroundColor: Colors.selected,
        drawerActiveTintColor: '#000',
        drawerInactiveTintColor: '#000',
        drawerItemStyle: { borderRadius: 12 },
        drawerLabelStyle: { marginLeft: -20 },
        overlayColor: 'rgba(0,0,0,0.2)',
        drawerStyle: { width: dimensions.width * 0.86 },
      }}>
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
      <Drawer.Screen
        name="dalle"
        options={{
          title: 'Dall-E',
        }}
      />
      <Drawer.Screen
        name="explore"
        options={{
          title: 'Explore GPTs',
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
  dalleEImage: {
    width: 28,
    height: 28,
    resizeMode: 'cover',
  },
  exploreItem: {
    borderRadius: 15,
    backgroundColor: '#fff',
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Layout;
