import React,{useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import jwt_decode from "jwt-decode";
import {url} from '../../utils/constants/index'

import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {

    const [usuario, setUsuario] = useState("");

    useEffect(()=>{
      AsyncStorage.getItem('@jwt').then(data => {
          var token = data;
          var decoded = jwt_decode(data);
          setUsuario(decoded.nameid);
          console.log(usuario)
      });
    }, [])
    
    return(
        <View>
            <Text style={styles.title}>RANKING GERAL</Text>
            
            <View style={styles.firstContainer}>
                <Image style={styles.imgProfile} source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/7/70/User_icon_BLACK-01.png' }} />            
                <View style={styles.textInformation}>
                  <Text style={styles.name}>{usuario}</Text>
                  <Text style={styles.turma}>2° Deselvolvimento de sistemas</Text>
                </View>
            </View>

            <View style={styles.bouble}>
              <View style={styles.boubleRank1}>
                    <Text style={styles.boubleTitle}>1°</Text>
                    <Text style={styles.boubleQuantity}>40</Text>
                    <Text style={styles.boubleText}>Objetivos Concluidos</Text>
              </View>
              
              <View style={styles.boubleRank2}>
                    <Text style={styles.boubleTitle}>2°</Text>
                    <Text style={styles.boubleQuantity}>30</Text>
                    <Text style={styles.boubleText}>Objetivos Concluidos</Text>
              </View>

              <View style={styles.boubleRank3}>
                    <Text style={styles.boubleTitle}>3°</Text>
                    <Text style={styles.boubleQuantity}>20</Text>
                    <Text style={styles.boubleText}>Objetivos Concluidos</Text>
              </View>

              <View style={styles.boubleRank4}>
                    <Text style={styles.boubleTitle}>4°</Text>
                    <Text style={styles.boubleQuantity}>10</Text>
                    <Text style={styles.boubleText}>Objetivos Concluidos</Text>
              </View>

            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    title: {
      fontSize: 15,
      marginTop: 15,
      fontFamily: 'Arial Black',
      textAlign: "center",
      color: '#8404D9',
    },
    firstContainer: {
      flexDirection: "row",
      justifyContent: "flex-end",
      alignContent: "center",
      width: 360,
      height: 70,
      paddingTop: 5,
      marginTop: 40,
      backgroundColor: "#8404D9",
      borderRadius: 50,
      marginLeft: '7%'
    },
    imgProfile: {
      width: 60,
      height: 60,
      marginLeft: 1,
      borderRadius: 50
    },
    textInformation: {
      flexWrap: 'wrap',
      marginRight: '30%'
    },
    name: {
      
      fontSize: 15,
      
      textAlign: "center",
      justifyContent: 'center',
      fontFamily: 'Arial Black',
      color: 'white',
      marginLeft: '20%',
      padding: 5
    },
    imagemCard: {
        width: 20,
        height: 25,
        borderRadius: 8,
      },
      turma: {
          fontFamily: 'Arial',
          fontSize: 13,
          textAlign: "center",
          justifyContent: 'center',
          color: 'white',
          marginLeft: '20%'
      },
      bouble: {
        width: 400,
        height: 400,
        alignContent: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        flexDirection: "row",
        marginTop: 50,
        padding: 50,
        transform: [{ rotate: "45deg" }]
      },
      boubleTitle: {
        color: "white",
        fontSize: 30,
        fontWeight: "900",
        textAlign: "center"
      },
      boubleQuantity:{
        color: "white",
        fontSize: 18,
        fontWeight: "700",
        textAlign: "center"
      },
      boubleText:{
        width: "80%",
        marginLeft: 14,
        color: "white",
        fontSize: 16,
        fontWeight: "200",
        textAlign: "center"
      },
      boubleRank1:{
        justifyContent: "center",
        alignContent: "center",
        width: 140,
        height: 140,
        backgroundColor: "#00D65F",
        borderRadius: 70,
        marginRight: 15,
        marginBottom: 15,
        transform: [{ rotate: "-45deg" }]
      },
      boubleRank2:{
        justifyContent: "center",
        alignContent: "center",
        width: 140,
        height: 140,
        backgroundColor: "#F9E800",
        borderRadius: 70,
        transform: [{ rotate: "-45deg" }]
      },
      boubleRank3:{
        justifyContent: "center",
        alignContent: "center",
        width: 140,
        height: 140,
        backgroundColor: "#00C2EE",
        borderRadius: 70,
        marginRight: 15,
        marginBottom: 15,
        transform: [{ rotate: "-45deg" }]
      },
      boubleRank4:{
        justifyContent: "center",
        alignContent: "center",
        width: 140,
        height: 140,
        backgroundColor: "#FF271C",
        borderRadius: 70,
        transform: [{ rotate: "-45deg" }]
      }
  });

export default Home;