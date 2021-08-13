import React from "react";
import ReactDOM from "react-dom";
import App from "./routes";
import { ChakraProvider } from "@chakra-ui/react";
import store from "./store";
import { Provider } from "react-redux";

chrome.storage.sync.set({ name: "aaron" }, () => {
  console.log("success");
});

ReactDOM.render(
  <ChakraProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </ChakraProvider>,
  document.querySelector("#root")
);
