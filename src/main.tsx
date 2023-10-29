import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { contactsApi } from "./services/contacts.ts";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApiProvider api={contactsApi}>
      <App />
    </ApiProvider>
  </React.StrictMode>
);
