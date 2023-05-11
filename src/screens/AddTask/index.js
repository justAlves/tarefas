import { StyleSheet, Text, View, Modal, ImageBackground, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import ToastManager, {Toast} from 'toastify-react-native'
import Feather from '@expo/vector-icons/Feather'

import background from '../../../assets/Background3.png'
import image from '../../../assets/ImageModal.png'

export default function AddTask({modalVisible, setModalVisible, handleAdd, newTask, setNewTask, taskId, setTaskId}) {

  

  return (
    <View style={styles.container}>
        <Modal
          animationType='slide'
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)} 
        >
            <ToastManager 
              position='bottom' 
              animationIn='slideInLeft' 
              animationOut='slideOutRight'
              
            />
            <View style={styles.modal}>
              <TouchableOpacity onPress={() => {
                setModalVisible(!modalVisible)
                setNewTask('')
                setTaskId('')
              }}>
                <Feather name='corner-down-left' size={35}/>
              </TouchableOpacity>
              <View style={styles.header}>
                <Text style={styles.title}>
                  What will you do today?
                </Text>
                <Image source={image}/>
              </View>
              <View style={styles.form}>
                <Text style={styles.taskTitle}>Task</Text>
                <TextInput
                  style={styles.input}
                  placeholder='Enter the task name...'
                  value={newTask}
                  onChangeText={t => setNewTask(t)}

                />
                <View style={{alignItems: 'center'}}>
                  <TouchableOpacity style={styles.button} onPress={() => handleAdd()}>
                    <Text style={styles.btnText}>
                      {taskId !== '' ? 'Update Task' : 'Add Task'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
        </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EFFBFF'
  },
  modal:{
    flex: 1,
    padding: 15
  },
  title:{
    color: '#000',
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 25
  },
  form:{
    
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 36
  },
  taskTitle:{
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 9,
    marginTop: 21
  },
  input:{
    padding: 10,
    fontSize: 15,
    borderWidth: 2,
    borderColor: '#BD6565cc',
    borderRadius: 15
  },
  button:{
    backgroundColor: '#F07F7F',
    //width: 120,
    padding: 15,
    alignItems: 'center',
    marginTop: 37,
    borderRadius: 15
  },
  btnText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#FFF'
  }
})