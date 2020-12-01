import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Cabecalho from '../../components/Cabecalho';
import './index.css';

const Home = () => {

    const image = { uri: "https://reactjs.org/logo-og.png" };

    return(
        <View>
            <Cabecalho />
            <Text style={styles.text}>RANKING GERAL</Text>
            <div className="container">

                <div className="cardRanking">
                    <div>
                        <Image
                            style={styles.imagemCard}
                            source={{
                            uri:
                                'https://lh3.googleusercontent.com/ogw/ADGmqu8hLGlCrPvhctADQyUHlvLIBN2biYe3EGLyAqwKcg=s83-c-mo',
                            }}
                        />
                    </div>
                    <div>
                        <h3>
                            Tiago de Castro Valim
                        </h3>
                        <p>
                            Dev
                        </p>
                    </div>
                </div>

                <div className="centro">
                    <div className="bola vermelha">
                        <p className="letra">Bola 1</p>
                    </div>

                    <div className="flex">
                        <div className="bola amarela">
                            <p className="letra">Bola 2</p>
                        </div>

                        <div className="bola verde margem">
                            <p className="letra">Bola 3</p>
                        </div>
                    </div>
                    
                    <div className="bola azul">
                        <p className="letra">Bola 4</p>
                    </div>
                </div>
            </div>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column"
    },
    image: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center"
    },
    text: {
      color: "#9200D6",
      fontSize: 30,
      fontWeight: "bold",
      textAlign: "center",
      marginTop: "1.5em",
    //   backgroundColor: "#D6D6D6"
    },
    imagemCard: {
        width: '3.5em',
        height: '3.5em',
        borderRadius: '4em',
      },
  });

export default Home;