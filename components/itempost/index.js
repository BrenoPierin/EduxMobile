import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Linking, Button } from 'react-native';


import { LinearGradient } from 'expo';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
        marginTop: 60,
        height: '50%'
    },
    listItem: {
        margin: 10,
        padding: 10,
        backgroundColor: "#FFF",
        width: "80%",
        flex: 1,
        alignSelf: "center",
        flexDirection: 'row',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#8404D9'
    },
    descricao: {
        marginTop: 15,
        color: 'black',
        fontFamily: 'Arial'
    }
});

const ItemPost = (dicas) => {


    const { texto, imagem, data, id } = dicas;

    const image = () => {
        if (imagem === "") {
            return (
                <Text style={{ textAlign: 'center', marginTop: 5, fontFamily: 'Arial' }}>Não há imagem </Text>
            )
        }
        else {
            return (
                <Image source={{ uri: imagem }} style={{ width: 150 , height: 150, borderRadius: 4, alignSelf: 'center', marginBottom: 7, marginRight: '16%', margin: 0, padding: 0 }} />
            );
        }
    };







    return (
        <View style={styles.listItem}>

            <View style={{ justifyContent: 'center', alignSelf: 'center' }}>

                {image()}

                <View style={styles.texto}>
                    <Text style={{ width: 290, fontFamily: 'TitilliumWeb_400Regular', color: '#323133' }}>{texto}</Text>
                 

                </View>

                <View style={{ alignItems: "center", flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ height: 50, width: 100, alignItems: "center", flexDirection: 'row' }}>
                        <TouchableOpacity
                            key={id}
                           
                        >
                        </TouchableOpacity>
                        <Text style={{ color: "#00C2EE", marginLeft: 15, fontSize: 20, fontFamily: 'TitilliumWeb_400Regular' }}></Text>
                        {/* <Text style={{color:"blue", marginLeft: 15, fontSize: 20}}>3567</Text> */}
                    </View>

                    {/* <Text style={{color:"blue"}}>22/11/2020</Text> */}
                    <Text style={{ color: "#00C2EE", fontFamily: 'Arial', paddingRight : 30 }}>{data}</Text>
                </View>
            </View>

        </View>
    )
}

export default ItemPost;