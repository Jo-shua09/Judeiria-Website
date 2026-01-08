import { useState, useEffect } from "react";
import AppRouter from "./routes/AppRouter";
import Loader from "./components/Loader";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return <>{isLoading ? <Loader /> : <AppRouter />}</>;
}
