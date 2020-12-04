import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';


//Paginas importadas
import Feed from "./pages/feed"
import Login from "./pages/login"
import Dicas from "./pages/dicas"
import Home from "./pages/home"
import Timeline from "./pages/timeline"
import Turma from "./pages/turma"
{/*import Aluno from "./pages/aluno;"*/}

import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const Autenticado = ({navigation}) => {
  return(
    //mudar o initial route name de "Feed" para "Home"
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Feed" component={Feed} />
      <Drawer.Screen name="Login" component={Login} />
      <Drawer.Screen name="Home" component={Home}/>
      {/*<Drawer.Screen name="Aluno" component={Aluno}/>
        />
      <Drawer.Screen name="Timeline" component={Timeline} /> */}
      
    </Drawer.Navigator>
  )
}

export default function App( {navigation} ) {
  return (
    <NavigationContainer>
     <Drawer.Navigator screenOptions={{
        headerShown: true,
        headerTitle: "Edux",
        headerTitleStyle: {
          fontSize: 36,
          fontWeight: "900",
          color: 'white',
          fontFamily: 'Arial Black'
        },
        headerStyle: {
          backgroundColor: '#8404D9',
          borderBottomWidth: 0
        },
        headerLeft: null,
        headerRight: () => (
          <View>
            <TouchableOpacity
              onPress={() => {
                AsyncStorage.removeItem('@jwt');
                navigation.navigate('Login');
              }}
              style={{ marginRight: 20 }}
              underlayColor={"#8404D9"}
            >
              <MaterialCommunityIcons name="logout" color={"white"} size={30} />
            </TouchableOpacity>
          </View>
        )
      }} >
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false, drawerLabel: "" }} />
        <Stack.Screen name="Autenticado" component={Autenticado} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#3b3b3b',
    width: '50%',
    padding: 10,
    borderRadius: 6,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eduxtitulo: {
    fontSize: 36,
    fontWeight: "700",
    color: 'white',
    fontFamily: 'Arial Black',
    marginLeft: '1em',
  },
  textHeader: {
    fontWeight: "700",
    color: 'white',
    fontSize: 36,
    fontFamily: 'Titillium Web'
  },
  cabecalho: {
    width: '100%',
    height: 70,
    color: '#3b3b3b'
  }
});