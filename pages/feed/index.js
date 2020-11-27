import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import {url} from '../../utils/constants'

const Feed = () => {
    const [texto, setTexto] = useState('');
    const [idDica, setIdDica] = useState(0);
    const [imagem, setImagem] = useState();
    const [urlImagem, setUrlImagem] = useState('');
    const [idUsuario, setIdUsuario] = (0);
    const [usuario, setUsuario] = useState([]);
    const [post, setPosts] = useState([]);

    useEffect(() => {
      listarPost();
      listarUsuario();
  }, [])

   const listarUsuario = () => {
      fetch(`${url}/Usuario`)
      .then(response => response.json())
      .then(dados => {
          console.log(dados);
          setUsuario(dados);
          
          limparCampo();
      })
      .catch(err => console.error(err));
    }


    const listarPost = () => {
      fetch(`${url}/Post`, {
          headers : {
              'authorization' : 'Bearer ' + AsyncStorage.getItem('token')
          }
      })
      .then(response => response.json())
      .then(dados => {
        console.log(dados.data);
          setPosts(dados.data);
          

      })
      .catch(err => console.error(err));
    }

    const Item = (post) => {
      const {nome, textos, imagem} = post;
      return (
          <View style={styles.item} >
             
      <View >
      <Text style={{fontWeight:"bold", flex: 20, color : "white"}}>{nome}</Text>
      </View>
      <View>
      <Text style={{color: "white",  justifyContent:"center",alignItems:"center", paddingLeft: 40}}>{  textos}</Text>
      </View>
      <Image source={{uri:imagem}}  style={{width:300, height:300, borderRadius:30}} />
  
  </View>
 
      )
  }


      const renderItem = ({ item }) => (
          <Item nome={item.usuario.nome}  textos={item.texto} imagem={item.urlImagem} />
        );
    
  return (
      <View>
          <Text>TIMELINE</Text>
          <Image source={{uri:'https://raw.githubusercontent.com/sena-code/Edux-react/main/src/assets/img/logo_2.png'}} style={{width : 250, height: 250, alignItems : "center"}}/>
  <Text>{texto}</Text>
  
           <FlatList 
              data={post}
              keyExtractor={item => item.id}
              renderItem={renderItem}
          />
      </View>
  )

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

          <Text>TIMELINE</Text>
          <Image source={{uri:'https://raw.githubusercontent.com/sena-code/Edux-react/main/src/assets/img/logo_2.png'}} style={{width : 250, height: 250, alignItems : "center"}}/>
          <Text>{texto}</Text>
  
           <FlatList 
              data={post}
              keyExtractor={item => item.id}
              renderItem={renderItem}
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
  }
  });

export default Feed