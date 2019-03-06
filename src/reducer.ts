import { UPDATE_LOADING, UPDATE_PUML } from "./actions";
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

export const reducer = (oldState = INITIAL_STATE, action: AnyAction): State => {
  const newState = { ...oldState };

  if (action.type === UPDATE_PUML) {
    newState.puml = action.puml;
  }

  if (action.type === REHYDRATE) {
    const [empty, type, encoded] = window.location.pathname.split("/");

    if (type && encoded) {
      if (type === "svg" || type === "png") {
        newState.type = type;
      }
      newState.puml = decode(encoded);
      newState.encoded = encoded;
    }
  }

  if (oldState.puml !== newState.puml || !newState.encoded) {
    newState.encoded = encode(newState.puml);
  }

  if (action.type === UPDATE_LOADING) {
    newState.loaded = action.loaded;
  }

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
