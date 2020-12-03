import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Image, Platform  } from 'react-native';
import {url} from '../../utils/constants'
import jwt_decode from "jwt-decode";
import * as ImagePicker from 'expo-image-picker';
import Header from '../../components/header'
//(https://www.npmjs.com/package/jwt-decode) decode

import AsyncStorage from '@react-native-async-storage/async-storage';

const Feed = () => {
    const [texto, setTexto] = useState('');
    const [idDica, setIdDica] = useState(0);
    const [imagem, setImagem] = useState('');
    const [urlImagem, setUrlImagem] = useState('');
    //const [idUsuario, setIdUsuario] = (0);
    const [usuario, setUsuario] = useState([]);
    const [post, setPosts] = useState([]);

    // Parte do Breno https://docs.expo.io/tutorial/image-picker/ ---------------------------------------------------------------------------------------------
    const Enviar = () => {

      const post = {
        idDIca: idDica,
        text: texto,
        imagem: imagem,
        urlImagem: urlImagem
      }
    
      fetch( url + "Dicas",{
        method: 'POST',
        headers :{
          'content-type' : 'application/json',
          'authorization' : 'Bearer ' + AsyncStorage.getItem('@jwt')
        },
        body : JSON.stringify(post),
      })

    }

    const selectImg = () => {
      
      let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert("Permission to access camera roll is required!");
          return;
        }
    
        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        console.log(pickerResult);
      }

      if (pickerResult.cancelled === true) {
        return;
      }

      setImagem({ localUri: pickerResult.uri });
    };

    if (imagem !== null) {
      return (
        <View style={styles.container}>
          <Image
            source={{ uri: imagem.localUri }}
            style={styles.thumbnail}
          />
        </View>
      );
    }

    return (
      <View style={styles.container}>

        <View component={Header}/>

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
          onPress={selectImg}
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