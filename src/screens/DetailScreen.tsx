import { useNavigation, useRoute } from "@react-navigation/core";
import React, { useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import TextRich from "../components/TextRich";
import ToolBar from "../components/ToolBar";
import { colors } from "../utils/theme";
export default function DetailScreen() {
  const { params } = useRoute();
  const navigation = useNavigation();
  const { item, screen } = params;
  let {height} = Dimensions.get("window");
  let randomsColors = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "indigo",
    "violet",
    ];
  let toolBarColor = screen === "DC" ? colors.dcColor : colors.marvelColor;
  useEffect(() => {
      navigation.setOptions({
            barStyle: { backgroundColor: 'white' },
        })
  }, [])
  return (
    <SafeAreaView style={{ height: height-65 }}>
      <ToolBar showBackButton={true} title={item.name} color={toolBarColor} />
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 12 }}>
        <View >
          <Image
            source={{ uri: item.images.lg }}
            style={{ width: "100%", height: 300, alignSelf: "center" }}
          />
          <Text
            style={{
              textAlign: "center",
              marginTop: 12,
              fontSize: 26,
              color: toolBarColor,
            }}
          >
            {item.name}
          </Text>
          <Text style={{ textAlign: "center", fontSize: 17 }}>
            {item.biography.firstAppearance}
          </Text>
          <View style={{ marginLeft: 12, marginTop: 12 }}>
          <Text style={styles.sectionTitle(toolBarColor)}>Biography</Text>
            <TextRich title="aliases" info={item.biography.aliases[0]}/>
            <TextRich title="alignment" info={item.biography.alignment}/>
            <TextRich title="weight" info={item.connections.groupAffiliation}/>
            <TextRich title="work" info={item.work.occupation}/> 


              <Text style={styles.sectionTitle(toolBarColor)}>Appearance</Text>
            <TextRich title="gender" info={item.appearance.gender} />

            <TextRich title="race" info={item.appearance.race} />
            <TextRich title="height" info={item.appearance.height[0]} />
            <TextRich title="weight" info={item.appearance.weight[1]}/>

            
            <Text style={styles.sectionTitle(toolBarColor)}>Powerstats</Text>
            <View>
              {Object.keys(item.powerstats).map((key, index) => {
                  console.log("key", key);
                return (
                  <>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginRight: 12,
                      }}
                    >
                      <Text style={{fontSize:16,fontWeight:'bold', marginVertical:5}}>{key}</Text>
                      <Text style={{fontSize:16,marginVertical:5}}>{item.powerstats[key]}</Text>
                    </View>
                    <View
                      style={{
                        borderRadius: 12,
                        backgroundColor: randomsColors[index],
                        height: 8,
                        width: `${(item.powerstats[key] / 100) * 100}%`,
                      }}
                    />
                  </>
                );
              })}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionTitle: (toolBarColor: string) => ({
    fontSize: 20,
    fontWeight: "bold",
    color: toolBarColor,
    marginTop: 12,
  }),
});
