import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { setStatusBarHidden } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import DcLogo from "./assets/DcLogo";
import MarvelLogo from "./assets/MarvelLogo";
import { DCheroesStack, MarvelHeroesStack } from "./src/navigation/HeroesStackNavigation";
import DCHeroes from "./src/screens/DCHeroes";
import MarvelHeroes from "./src/screens/MarvelHeroes";

import { colors } from "./src/utils/theme";
const Tab = createMaterialBottomTabNavigator();

export default function App() {
  useEffect(() => {
    setStatusBarHidden(true, "slide");
  }, []);
  return (
    <NavigationContainer>
      <Tab.Navigator
      shifting
      activeColor="white"
      inactiveColor="#d4d3d3"
      
        sceneAnimationEnabled
      >
        <Tab.Screen
          options={{
            tabBarColor: colors.dcColor,
            tabBarLabel: "DC Heroes",
            tabBarIcon: ({ color }) => <DcLogo color={color} />,
          }}
          name="DC"
          component={DCheroesStack}
        />
        <Tab.Screen
          options={{ tabBarLabel:'Marvel Heroes', 
           tabBarColor: colors.marvelColor,
           tabBarIcon: ({ color }) => <MarvelLogo color={color}/> }}
          name="Marvel"
          component={MarvelHeroesStack}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
