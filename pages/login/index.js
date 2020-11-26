import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import {url} from '../../utils/constants'

//async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ( {navigator} ) => {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const salvar = async (value) => {
    try {
      await AsyncStorage.setItem('@jwt', value)
    } catch (e) {
      // saving error
    }
  }

  const Logar = () => {

    const corpo = {
        email: email,
        senha : senha
    }
      
    fetch(`${url}/Login`,{
        method: 'POST',
        headers :{
            'Content-type' : 'application/json'
        },
        body : JSON.stringify(corpo),
    })
    .then(response => response.json())
    .then(data => {
      if(data.status !== 404){
        alert('seja bem vindo');
        console.log(data.token);
        salvar(data.token);
        navigation.push('Autenticado');
      }else{
        alert('email ou senha invalidos!')
      }
    })
  }
    return(
        <View style={styles.container} >
            <TextInput
                style={styles.imput}
                onChangeText={text => setEmail(text)}
                value={email}
                placeholder="Digite seu email"
            />

            <TextInput
                style={styles.imput}
                onChangeText={text => setSenha(text)}
                value={senha}
                placeholder="Digite sua senha"
                secureTextEntry={true}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={Logar}
            >
                <Text style={styles.textButton}>Entrar</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    imput : {
        width: '90%',
        height: 40,
        borderColor: '#8404D9',
        borderWidth: 1,
        marginTop: 20,
        padding: 6,
        borderRadius: 5,
    },
    button : {
      height: 40,
      width: '90%',
      padding: 6,
      backgroundColor: '#8404D9',
      borderRadius: 5,
      marginTop: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    textButton : {
      color : 'white',
    }
  });

export default Login;