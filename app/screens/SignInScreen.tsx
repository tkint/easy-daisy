import { useNavigation } from '@react-navigation/native';
import React, { FC, ReactElement, useState } from 'react';
import { Button, StyleSheet, TextInput } from 'react-native';
import { Text } from '../components/shared/Text';
import { View } from '../components/shared/View';
import { useAuthentication } from '../hooks/useAuthentication';
import { useTheme } from '../hooks/useTheme';

export const SignInScreen: FC<{}> = ({}): ReactElement => {
  const navigation = useNavigation();
  const { login } = useAuthentication();

  const { getColor } = useTheme();

  const linkColor = getColor('primary');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async () => {
    if (await login({ email, password })) {
      navigation.reset({ index: 0, routes: [{ name: 'Root' }] });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={email}
        placeholder={'Email'}
        onChangeText={(text) => setEmail(text)}
        autoCapitalize={'none'}
      />
      <TextInput
        style={styles.input}
        value={password}
        placeholder={'Password'}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      <Button color={getColor('primary')} title={'Sign In'} onPress={submit} />

      <Text style={styles.bottomAction}>
        Don't have an account ?{' '}
        <Text
          style={{ color: linkColor, marginTop: 20 }}
          onPress={() => {
            navigation.reset({ index: 0, routes: [{ name: 'SignUp' }] });
          }}>
          Sign up
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  input: {
    height: 40,
    paddingLeft: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },

  bottomAction: {
    marginTop: 20,
  },

  noAccountLink: {},
});
