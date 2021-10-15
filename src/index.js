import React from "react";
import ReactDOM from "react-dom";
import App from "./routes";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import store from "Store/index.js";
import prepareFn from "Prepare/index.js";
import "Styles/global.scss";

prepareFn().finally(async () => {
  ReactDOM.render(
    <Provider store={store}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </Provider>,
    document.querySelector("#root")
  );
});
