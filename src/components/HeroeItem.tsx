import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { TouchableRipple } from "react-native-paper";
import { SuperheroResponse } from "../interfaces/SuperHeroResponse";

interface Props {
  item: SuperheroResponse;
  screen: string;
}
export default function HeroeItem({ item, screen }: Props) {
  const navigation = useNavigation();
  return (
    <TouchableRipple onPress={()=> navigation.navigate('Detail',{
      item: item,
      screen: screen
    })} style={{ ...styles.container, ...styles.shadow }}>
      <View >
        <Image
          style={{ width: "100%", height: 140 }}
          resizeMode="stretch"
          source={{ uri: item.images.sm }}
        />
        <Text style={styles.nameHeroe}>{item.name}</Text>
        <Text style={styles.realName}>
          {item.biography.fullName.length > 15
            ? item.biography.fullName.slice(0, 15) + "..."
            : item.biography.fullName}
        </Text>
      </View>
    </TouchableRipple>
  );
}

const styles = StyleSheet.create({
  container: { width: "47%", marginHorizontal: 5, marginTop: 4, height: 200 },
  nameHeroe: { fontSize: 18, fontWeight: "900", textAlign: "center" },
  realName: { fontSize: 14, fontWeight: "900", textAlign: "center" },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
