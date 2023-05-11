import { StatusBar } from 'expo-status-bar';
import { useState, useEffect,} from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, Keyboard, TextInput } from 'react-native';
import ToastManager, {Toast} from 'toastify-react-native'
import firebase from './src/services/firebaseConnection';

import Login from './src/screens/Login';
import Task from './src/Components/Task';

import Feather from '@expo/vector-icons/Feather'
import AddTask from './src/screens/AddTask';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {

  const [user, setUser] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)

  const [newTask, setNewTask] = useState('')
  const [taskId, setTaskId] = useState('')

  const [data, setData] = useState([])

  useEffect(() => {
    function loadUser(){
      const user = AsyncStorage.getItem('user')
      if(user != null){
        const jsonUser = JSON.parse(user)
        setUser(jsonUser)
      }
    }
    
    loadUser()
  }, [user])

  useEffect(() => {
    function getUser(){
      if(!user){
        return;
      }

      firebase.database().ref('tasks').child(user.id).once('value', snapshot => {
        setData([])

        snapshot?.forEach(childItem => {
          const data = {
            id: childItem.key,
            name: childItem.val().name
          }
    
          setData(oldData => [...oldData, data])
        })
      })
    }

    getUser()
  }, [user])

  function handleDelete(id){
    firebase.database().ref('tasks').child(user.id).child(id).remove()
    .then(() => {
      const filteredTask = data.filter(item => item.id !== id)
      setData(filteredTask)
    })
  }

  function handleEdit(data){
    setModalVisible(true)
    setNewTask(data.name)
    setTaskId(data.id)
  }

  function handleAdd(){
    if (newTask === ''){
      Toast.error('Type a task name!')
      return;
    }

    if(taskId !== ''){
      firebase.database().ref('tasks').child(user.id).child(taskId).update({
        name: newTask
      })
      .then(() => {
        const taskIndex = data.findIndex(item => item.id === taskId)
        const tasksClone = data
        tasksClone[taskIndex].name = newTask

        setData([...tasksClone])
      })

      setNewTask('')
      setTaskId('')
      setModalVisible(false)
      Keyboard.dismiss()
      return;
    }

    const task = firebase.database().ref('tasks').child(user.id)
    const key = task.push().key

    task.child(key).set({
      name: newTask
    })
    .then(() => {
      const data = {
        id: key,
        name: newTask
      }

      setData(oldData => [...oldData, data])
    })

    Keyboard.dismiss()
    setNewTask('')
    setModalVisible(false)
    Toast.success('Task added :)')
  }

  if(!user){
    return (
    <Login changeStatus={user => setUser(user)}/>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ToastManager 
              position='bottom' 
              animationIn='slideInLeft' 
              animationOut='slideOutRight'
              
      />
      <Text style={styles.title}>Olá, {user.name}</Text>

      <FlatList
        style={styles.list}
        keyExtractor={item => item.key}
        data={data}
        renderItem={({item}) => (
          <Task key={item.id} data={item} editTask={handleEdit} deleteTask={handleDelete}/>
        )}
      />

      <View style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Feather name='plus' size={25} color='#ffffff'/>
        </TouchableOpacity>
      </View>
      
      <AddTask 
        handleAdd={handleAdd} 
        newTask={newTask} 
        setNewTask={setNewTask} 
        modalVisible={modalVisible} 
        setModalVisible={setModalVisible}
        taskId={taskId}
        setTaskId={setTaskId}
      />

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
