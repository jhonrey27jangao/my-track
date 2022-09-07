import { useContext } from "react";
import { Context as TrackContext } from "../context/TrackContext";
import { Context as LocationContext } from "../context/LocationContext";

export default () => {
  const { createTrack } = useContext(TrackContext);
  const {
    reset,
    state: { locations, name },
  } = useContext(LocationContext);

  const saveTrack = () => {
    createTrack(name, locations);
    console.log("runong save'");
    reset("fic");
  };

  return [saveTrack];
};
