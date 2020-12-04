import React from 'react';
import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import Cabecalho from '../../components/Cabecalho';
import './index.css'

const DATA = [
    {
      id: '1',
      title: 'Nome 1',
    },
    {
      id: '2',
      title: 'Nome 2',
    },
    {
      id: '3',
      title: 'Nome 3',
    },
  ];

  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

const Turma = () => {

    const renderItem = ({ item }) => (
        <Item title={item.title} />
      );
    
    return(
        <View>
            <Cabecalho />
            <Text style={styles.text}>Turma</Text>

            <div className="container">
                <div className="card">
                    <Image
                        style={styles.logo}
                        source={{
                        uri:
                            'https://i1.wp.com/socientifica.com.br/wp-content/uploads/2019/05/image_7150_1e-Hubble-Legacy-Field.jpg?fit=1920%2C1773&ssl=1',
                        }}
                    />
                    <h2 className="tituloCard">2S - 2°DM</h2>
                    <h2 className="tituloCard">Desenvolvimento de Sistemas</h2>
                    <div className="divAlunos">
                        <h3>Alunos</h3>  
                        <FlatList
                            style={styles.margemE}
                            data={DATA}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                        />
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
    margemE: {
        marginLeft: '0.3em',
        marginTop: '0.2em',
    },
    logo: {
        width: '90%',
        height: 100,
        margin: 'auto',
        marginBottom: '1em',
        borderRadius: '2em',
      },
  });

export default Turma;