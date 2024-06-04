import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { MemoryRouter } from "react-router-dom";
import { RouterHandler } from "./pages/RouterHandler";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MemoryRouter>
      <RouterHandler />
    </MemoryRouter>
  </React.StrictMode>
);
