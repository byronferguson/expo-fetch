import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { useState } from 'react';

function HomeScreen() {
  const [username, setUsername] = useState('fakefamily@ail.com');
  const [password, setPassword] = useState('password');
  // const [username, setUsername] = useState('LoriClark');
  // const [password, setPassword] = useState('myBeaut1fu11P@ssW0rd!');
  const [token, setToken] = useState('');

  const authURL = 'http://127.0.0.1:3050/v2/auth/login';
  const lbURL = 'https://develop.api.lessonbuddy.com/v2/auth/login';
  const lb_info_URL = 'https://develop.api.lessonbuddy.com/v2/auth/info';
  const fakeURL = 'https://freefakeapi.io/authapi/login';

  async function attemptLogin(username: string, password: string) {
    try {
      const res = await fetch(lb_info_URL, {
        method: 'GET',
        headers: { 'client-platform-id': '4' },
        // body: JSON.stringify({ username: 'fakefamily@ail.com', password: 'password' }),
      });

      console.log('res :>> ', res);

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await res.json();
      console.log('data :>> ', data);
      // setToken(data.token);
      return data;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async function handleLogin() {
    // Call the login service
    // console.log('Username:', username);
    // console.log('Password:', password);

    await attemptLogin(username, password);
  }
  return (
    <View style={styles.container}>
      <View style={{ gap: 12 }}>
        <Text style={styles.headline}>SignIn</Text>

        <Text>Username:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your username..."
          value={username}
          onChangeText={text => setUsername(text)}
        />

        <Text>Password:</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />

        <TouchableOpacity
          onPress={handleLogin}
          style={{ backgroundColor: '#205caa', padding: 10, borderRadius: 10 }}
        >
          <Text style={{ color: 'white', textAlign: 'center', fontWeight: 600 }}>LOGIN</Text>
        </TouchableOpacity>
        <Text>Token: {token ?? ''}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  headline: {
    textAlign: 'center',
    marginTop: -100,
    marginBottom: 50,
    fontWeight: 700,
    fontStyle: 'italic',
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,

    marginTop: 10,
    marginBottom: 10,
    borderColor: 'grey',
  },
});

export default HomeScreen;
