import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ContentProvider } from "./context/ContentContext.jsx";
createRoot(document.getElementById("root")).render(<React.StrictMode><ContentProvider><App /></ContentProvider></React.StrictMode>);
