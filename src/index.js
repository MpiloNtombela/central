import React from "react";
import ReactDom from "react-dom";
import App from "./components/App";
import DataProvider from "./components/DataContext";

ReactDom.render(
  <React.StrictMode>
    <DataProvider>
      <App/>
    </DataProvider>
  </React.StrictMode>,
  document.getElementById('root'))