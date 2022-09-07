import createDataContext from "./createDataContext";
import TrackerAPI from "../api/tracker";

const trackReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_TRACKS":
      return action.payload;
    default:
      return state;
  }
};

const fetchTracks = (dispatch) => async () => {
  const response = await TrackerAPI.get("/tracks");
  dispatch({ type: "FETCH_TRACKS", payload: response.data });
  console.log(response.data, "DATA");
};
const createTrack = (dispatch) => async (name, locations) => {
  await TrackerAPI.post("/tracks", { name, locations });
};

export const { Provider, Context } = createDataContext(
  trackReducer,
  { fetchTracks, createTrack },
  []
);
