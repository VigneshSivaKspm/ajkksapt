import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App";
import { AuthProvider } from "./hooks/useAuth";
import "./index.css";

function ToasterWrapper() {
  const isDark = localStorage.getItem("theme") !== "light";

  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: isDark ? "#1a1a24" : "#f1f3f5",
          color: isDark ? "#e2e2ec" : "#1f2937",
          border: isDark ? "1px solid #3d3d52" : "1px solid #e5e7eb",
          fontFamily: "IBM Plex Sans",
          fontSize: "14px",
        },
        success: {
          iconTheme: {
            primary: "#f97316",
            secondary: isDark ? "#0a0a0f" : "#ffffff",
          },
        },
        error: {
          iconTheme: {
            primary: "#ef4444",
            secondary: isDark ? "#0a0a0f" : "#ffffff",
          },
        },
      }}
    />
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <ToasterWrapper />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
