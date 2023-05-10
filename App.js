import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Login from './src/screens/Login';

export default function App() {

  const [user, setUser] = useState(null)

  if(!user){
    return (
    <Login changeStatus={user => setUser(user)}/>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>App Tarefas</Text>
      <StatusBar style="auto" />
    </SafeAreaView>
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
