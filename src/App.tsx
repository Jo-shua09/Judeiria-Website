import { useState, useEffect } from "react";
import AppRouter from "./routes/AppRouter";
import Loader from "./components/Loader";
import { BrowserRouter } from "react-router-dom";

const isDev = import.meta.env.DEV;

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Show loader for 3 seconds

    return () => clearTimeout(timer);
  }, []);

  const router = <AppRouter />;

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : isDev ? (
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>{router}</BrowserRouter>
      ) : (
        router
      )}
    </div>
  );
}
