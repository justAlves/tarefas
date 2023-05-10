import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import Login from './src/screens/Login';
import Task from './src/Components/Task';

import Feather from '@expo/vector-icons/Feather'
import AddTask from './src/screens/AddTask';

export default function App() {

  const [user, setUser] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)

  const data = [
    {
    id: 1,
    name: 'Comprar coca-cola'
    },
    {
    id: 2,
    name: 'Estudar React Native'
    },
]


  function handleDelete(id){
    console.log(id)
  }

  if(!user){
    return (
    <Login changeStatus={user => setUser(user)}/>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Olá, Alves</Text>

      <FlatList
        style={styles.list}
        keyExtractor={item => item.key}
        data={data}
        renderItem={({item}) => (
          <Task key={item.id} data={item} deleteTask={handleDelete}/>
        )}
      />

      <View style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Feather name='plus' size={25} color='#ffffff'/>
        </TouchableOpacity>
      </View>
      
      <AddTask modalVisible={modalVisible} setModalVisible={setModalVisible}/>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFFBFF',
    paddingTop: 75,
    padding: 15,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000'
  },
  list:{
    padding: 10,
  },
  addButton: {
    backgroundColor: '#FF5959',
    width: 55,
    height: 55,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10
  }
});
