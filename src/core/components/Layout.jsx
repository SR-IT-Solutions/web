import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink">
      <Navbar />
      {/* pb clears the fixed mobile bottom nav (<md). */}
      <main className="flex-1 pb-[calc(4.5rem+env(safe-area-inset-bottom))] md:pb-0">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
