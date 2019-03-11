import { UPDATE_ENCODED, UPDATE_LOADING, UPDATE_PUML } from "./actions";
import { encode, decode } from "plantuml-encoder-decoder";
import { REHYDRATE } from "redux-persist/es/constants";
import { AnyAction } from "redux";

export interface State {
  type: "svg" | "png";
  puml: string;
  encoded: string;
  url: string;
  loaded: boolean;
}

export const INITIAL_STATE: State = {
  type: "svg",
  puml: `@startuml



@enduml`,
  encoded: "",
  url: "",
  loaded: false
};

const updateStateProperty = (
  state: State,
  action: AnyAction,
  type: string,
  prop: keyof State
): State => ({
  ...state,
  [prop]: action.type === type ? action[prop] : state[prop]
});

const updatePUML = (state: State, action: AnyAction): State =>
  updateStateProperty(state, action, UPDATE_PUML, "puml");

const updateLoaded = (state: State, action: AnyAction): State =>
  updateStateProperty(state, action, UPDATE_LOADING, "loaded");

const updateEncoded = (state: State, action: AnyAction): State =>
  updateStateProperty(state, action, UPDATE_ENCODED, "encoded");

const updatePUMLFromURL = (state: State, action: AnyAction): State => {
  if (action.type === REHYDRATE) {
    const [empty, type, encoded] = window.location.pathname.split("/");

    if (type && encoded) {
      if (type === "svg" || type === "png") {
        state.type = type;
      }
      state.puml = decode(encoded);
      state.encoded = encoded;
    }
  }

  return state;
};

export const reducer = (oldState = INITIAL_STATE, action: AnyAction): State => {
  let newState: State = { ...oldState };

  newState = updatePUML(newState, action);
  newState = updateEncoded(newState, action);
  newState = updatePUMLFromURL(newState, action);

  // if (oldState.puml !== newState.puml || !newState.encoded) {
  //   console.log('update encoded')
  //   // newState.
  // }

  newState = updateLoaded(newState, action);

  const newUrl = ["", newState.type, newState.encoded].join("/");

  if (oldState.url !== newUrl) {
    newState.url = newUrl;
    newState.loaded = false;
  }

  if (newState.loaded) {
    window.history.replaceState(undefined, "", newUrl);
  }

  return newState;
};
