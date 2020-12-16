import React,{useEffect, useState}from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { url } from '../../utils/constants';
import jwt_decode from "jwt-decode";

import AsyncStorage from '@react-native-async-storage/async-storage';

const Item = ({ nome, email}) => {
    return (
      <View style={styles.item}>
          <Text style={styles.text}>{nome}</Text>
          <Text style={styles.text}>{email}</Text>
      </View>
    )
}

const Usuarios = () => {

    //Constantes
    const [usuarios, setUsuarios] = useState([]);
    const [idUsuario, setIdUsuario] = useState(0)
    const [token, setToken] = useState('')

    //useEffect para guardar o ton=ken e listar os usuarios quando o usuario entra na pagina
    useEffect(()=>{
        listarUsuario();
        AsyncStorage.getItem('@jwt').then(data => {
            var token = data;
            var decoded = jwt_decode(data);
            setIdUsuario(decoded.jti);
            setToken(token)
        });
      }, [])

    //metodo para listar
    const listarUsuario = () => {
        fetch(`${url}Usuario`, {
        method : 'GET',
        headers : {
          'Content-Type' : 'application/json',
          'Authorization': 'Bearer ' + token 
        }
        })
        .then(response => response.json())
        .then(dados => {
            console.log(dados);
            setUsuarios(dados);
        })
        .catch(err => console.error(err));
      }

      const renderItem = ({ item }) => {
          return (
          <Item
            nome={item.nome}
            email={item.email}
          />
        )            
    };

  return(
      <View style={styles.container}>
          <Text style={styles.title}>Usuario Gerais</Text>
          <FlatList
            data={usuarios}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
      </View>
  )
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
    }
})

export default Usuarios