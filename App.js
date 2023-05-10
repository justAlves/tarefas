import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Login from './src/screens/Login';

import Feather from '@expo/vector-icons/Feather'

export default function App() {

  const [user, setUser] = useState(1)

  if(!user){
    return (
    <Login changeStatus={user => setUser(user)}/>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Olá, Alves</Text>
      </View>


      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff'
  },
  header: {
    backgroundColor: '#fc210d',
    paddingTop: 75,
    padding: 15,
    elevation: 15,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  }
});
