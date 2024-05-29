import { React } from "react";
import * as ReactDom from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import "antd/dist/reset.css";

ReactDom.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
