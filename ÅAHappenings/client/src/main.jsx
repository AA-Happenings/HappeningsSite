import * as React from "react";
import * as ReactDOM from "react-dom/client";

import { AuthContextProvider } from "./context/authContext";
import { EventsContextProvider } from "./context/eventContext";
import App from "./App";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <EventsContextProvider>
        <App />
      </EventsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);