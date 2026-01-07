import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col max-w-[185rem] mx-auto">
      <Header />
      <main className="flex-1 pt-20 overflow-hidden">{children}</main>
      <Footer />
    </div>
  );
}
