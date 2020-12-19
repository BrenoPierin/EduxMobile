import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Image, Platform  } from 'react-native';
import {url} from '../../utils/constants'
import ItemPost from '../../components/itempost'
import jwt_decode from "jwt-decode";
import * as ImagePicker from 'expo-image-picker';
//(https://www.npmjs.com/package/jwt-decode) decode
//(https://www.npmjs.com/package/axios) axios

import AsyncStorage from '@react-native-async-storage/async-storage';

const Feed = () => {
    const [idUsuario, setIdUsuario] = useState(0);
    const [idDica, setIdDica] = useState(0);
    const [texto, setTexto] = useState('');
    const [imagem, setImagem] = useState(null);
    const [token, setToken] = useState('')
    const [usuarios, setUsuario] = useState([])
    const [id, setId] = useState(0);
    const [urlImagem, setUrlImagem] = useState('');
    const [post, setPosts] = useState([]);

    useEffect(()=>{
      listarPost();
      listarUsuario();
      AsyncStorage.getItem('@jwt').then(data => {
          var token = data;
          var decoded = jwt_decode(data);
          setIdUsuario(decoded.jti);
          setToken(token)
      });
      (async () => {
        if (Platform.OS !== 'web') {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      })()
    }, [])

    // Parte do Breno https://docs.expo.io/tutorial/image-picker/ ---------------------------------------------------------------------------------------------
    const Enviar = () => {

      const dica = {
        texto : texto,
        idUsuario : 1,
        imagem : imagem
    }

    const method = (idDica === 0 ? 'POST' : 'PUT');
    const urlRequest = (idDica === 0 ? `${url}Dica` :  `${url}Dica/${idDica}`);
    
     fetch(urlRequest ,{
         method : method,
         body : JSON.stringify(dica),
         headers : {
            'content-type' : 'application/json',
            'authorization' : 'Bearer ' + token
         }
     }) 
     .then(response => response.json())
     .then(dados => {
         alert('Dica cadastrada');
         console.log(dados)

         listarPost();

         limparCampo()
     })
    }

    const limparCampo = () => {
      setTexto('');
      setUrlImagem(null);
    }
    
    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.cancelled) {
        setImagem(result.uri);
        console.log(imagem)
      }

      fetch(url + 'Upload', {

        method : 'POST',
        body : imagem, 
        headers : {
            'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
        }

    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        setUrlImagem(data.url);
    })
    .catch(err => console.log(err));
      
    };

    // Parte da Listagem ---------------------------------------------------------------------------------------------------
    
    const listarUsuario = () => {
      fetch(`${url}Usuario`)
      .then(response => response.json())
      .then(dados => {
          console.log(dados);
          setUsuario(dados);
      })
      .catch(err => console.error(err));
    }


    const listarPost = () => {
      fetch(`${url}Dicas`, {
        method : 'GET',
        headers : {
          'Content-Type' : 'application/json',
          'Authorization': 'Bearer ' + token 
        }
      })
      .then(response => response.json())
      .then(dados => {
        console.log(dados.data);
        setPosts(dados.data);
      })
      .catch(err => console.error(err));
    }

    //para mostrar a img tem q alterar o upload na api p link da api
    const renderItem = (dica) => {
      return (
          <ItemPost 
              texto={dica.item.texto} 
              imagem={dica.item.urlImagem}
          />
      )
    }
            
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
          onPress={pickImage}
        >
          <Text style={styles.textImg}>Selecionar imagem</Text>
          {imagem && <Image source={{ uri: imagem }} style={{ width: '65%', height: 160 }} />}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonEnviar}
          onPress={Enviar}
        >
          <Text style={styles.text}>Enviar!</Text>
        </TouchableOpacity>
        </View>
          <FlatList
              data={post}
              renderItem={renderItem}
              keyExtractor={data => data.id}
          />
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
  buttonContainer: {
    padding: 6,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  }
  });

export default Feed