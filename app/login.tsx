import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';

const Page = () => {
  const { type } = useLocalSearchParams<{ type: string }>();
  return (
    <View>
      <Text>{type}</Text>
    </View>
  );
};

export default Page;
