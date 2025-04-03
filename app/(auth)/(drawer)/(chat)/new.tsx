import { useAuth } from '@clerk/clerk-react';
import { View, Text, Button } from 'react-native';

const Page = () => {
  const { signOut } = useAuth();
  return (
    <View>
      <Text>Profile</Text>
      <Text>Profile</Text>
      <Text>Profile</Text>
      <Text>Profile</Text>
      <Text>Profile</Text>
      <Text>Profile</Text>
      <Text>Profile</Text>
      <Button title="Sign Out" onPress={() => signOut()} />
    </View>
  );
};

export default Page;
