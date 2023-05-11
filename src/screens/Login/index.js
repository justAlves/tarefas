import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, Keyboard } from 'react-native'
import React, { useState } from 'react' 

import ToastManager, {Toast} from 'toastify-react-native'

import background from '../../../assets/Background.png'
import background2 from '../../../assets/Background2.png'

import firebase from '../../services/firebaseConnection'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Login({changeStatus}) {

    const [newUser, setNewUser] = useState(false)

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    async function handleLogin(){
        if(newUser){
            if(confirmPassword === password){
                const user = firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((user) => {
                    firebase.database().ref('users').child(user.user.uid).set({
                        name: name
                    })
                    Keyboard.dismiss()
                    Toast.success('Registered user! :)', 'bottom')
                })
                .catch(err => {
                    Keyboard.dismiss()
                    Toast.error('Something wrong! :(', 'bottom')
                })
                return
            }else{
                Toast.error('The Passwords doesnt match!', 'bottom')
                return
            }
        }else{
            const user = firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => {
                firebase.database().ref('users').child(user.user.uid).once('value', async snapshot => {
                    const data = {
                        id: user.user.uid,
                        name: snapshot.val().name
                    } 
                   changeStatus({
                        ...data
                    })
                    await AsyncStorage.setItem('user', JSON.stringify({
                        ...data
                    }))
                })
                
            })
            .catch(err => {
                Keyboard.dismiss()
                Toast.error('Ops! Something wrong! :(', 'bottom')
            })
            return
        }
    }

  return (
      <View style={styles.container}>
        <ToastManager position='bottom' animationIn='slideInLeft' animationOut='slideOutRight'/>
        <ImageBackground source={newUser ? background : background2} resizeMode='cover' style={{flex: 1, justifyContent: 'center'}}>     
        <View style={{padding: 25}}>
            <Text style={styles.title}>{newUser ? 'Create Account' : 'Sign In!'}</Text>
            <Text style={styles.subTitle}>{newUser ? '' : 'Enter your Email & Password'}</Text>
            <View style={styles.form}>
                {newUser && (
                    <TextInput
                    value={name}
                    onChangeText={t => setName(t)}
                    placeholder='Name'
                    style={styles.input}
                    placeholderTextColor={'#000'}
                />
                )}
                <TextInput
                    value={email}
                    onChangeText={t => setEmail(t)}
                    placeholder='E-mail'
                    style={[styles.input, {marginTop: 15}]}
                    placeholderTextColor={'#000'}
                />
                <TextInput
                    value={password}
                    onChangeText={t => setPassword(t)}
                    secureTextEntry
                    placeholder='Password'
                    style={[styles.input, {marginTop: 15}]}
                    placeholderTextColor={'#000'}
                />
                {
                    newUser && (
                        <TextInput
                        value={confirmPassword}
                        onChangeText={t => setConfirmPassword(t)}
                        secureTextEntry
                        placeholder='Confirm Password'
                        style={[styles.input, {marginTop: 15}]}
                        placeholderTextColor={'#000'}
                    />
                    )
                }
                <TouchableOpacity disabled={email == '' || password == ''} style={[styles.button, {backgroundColor: email == '' || password == '' ? '#9a9a9a' : '#000'}]} onPress={handleLogin}>
                    <Text style={styles.btnText}>
                        {newUser ? 'Sign up' : 'Log in'}
                    </Text>
                </TouchableOpacity>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 25}}>
                    <Text style={{fontSize: 18}}>{newUser ? 'Alredy have an account? ' : 'Or '}</Text>
                    <TouchableOpacity onPress={() => setNewUser(!newUser)}>
                        <Text style={{fontSize: 18, fontWeight: '900', borderBottomWidth: 3,}}>{newUser ? 'Login' : 'Create a New Account'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
      </ImageBackground>  
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#f2f2f2',
        justifyContent: 'center',
        
    },
    title: {
        fontSize: 40,
        fontWeight: '900'
    },
    subTitle:{
        fontSize: 20
    },
    form:{
        marginTop: 50
    },
    input:{
        padding: 7,
        borderBottomWidth: 2,
        borderBottomColor: '#000',
        fontSize: 18
    },
    button:{
        width: '100%',
        backgroundColor: '#000',
        padding: 15,
        borderRadius: 50,
        marginTop: 25,
        alignItems: 'center'
    },
    btnText:{
        color: '#ffffff',
        fontSize: 24,
        fontWeight: '600'
    }
})