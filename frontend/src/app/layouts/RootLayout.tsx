import { Outlet } from "react-router";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { ConversionKit } from "../components/ConversionKit";

export function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 pb-16">
        <Outlet />
      </main>
      <Footer />
      <ConversionKit />
    </div>
  );
}
