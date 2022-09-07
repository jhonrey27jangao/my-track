import React, { useContext } from "react";
import { View, Text } from "react-native";
import { Context as TrackContext } from "../context/TrackContext";
import MapView, { Polyline } from "react-native-maps";

function TrackDetailScreen({ navigation }) {
  const { state } = useContext(TrackContext);
  const _id = navigation.getParam("_id");

  const track = state.find((tra) => tra._id === _id);
  const initialCoords = track.locations[0].coords;
  const coords = initialCoords;
  return (
    <>
      <Text>{track.name}</Text>
      <MapView
        style={{
          height: 300,
        }}
        initialRegion={{
          longitudeDelta: 0.01,
          latitudeDeltax: 0.01,
          ...coords,
        }}
      >
        <Polyline coordinates={track.locations.map((loc) => loc.coords)} />
      </MapView>
    </>
  );
}

export default TrackDetailScreen;
