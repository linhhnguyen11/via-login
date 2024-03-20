import { Outlet } from "react-router-dom";
import Service from "./Service";
import Footer from "./Footer";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Customers from "./Customers";
function AppLayout() {
  return (
    <>
      <SignIn />

      <div className="flex gap-[136px] p-[80px] justify-between items-center">
        <SignUp></SignUp>
        <Service></Service>
      </div>
      <Customers></Customers>
      <Footer />
      <Outlet />
    </>
  );
}

export default AppLayout;
