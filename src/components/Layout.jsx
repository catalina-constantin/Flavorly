import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout() {
  const location = useLocation();
  const isContactPage = location.pathname === "/contact";

  return (
    <div className="app-container">
      <Navbar />
      <main
        className={`content-wrap${isContactPage ? " contact-background" : ""}`}
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
