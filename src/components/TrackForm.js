import React, { useContext } from "react";
import {
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Input, Button } from "react-native-elements";
import Spacer from "./Spacer";
import { Context as LocationContext } from "../context/LocationContext";
import useSaveTracks from "../hooks/useSaveTracks";

function TrackForm() {
  const {
    startRecording,
    stopRecording,
    changeName,
    state: { name, recording, locations },
  } = useContext(LocationContext);

  const [saveTrack] = useSaveTracks();

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <Spacer>
        <Input
          placeholder="Enter track name"
          onChangeText={changeName}
          value={name}
        />
      </Spacer>
      <Spacer>
        <Button
          style={{ marginBottom: 20 }}
          title={`${recording ? "Stop" : "Start"} Recording`}
          onPress={recording ? stopRecording : startRecording}
        />
        {!recording && locations.length ? (
          <Button title="Save recording" onPress={saveTrack} />
        ) : null}
      </Spacer>
    </KeyboardAvoidingView>
  );
}

export default TrackForm;
