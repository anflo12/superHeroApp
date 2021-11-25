import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, FlatList, Image, StyleSheet, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import clientApi from "../api/clientApi";
import ToolBar from "../components/ToolBar";
import { AxiosResponse } from "axios";
import { SuperheroResponse } from "../interfaces/SuperHeroResponse";
import HeroeItem from "../components/HeroeItem";
import { colors } from "../utils/theme";
import { SearchBar } from "react-native-elements";
export default function DCHeroes() {
  const { top } = useSafeAreaInsets();
  const [DCData, setDCData] = useState<SuperheroResponse[]>([]);
  const [initialList, setinitialList] = useState<SuperheroResponse[]>([]);
  const [searchValue, setsearchValue] = useState("");
const [loading, setloading] = useState(false)
  useEffect(() => {
    getDCHeroes();
  }, []);

  const filterdata = (value: string) => {
    console.log("value", value);
    let tempData = [...DCData];
    let filterData = [];
    filterData = [...tempData].filter((item) => {
      console.log("item", item, value);
      return item.name.toLowerCase().match(value.toLocaleLowerCase());
    });
    setDCData(filterData);

    if (!value || value === "") {
      setDCData([...initialList]);
    }
    setsearchValue(value);
  };
  const getDCHeroes = () => {
    setloading(true)
    clientApi.get("/all.json").then((res: SuperheroResponse[]) => {
      let DcHeroes = [...res].filter(
        (element) => element.biography.publisher === "DC Comics"
      );
      setloading(false)
      setDCData(DcHeroes);
      setinitialList(DcHeroes);
    });
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ToolBar title="DC HEROES" color={colors.dcColor} />

      <SearchBar
        platform="ios"
        round
        showCancel={false}
        cancelButtonTitle=""
        containerStyle={styles.searchBar}
        inputContainerStyle={{
          backgroundColor: "white",
        }}
        lightTheme
        placeholder="Buscar Heroe"
        onChangeText={(value) => filterdata(value)}
        value={searchValue}
      />

{loading ? (
          <View style={{flex: 1, alignItems:'center', alignSelf:'center', justifyContent: 'center',}}>
              <ActivityIndicator size="large" color={colors.marvelColor} />
          </View>
        ) : (
          <>
            <FlatList
              numColumns={2}
              data={DCData}
              renderItem={({ item, index }) => (
                <HeroeItem screen="DC" item={item} />
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          </>
        )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchBar: {
      height: 60,
      marginTop: 6,
      marginBottom: 6,
      marginHorizontal: 2,
      borderWidth: 2,
      borderColor: colors.dcColor,
      borderRadius: 20,
    }
});