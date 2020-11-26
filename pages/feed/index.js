import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import {url} from '../../utils/constants'

const Feed = () => {
    const [texto, setTexto] = useState('');
    const [idDica, setIdDica] = useState(0);
    const [imagem, setImagem] = useState();
    const [urlImagem, setUrlImagem] = useState('');
    const [idUsuario, setIdUsuario] = (0);

    const Enviar = () => {
    
      fetch(url + "/Dicas",{
        method: 'POST',
        body : {
          idDica : idDica,
          texto : texto,
          imagem : imagem,
          urlImagem : urlImagem,
          idUsuario : idUsuario
        },
        headers :{
          'content-type' : 'application/json',
          'authorization' : 'Bearer ' 
        }
      })

    }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Postagens</Text>

        <TextInput
          style={styles.input}
          onChangeText={text => setTexto(text)}
          value={texto}TextInput
          placeholder="Qual sua dica para hoje?"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={Enviar}
        >
          <Text style={styles.text}>Enviar!</Text>
        </TouchableOpacity>

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
      textAlign: "center",
    },
    input: {
      height: 40,
      width: '90%',
      borderColor: '#8404D9',
      borderWidth: 1,
      borderRadius: 5,
      padding: 6,
      marginTop: 50
    },
    button: {
      height: 40,
      width: '90%',
      padding: 6,
      backgroundColor: '#8404D9',
      borderRadius: 5,
      marginTop: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: 'white',
      fontSize: 0
    }
  });

export default Feed