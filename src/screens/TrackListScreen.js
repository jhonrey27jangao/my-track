import React, { useContext } from "react";
import { NavigationEvents } from "react-navigation";
import {
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { ListItem } from "react-native-elements";
import { Context as TrackContext } from "../context/TrackContext";

function TrackListScreen({ navigation }) {
  const { fetchTracks, state } = useContext(TrackContext);
  return (
    <View>
      <NavigationEvents onWillFocus={fetchTracks} onDidFocus={fetchTracks} />
      {typeof state === "object" && state.length > 0 ? (
        <FlatList
          data={state}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("TrackDetail", { _id: item._id })
                }
              >
                <ListItem>
                  <ListItem.Content>
                    <ListItem.Title>
                      {item.name || "Loading ..."}
                    </ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Chevron />
                </ListItem>
              </TouchableOpacity>
            );
          }}
        />
      ) : (
        <ActivityIndicator size="large" style={{ marginTop: 200 }} />
      )}
    </View>
  );
}

export default TrackListScreen;
