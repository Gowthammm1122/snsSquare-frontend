import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "@dr.pogodin/react-helmet"; // <-- updated
import ReactGA from "react-ga4";
import App from "./App";
import './index.css';
import './styles/scrollbar.css';

// Initialize Google Analytics
ReactGA.initialize("G-PT9284RH5D");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
