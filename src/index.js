import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { CurrentUserProvider } from "./context/CurrentUser";
import {ThemeProvider } from './context/Theme'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <CurrentUserProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </CurrentUserProvider>
  </BrowserRouter>
);
