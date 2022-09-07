import React, { useContext, useCallback } from "react";
import { Text, StatusBar } from "react-native";
import { SafeAreaView, withNavigationFocus } from "react-navigation";
import { Context as LocationContext } from "../context/LocationContext";
import useLocation from "../hooks/useLocation";
import Map from "../components/Map";
import TrackForm from "../components/TrackForm";
import { FontAwesome } from "@expo/vector-icons";

function TrackScreen({ navigation }) {
  const {
    addLocation,
    state: { recording },
  } = useContext(LocationContext);
  const isFocused = navigation.isFocused();

  const callBack = useCallback(
    (location) => {
      addLocation(location, recording);
    },
    [recording]
  );

  const [error] = useLocation(isFocused || recording, callBack);

  return (
    <SafeAreaView
      forceInset={{ top: "always" }}
      style={{ flex: 1, marginTop: StatusBar.currentHeight }}
    >
      <Map />
      {error && <Text>Please enable location services</Text>}
      <TrackForm />
    </SafeAreaView>
  );
}

TrackScreen.navigationOptions = {
  title: "Add Track",
  tabBarIcon: <FontAwesome name="plus" size={20} />,
};

export default withNavigationFocus(TrackScreen);
