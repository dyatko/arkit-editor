import * as React from "react";
import { render } from "react-dom";
import { Theme } from "./components/theme";
import { App } from "./components/app";
import { Store } from "./store";

render(
  <Store>
    <Theme>
      <App />
    </Theme>
  </Store>,
  document.querySelector("main")
);
