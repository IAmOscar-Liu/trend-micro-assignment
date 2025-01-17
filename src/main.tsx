import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import CalendarProvider from "./context/CalendarProvider.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CalendarProvider>
      <App />
    </CalendarProvider>
  </StrictMode>,
);
