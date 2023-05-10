import { StyleSheet, Text, View, Modal, ImageBackground } from 'react-native'
import React, { useState } from 'react'

import background from '../../../assets/Background3.png'

export default function AddTask() {

  const [modalVisible, setModalVisible] = useState(true)

  return (
    <View style={styles.container}>
        <Modal
          animationType='slide'
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)} 
        >
          <View style={styles.modal}>
            <Text style={styles.title}>
              What will you do today?
            </Text>
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
    justifyContent: 'center',
    alignItems: 'center'
  },
  title:{
    
  }
})