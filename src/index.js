import React from "react";
import ReactDOM from "react-dom";
import App from "./routes";
import { ChakraProvider } from "@chakra-ui/react";
import store from "./store";
import { Provider } from "react-redux";
import prepareFn from "./prepare";

prepareFn().finally(() => {
  ReactDOM.render(
    <Provider store={store}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </Provider>,
    document.querySelector("#root")
  );
});
