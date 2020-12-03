import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Image, Platform  } from 'react-native';


const Header = () => {

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Edux</Text>
            <Text style={styles.logout}>{<i class="fas fa-sign-out-alt"></i>}</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        //8404D9
        backgroundColor: 'white',
    },
    title: {
        color: 'white'
    },
    logout: {
        
    }
})

export default Header