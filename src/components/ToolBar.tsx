import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { TouchableRipple } from "react-native-paper";
import { useNavigation } from "@react-navigation/core";

interface Props {
  title: string;
  color: string;
  showBackButton?: boolean;
}
export default function ToolBar({
  title,
  color = "white",
  showBackButton,
}: Props) {
  const navigation = useNavigation();
  return (
    <View style={styles.container(color)}>
      <View style={{ width: "30%", marginLeft: 12 }}>
        {showBackButton && (
          <TouchableRipple onPress={()=> navigation.goBack()}>
            <AntDesign name="arrowleft" size={30} color="white" />
          </TouchableRipple>
        )}
      </View>

      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: (color) => ({
    flexDirection: "row",
    backgroundColor: color,
    height: 60,
    paddingTop: 5,
    alignItems: "center",
    elevation: 8,
  }),
  title: { fontSize: 20, fontWeight: "900", color: "white" },
});
