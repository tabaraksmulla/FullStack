import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Ensure React finds the root element
const rootElement = document.getElementById("root");

if (!rootElement) {
    throw new Error("Root element with id 'root' not found.");
}

// Use createRoot correctly
const root = ReactDOM.createRoot(rootElement as HTMLElement);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
