// src/ssg.tsx
import { ViteSSG } from "vite-ssg";
import App from "./App";
import { routes } from "./routes";

export const createApp = ViteSSG(App, { routes }, ({ app, router, isClient }) => {
  // optional client-only code
});
