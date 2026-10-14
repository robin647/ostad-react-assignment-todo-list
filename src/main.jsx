import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Entry point: mount the <App /> component into the #root element in index.html
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
