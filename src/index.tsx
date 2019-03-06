import * as React from "react";
import { render } from "react-dom";
import { Editor } from "./editor";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { Preview } from "./preview";
import { PersistGate } from "redux-persist/integration/react";
import "./index.scss";

render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <section>
        <Editor />
      </section>
      <section>
        <Preview />
      </section>
    </PersistGate>
  </Provider>,
  document.querySelector("main")
);