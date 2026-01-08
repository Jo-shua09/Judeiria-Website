import About from "./pages/About";
import Contact from "./pages/Contact";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Services from "./pages/Services";

export const routes = [
  { path: "/", element: <Index /> },
  { path: "/about", element: <About /> },
  { path: "/services", element: <Services /> },
  { path: "/contact", element: <Contact /> },
  { path: "*", element: <NotFound /> },
];
