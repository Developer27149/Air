import React from "react";
import ReactDOM from "react-dom";
import App from "./routes";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import store from "Store/index.js";
import prepareFn from "Prepare/index.js";
import "Styles/global.scss";
import { extendTheme } from "@chakra-ui/react";
const theme = extendTheme({
  fonts: {
    size: "12px",
  },
});

prepareFn().finally(async () => {
  ReactDOM.render(
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </Provider>,
    document.querySelector("#root")
  );
});
