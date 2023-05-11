import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Feather from '@expo/vector-icons/Feather'

export default function Task({data, editTask, deleteTask}) {
  return (
    <View style={styles.container}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.name}>{data.name}</Text>
            <View style={{flexDirection: 'row', gap: 15}}>
                <TouchableOpacity onPress={() => deleteTask(data.id)}>
                    <Feather name='trash-2' size={25} color='#DB2707'/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => editTask(data)}>
                    <Feather name='edit-2' size={25} color='#F24C05'/>
                </TouchableOpacity>
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        padding: 25,
        borderWidth: 2,
        marginVertical: 10,
        borderRadius: 15,
        borderColor: '#9f9f9f'
    },
    name: {
        fontSize: 18,
        fontWeight: '500'
    }
})