import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import Login from './src/screens/Login';

export default function App() {

  const [user, setUser] = useState(null)

  if(!user){
    return (
    <Login/>
    )
  }

  return (
    <View style={styles.container}>
      <Text>App Tarefas</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
