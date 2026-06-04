import { Outlet } from "react-router";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { ConversionKit } from "../components/ConversionKit";
import { ThemeProvider } from "../contexts/ThemeContext";

export function RootLayout() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 pb-16">
          <Outlet />
        </main>
        <Footer />
        <ConversionKit />
      </div>
    </ThemeProvider>
  );
}
