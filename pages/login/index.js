import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import {url} from '../../utils/constants'

//async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ( {navigation} ) => {

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
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(corpo),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      if(data.token !== null || data.token !== undefined || data.token !== ''){

        alert("Seja bem vindo(a)!");
        console.log(data.token);
        salvar(data.token);
        navigation.push('Autenticado');

      }else{
        alert("Email ou senha inválidos :( ");
      }
    })
    .catch(erro => console.log(erro))
  }
    return(

      <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={styles.container}
        >
        <View style={styles.container} >

            <Text style={styles.title}>Edux</Text>

            <Text style={styles.text}>LOGIN</Text>

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

        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#8404D9',
      alignItems: 'center',
      justifyContent: 'center',
    },
    imput : {
        width: '90%',
        height: 40,
        backgroundColor: 'white',
        borderColor: 'white',
        color: '#8404D9',
        borderWidth: 1,
        marginTop: 20,
        padding: 6,
        borderRadius: 5,
    },
    button : {
      height: 40,
      width: '90%',
      padding: 6,
      backgroundColor: 'white',
      borderRadius: 5,
      marginTop: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    textButton : {
      fontFamily: 'Arial Black',
      color : '#8404D9',
      fontSize : 20
    },
    title : {
      color : 'white',
      fontSize: 60,
      fontFamily: "Arial Black"
    },
    text: {
      color: 'white',
      fontSize: 20,
      fontFamily: "Arial"
    }
  });

export default Login;