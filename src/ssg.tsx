import { ViteSSG } from "vite-ssg";
import App from "./App";
import { routes } from "./routes";
import { HelmetProvider } from "react-helmet-async";

export const createApp = ViteSSG(
  App,
  { routes }, // auto-provides <Router> context
  ({ app, router, isClient }) => {
    // Wrap with HelmetProvider for SEO
    app.use(HelmetProvider);
  }
);
