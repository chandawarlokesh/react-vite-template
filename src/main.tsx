import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { makeServer } from "./server.js";
import { RUN_MOCK_SERVER } from "./constants/apiConstants.ts";

if (RUN_MOCK_SERVER) {
  makeServer()
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
