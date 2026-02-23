import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout() {
  return (
    <div className="app-container">
      <Navbar />
      <div className="content-wrap">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
