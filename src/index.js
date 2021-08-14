import React from "react";
import ReactDOM from "react-dom";
import App from "./routes";
import { ChakraProvider } from "@chakra-ui/react";
import store from "./store";
import { Provider } from "react-redux";
import init from "./init.js";

init().then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </Provider>,
    document.querySelector("#root")
  );
});
