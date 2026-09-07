import NavBar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <h2>Welcome to the Layout Page</h2>
      <NavBar />
       <Outlet />
      <Footer />
     
    </div>
  );
};

export default Layout;
