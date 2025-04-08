import { useSignIn, useSignUp } from '@clerk/clerk-expo';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

import Colors from '~/constants/Colors';
import { defaultStyles } from '~/constants/Styles';

const Page = () => {
  const { type } = useLocalSearchParams<{ type: string }>();
  const [loading, setLoading] = useState(false);
  const [emailAddress, setEmailAddress] = useState('hola@hola.com');
  const [password, setPassword] = useState('');

  const { signIn, isLoaded, setActive } = useSignIn();
  const { signUp, isLoaded: signUpLoaded, setActive: signUpSetActive } = useSignUp();

  const onSignUpPress = async () => {
    if (!signUpLoaded) return;
    setLoading(true);

    try {
      const result = await signUp.create({ emailAddress, password });
      console.log('onSignInPress', result);

      signUpSetActive({
        session: result.createdSessionId,
      });
    } catch (err: any) {
      console.log('ERROR', err);
      Alert.alert('Error', err?.message || err.toString());
    } finally {
      setLoading(false);
    }
  };

  const onSignInPress = async () => {
    if (!signUpLoaded && signIn === undefined && setActive === undefined) return;
    setLoading(true);

    try {
      const result = await signIn!.create({ identifier: emailAddress, password });

      setActive!({
        session: result.createdSessionId,
      });
    } catch (err: any) {
      console.log(err);
      Alert.alert('Error', err?.message || err.toString());
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={70}
      style={styles.container}>
      {loading && (
        <View style={defaultStyles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
      <Image style={styles.logo} source={require('../assets/images/logo-dark.png')} />
      <Text style={styles.title}>{type === 'login' ? 'Welcome back' : 'Create your account'}</Text>

      <View style={{ marginBottom: 30 }}>
        <TextInput
          style={styles.inputField}
          autoCapitalize="none"
          placeholder="Email"
          value={emailAddress}
          onChangeText={setEmailAddress}
        />
        <TextInput
          style={styles.inputField}
          autoCapitalize="none"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {type === 'login' ? (
          <TouchableOpacity onPress={onSignInPress} style={[defaultStyles.btn, styles.btnPrimary]}>
            <Text style={styles.btnPrimaryText}>Login</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={onSignUpPress} style={[defaultStyles.btn, styles.btnPrimary]}>
            <Text style={styles.btnPrimaryText}>Create account</Text>
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  logo: {
    width: 60,
    height: 60,
    alignSelf: 'center',
    marginVertical: 80,
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 12,
    padding: 10,
    backgroundColor: '#fff',
  },
  btnPrimary: {
    backgroundColor: Colors.primary,
    marginVertical: 10,
  },
  btnPrimaryText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Page;
