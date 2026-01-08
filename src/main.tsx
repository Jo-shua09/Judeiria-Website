import { createRoot } from "react-dom/client";
import * as HelmetPkg from "react-helmet-async";
const { HelmetProvider } = HelmetPkg;
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </BrowserRouter>
);
