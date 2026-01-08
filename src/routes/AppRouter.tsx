import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRoutes, useLocation } from "react-router-dom";
import { routes } from "@/routes";
import useScrollToTop from "@/hooks/useScrollToTop";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const scrollToTop = useScrollToTop();

  useEffect(() => {
    scrollToTop();
  }, [pathname, scrollToTop]);

  return null;
};

const AppRouter = () => {
  const routing = useRoutes(routes);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ScrollToTop />
        {routing}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default AppRouter;
