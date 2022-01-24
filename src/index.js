import ReactDom from "react-dom";
import React from "react";
import App from "./components/App";

ReactDom.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root'))