import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
const Home = () => {

    const imagem = { uri: "https://reactjs.org/logo-og.png" };

    return(
        <View>
            <Text style={styles.title}>RANKING GERAL</Text>
            
            <View style={styles.firstContainer}>
                <Text style={styles.name}>Breno Silva Pierin</Text>
                <Text style={styles.turma}>2° Deselvolvimento de sistemas</Text>
                {/* <Image style={styles.img}>{imagem}</Image> */}            
            </View>

            <View style={styles.bouble1}>
                <View>
                    <Text style={styles.boubleText1}>1°</Text>
                    <Text style={styles.boubleText2}>40</Text>
                    <Text style={styles.boubleText3}>Objetivos</Text>
                    <Text style={styles.boubleText4}>Concluidos</Text>
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
      height: 50,
      width: '90%',
      backgroundColor: '#8404D9',
      borderRadius: 50,
      flexDirection: "column",
      marginLeft: "5%",
      marginTop: 10
    },
    image: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center"
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
        borderRadius: 5,
      },
      turma: {
          fontFamily: 'Arial',
          fontSize: 10,
          textAlign: "center",
          justifyContent: 'center',
          color: 'white',
          marginLeft: '20%',
      }
  });

export default Home;