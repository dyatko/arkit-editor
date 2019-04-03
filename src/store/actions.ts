import { encode } from "arkit-encoder-decoder";
import { Mode } from "./reducer";

export const UPDATE_PUML = "UPDATE_PUML";
export const UPDATE_ENCODED = "UPDATE_ENCODED";
export const UPDATE_LOADING = "UPDATE_LOADING";
export const UPDATE_MODE = "UPDATE_MODE";

export const updatePUML = (puml: string) => {
  return {
    type: UPDATE_PUML,
    puml
  };
};

export const updateEncoded = (puml: string) => {
  return {
    type: UPDATE_ENCODED,
    encoded: encode(puml)
  };
};

export const stopLoading = () => {
  return {
    type: UPDATE_LOADING,
    loaded: true
  };
};

export const updateMode = (mode: Mode) => {
  return {
    type: UPDATE_MODE,
    mode
  };
};
