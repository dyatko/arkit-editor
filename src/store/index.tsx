import * as React from "react";
import { createStore } from "redux";
import { reducer } from "./reducer";
import { persistStore, persistReducer } from "redux-persist";
import { Provider } from "react-redux";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

const persistConfig = {
  key: "arkit",
  storage,
  blacklist: ["loaded"]
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = createStore(
  persistedReducer,
  window["__REDUX_DEVTOOLS_EXTENSION__"] &&
    window["__REDUX_DEVTOOLS_EXTENSION__"]()
);

export const persistor = persistStore(store);

export const Store = ({ children }) => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>{children}</PersistGate>
  </Provider>
);
