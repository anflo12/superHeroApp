import React from 'react'
import DCHeroes from '../screens/DCHeroes';
import DetailScreen from '../screens/DetailScreen';
import MarvelHeroes from '../screens/MarvelHeroes';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

function DCheroesStack() {
    return (
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="DCheroes" component={DCHeroes} />
        <Stack.Screen name="Detail" component={DetailScreen} />
        
      </Stack.Navigator>
    );
  }

  function MarvelHeroesStack() {
    return (
        <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="DCheroes" component={MarvelHeroes} />
        <Stack.Screen name="Detail" component={DetailScreen} />
        
      </Stack.Navigator>
    );
  }


  export {
    DCheroesStack,
    MarvelHeroesStack
  }
