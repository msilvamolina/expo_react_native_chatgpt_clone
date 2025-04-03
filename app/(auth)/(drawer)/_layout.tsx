// import { FontAwesome6, Ionicons } from '@expo/vector-icons';
// import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
// import { DrawerActions } from '@react-navigation/native';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { useNavigation, useRouter } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { TextInput, Text, Image, View, StyleSheet, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import NewChat from './(chat)/new';

import Colors from '~/constants/Colors';

export const CustomDrawerContent = (props: any) => {
  const { bottom, top } = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, marginTop: top }}>
      {/* <View style={{ backgroundColor: '#fff', paddingBottom: 10 }}>
        <View style={styles.searchSection}>
          <Ionicons style={styles.searchIcon} name="search" size={20} color={Colors.greyLight} />
          <TextInput
            style={styles.input}
            placeholder="Search"
            underlineColorAndroid="transparent"
          />
        </View>
      </View> */}
      {/* <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: '#fff', paddingTop: 0 }}>
        <DrawerItemList {...props} />

        <DrawerItem
          label="Nuevo Chat"
          icon={({ color, size }) => (
            <Ionicons name="chatbubbles-outline" size={size} color={color} />
          )}
          onPress={() => {
            props.navigation.navigate('new'); // Debe coincidir con name en Drawer.Screen
          }}
        />
      </DrawerContentScrollView> */}
    </View>
  );
};

const Layout = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const dimensions = useWindowDimensions();

  return (
    <Drawer drawerContent={CustomDrawerContent}>
      <Drawer.Screen
        name="(chat)/new"
        options={{
          title: 'New Chat',
          drawerIcon: () => (
            <View>
              <Text>Hola</Text>
              {/* <Image source={require('../../../assets/images/logo-white')} /> */}
            </View>
          ),
        }}
      />
    </Drawer>
  );
};

const styles = StyleSheet.create({});

export default Layout;
