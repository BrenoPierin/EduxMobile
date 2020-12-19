import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';


//Paginas importadas
import Feed from "./pages/feed"
import Login from "./pages/login"
import Home from "./pages/home"
import Timeline from "./pages/timeline"
import Turma from "./pages/turma"
import Usuarios from "./pages/usuarios"
import Alunos from "./pages/Aluno"

import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Autenticado = ({navigation}) => {
  return(
    //mudar o initial route name de "Feed" para "Home"
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Feed" component={Feed} />
      <Drawer.Screen name="Login" component={Login} />
      <Drawer.Screen name="Home" component={Home}/>
      <Drawer.Screen name="Alunos" component={Alunos}/>
      <Drawer.Screen name="Usuarios" component={Usuarios}/>
      <Drawer.Screen name="Turma" component={Turma} />
      {/* <Drawer.Screen name="Timeline" component={Timeline} /> */}
      
    </Drawer.Navigator>
  )
}

const BottomNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'ios-home' : 'ios-home';
          } else if (route.name === 'Feed') {
            iconName = focused ? 'ios-list-box' : 'ios-list';
          } else if (route.name === 'Turma') {
            iconName = focused ? 'ios-contacts' : 'ios-contacts';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        style: {
          backgroundColor: '#00D65F',
          borderStyle: 'solid',
        },
        activeTintColor: 'white',
        inactiveTintColor: '#333',
        fontFamily: 'Arial Black'
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="Turma" component={Turma} />
    </Tab.Navigator>
  )
}

const Logout = ({navigation}) => {
  return(
    <View>
      <Text>Deseja realmente sair?</Text>
      <Button onPress={() => {
        AsyncStorage.removeItem('@jwt');
        navigation.push('Login');
      }} title="SAIR"></Button>
    </View>
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
        headerRight: ({ navigation}) => (
          <View>
            <TouchableOpacity
              onPress={()=>{
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
        <Drawer.Screen name="Login" component={Login} options={{ headerShown: true, drawerLabel: "Login" }} />
        <Drawer.Screen name="Feed" component={Feed} />
        <Drawer.Screen name="Home" component={Home}/>
        <Drawer.Screen name="Logout" component={Logout}/>
        <Drawer.Screen name="BottomNavigator" component={BottomNavigator} options={{ drawerLabel: "Logado com Footer" }} />
        <Drawer.Screen name="Turma" component={Turma} />
        <Drawer.Screen name="Alunos" component={Alunos}/> 
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