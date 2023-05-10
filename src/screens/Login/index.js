import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useState } from 'react'

import background from '../../../assets/Background.png'
import background2 from '../../../assets/Background2.png'

export default function Login() {

    const [newUser, setNewUser] = useState(false)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

  return (
      <View style={styles.container}>
        <ImageBackground source={newUser ? background : background2} resizeMode='cover' style={{flex: 1, justifyContent: 'center'}}>     
        <View style={{padding: 25}}>
            <Text style={styles.title}>{newUser ? 'Create Account' : 'Sign In!'}</Text>
            <Text style={styles.subTitle}>{newUser ? '' : 'Enter your Email & Password'}</Text>
            <View style={styles.form}>
                <TextInput
                    value={email}
                    onChangeText={t => setEmail(t)}
                    placeholder='E-mail'
                    style={styles.input}
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
                        value={password}
                        onChangeText={t => setPassword(t)}
                        secureTextEntry
                        placeholder='Confirm Password'
                        style={[styles.input, {marginTop: 15}]}
                        placeholderTextColor={'#000'}
                    />
                    )
                }
                <TouchableOpacity style={styles.button}>
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