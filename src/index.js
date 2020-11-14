import React from "react";
import ReactDOM from "react-dom";
import { swDev } from "./swDev";

import App from "./App";

ReactDOM.render(
   <React.StrictMode>
      <App />
   </React.StrictMode>,
   document.getElementById("root")
);

swDev();
