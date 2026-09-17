import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useScrollToTop } from "../hooks/useScrollToTop";

function Layout() {
  useScrollToTop();

  return (
    <div className="flex min-h-screen flex-col bg-paper pb-[calc(4.5rem+env(safe-area-inset-bottom))] text-ink md:pb-0">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
