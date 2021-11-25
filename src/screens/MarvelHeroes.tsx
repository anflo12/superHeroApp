import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import clientApi from "../api/clientApi";
import ToolBar from "../components/ToolBar";
import { AxiosResponse } from "axios";
import { SuperheroResponse } from "../interfaces/SuperHeroResponse";
import HeroeItem from "../components/HeroeItem";
import { colors } from "../utils/theme";
import { SearchBar } from "react-native-elements";
import { useNavigation } from "@react-navigation/core";
export default function MarvelHeroes() {
  const { top } = useSafeAreaInsets();
  const [MarvelData, setMarvelData] = useState<SuperheroResponse[]>([]);
  const [initialList, setinitialList] = useState<SuperheroResponse[]>([]);
  const [searchValue, setsearchValue] = useState("");
  const [loading, setloading] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    getMarvelHeroes();
    navigation.setOptions({
      barStyle: { backgroundColor: colors.marvelColor },
    });
  }, []);

  const filterdata = (value: string) => {
    console.log("value", value);
    let tempData = [...MarvelData];
    let filterData = [];
    filterData = [...tempData].filter((item) => {
      console.log("item", item, value);
      return item.name.toLowerCase().match(value.toLocaleLowerCase());
    });
    setMarvelData(filterData);

    if (!value || value === "") {
      setMarvelData([...initialList]);
    }
    setsearchValue(value);
  };
  const getMarvelHeroes = () => {
    setloading(true);
    clientApi.get("/all.json").then((res: SuperheroResponse[]) => {
      let MarvelHeroes = [...res].filter(
        (element) => element.biography.publisher === "Marvel Comics"
      );
      setloading(false);

      setMarvelData(MarvelHeroes);
      setinitialList(MarvelHeroes);
    });
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ToolBar title="MARVEL HEROES" color={colors.marvelColor} />
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
      <View>
        
        {loading ? (
          <View style={{flex: 1, alignItems:'center', alignSelf:'center', justifyContent: 'center',}}>
              <ActivityIndicator size="large" color={colors.marvelColor} />
          </View>
        ) : (
          <>
            <FlatList
              numColumns={2}
              data={MarvelData}
              renderItem={({ item, index }) => (
                <HeroeItem screen="Marvel" item={item} />
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          </>
        )}
      </View>
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
    borderColor: colors.marvelColor,
    borderRadius: 20,
  },
});
