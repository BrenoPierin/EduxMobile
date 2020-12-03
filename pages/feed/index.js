import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Image, Platform  } from 'react-native';
import {url} from '../../utils/constants'
import jwt_decode from "jwt-decode";
import * as ImagePicker from 'expo-image-picker';
//(https://www.npmjs.com/package/jwt-decode) decode

import AsyncStorage from '@react-native-async-storage/async-storage';

const Feed = () => {
    const [idUsuario, setIdUsuario] = useState(0);
    const [texto, setTexto] = useState('');
    const [imagem, setImagem] = useState('');
    const [token, setToken] = useState('')

    useEffect(()=>{

      AsyncStorage.getItem('@jwt').then(data => {
          var token = data;
          var decoded = jwt_decode(data);
          setIdUsuario(decoded.jti);
          setToken(token)

      })

    }, [])

    // Parte do Breno https://docs.expo.io/tutorial/image-picker/ ---------------------------------------------------------------------------------------------
    const Enviar = () => {

      const post = {
        "texto": texto,
        "idUsuario": 1,
        "imagem": imagem,
      } 
    
      fetch( url + "Dicas",{
        method: 'POST',
        headers :{
          'content-type' : 'application/json',
          'authorization' : `Bearer ${token}`
        },
        body : JSON.stringify(post),
      })

    }

      let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert("Permission to access camera roll is required!");
          return;
        }
    
        let pickerResult = await ImagePicker.launchImageLibraryAsync();

      if (pickerResult.cancelled === true) {
        return;
      }
  
      setImagem(pickerResult.uri);
    };
  
    

    return (
      <View style={styles.container}>

        <Text style={styles.title}>POSTAGENS</Text>

        <TextInput
          style={styles.input}
          onChangeText={text => setTexto(text)}
          value={texto}TextInput
          placeholder="Qual sua dica para hoje?"
        />

        <View style={styles.buttonContainer}>

        <TouchableOpacity
          style={styles.buttonImg}
          onPress={openImagePickerAsync}
        >
          <Text style={styles.textImg}>Selecionar imagem</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonEnviar}
          onPress={Enviar}
        >
          <Text style={styles.text}>Enviar!</Text>
        </TouchableOpacity>
        </View>
      </View>
      
    );
  }

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
    },
    title: {
      fontSize: 15,
      marginTop: 15,
      fontFamily: 'Arial Black',
      textAlign: "center",
      color: '#8404D9',
    },
    input: {
      height: 40,
      width: '90%',
      borderColor: '#8404D9',
      borderWidth: 1,
      borderRadius: 5,
      padding: 6,
      marginTop: 15
    },
    buttonEnviar: {
      height: 40,
      width: '65%',
      padding: 6,
      backgroundColor: '#04D94F',
      borderRadius: 5,
      marginTop: 10,
      textAlign: 'center',
      justifyContent: 'center'
    },
    buttonImg: {
      height: 40,
      width: '65%',
      padding: 6,
      backgroundColor: 'gray',
      borderRadius: 5,
      marginTop: 10,
      marginRight: 5,
      textAlign: 'center',
      justifyContent: 'center'
    },
    text: {
      color: 'white',
      fontSize: 20,
    },
    textImg: {
      color: 'white',
      fontSize: 15,
    },
    item:{
      margin:10,
      padding:10,
      backgroundColor:"#000",
      width:"80%",
      flex:1,
      alignSelf:"center",
      flexDirection:"row",
      borderRadius:5
  },
  buttonContainer: {
    padding: 6,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  }
  });

export default Feed