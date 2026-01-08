import { createRoot } from "react-dom/client";
import * as HelmetPkg from "react-helmet-async";
const { HelmetProvider } = HelmetPkg;

import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
