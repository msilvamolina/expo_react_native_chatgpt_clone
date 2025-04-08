import { FontAwesome, FontAwesome6, Ionicons } from '@expo/vector-icons';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  useDrawerStatus,
} from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import { Link, useNavigation, useNavigationContainerRef, useRouter } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import {
  TextInput,
  Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  Keyboard,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as ContextMenu from 'zeego/context-menu';

import NewChat from './(chat)/new';

import Colors from '~/constants/Colors';
import { deleteChat, getChats, renameChat } from '~/utils/Database';
import { Chat } from '~/utils/interfaces';

export function CustomDrawerContent(props: any) {
  const { bottom, top } = useSafeAreaInsets();
  const isDrawerOpen = useDrawerStatus() === 'open';
  const [history, setHistory] = useState<Chat[]>([]);
  const db = useSQLiteContext();
  const router = useRouter();

  useEffect(() => {
    if (isDrawerOpen) {
      loadChats();
    }
    Keyboard.dismiss();
  }, [isDrawerOpen]);

  const loadChats = async () => {
    const result = await getChats(db);
    setHistory(result);
  };

  const onDeleteChat = async (id: number) => {
    Alert.alert('Delete Chat', 'Are you sure you want to delete this chat?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await deleteChat(db, id);
          loadChats();
        },
      },
    ]);
  };

  const onRenameChat = async (id: number) => {
    Alert.prompt('Rename Chat', 'Enter a new name for the chat:', async (newName) => {
      if (newName) {
        await renameChat(db, id, newName);
        loadChats();
      }
    });
  };
  return (
    <View style={{ flex: 1, marginTop: top }}>
      <View style={{ backgroundColor: '#fff' }}>
        <View style={styles.searchSection}>
          <Ionicons style={styles.searchIcon} name="search" size={20} color={Colors.greyLight} />
          <TextInput
            placeholder="Search"
            style={styles.input}
            underlineColorAndroid="transparent"
          />
        </View>
      </View>
      <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
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

        {history.map((chat) => (
          <ContextMenu.Root key={chat.id}>
            <ContextMenu.Trigger>
              <DrawerItem
                key={chat.id}
                label={chat.title}
                onPress={() => router.push(`/(auth)/(drawer)/(chat)/${chat.id}`)}
              />
            </ContextMenu.Trigger>
            <ContextMenu.Content>
              <ContextMenu.Preview>
                {() => (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 16,
                      height: 200,
                      width: 250,
                      backgroundColor: '#fff',
                    }}>
                    <Text>{chat.title}</Text>
                  </View>
                )}
              </ContextMenu.Preview>
              <ContextMenu.Item key="rename" onSelect={() => onRenameChat(chat.id)}>
                <ContextMenu.ItemTitle>Rename</ContextMenu.ItemTitle>
                <ContextMenu.ItemIcon ios={{ name: 'pencil', pointSize: 18 }} />
              </ContextMenu.Item>
              <ContextMenu.Item key="delete" onSelect={() => onDeleteChat(chat.id)}>
                <ContextMenu.ItemTitle>Delete</ContextMenu.ItemTitle>
                <ContextMenu.ItemIcon ios={{ name: 'trash', pointSize: 18 }} />
              </ContextMenu.Item>
            </ContextMenu.Content>
          </ContextMenu.Root>
        ))}
      </DrawerContentScrollView>

      <View style={{ padding: 16, paddingBottom: bottom }}>
        <Link href="/(auth)/(modal)/settings" asChild>
          <TouchableOpacity style={styles.footer}>
            <Image
              source={{ uri: 'https://galaxies.dev/img/meerkat_2.jpg' }}
              style={styles.avatar}
            />
            <Text style={styles.userName}>Mika Meerkat</Text>
            <Ionicons name="ellipsis-horizontal" size={24} color={Colors.greyLight} />

            {/* <Text style={{ color: Colors.grey }}>Version 1.0.0</Text> */}
          </TouchableOpacity>
        </Link>
      </View>
    </View>
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
      <Drawer.Screen
        name="(chat)/[id]"
        options={{
          drawerItemStyle: {
            display: 'none',
          },
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
  searchSection: {
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.input,
    borderRadius: 10,
    height: 34,
  },
  searchIcon: { padding: 6 },
  input: {
    flex: 1,
    paddingTop: 8,
    paddingRight: 8,
    paddingBottom: 8,
    paddingLeft: 0,
    alignItems: 'center',
    color: '#424242',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
});

export default Layout;
