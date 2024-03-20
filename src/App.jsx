import "./App.css";
// import SignIn from "./components/SignIn";
// import SignUp from "./components/SignUp";
// import Service from "./components/Service";
// import Customers from "./components/Customers";
// import Footer from "./components/Footer";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import AuthContext from "./provider/AuthProvide.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout.jsx";
import ModalGetOtp from "./components/Modal/ModalGetOtp.jsx";
import ModalEnterOtp from "./components/Modal/ModalEnterOtp.jsx";
import ModalChangePassword from "./components/Modal/ModalChangePassword.jsx";
import ModalChangeSuccess from "./components/Modal/ModalChangeSuccess.jsx";
function App() {
  const queryClient = new QueryClient();
  return (
    <AuthContext>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route path="get-otp" element={<ModalGetOtp />} />
              <Route path="enter-otp" element={<ModalEnterOtp />} />
              <Route path="change-password" element={<ModalChangePassword />} />
              <Route
                path="change-password-success"
                element={<ModalChangeSuccess />}
              />
              {/* <SignIn />

            <div className="flex gap-[136px] p-[80px] justify-between items-center">
              <SignUp></SignUp>
              <Service></Service>
            </div>
            <Customers></Customers>
            <Footer /> */}
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </AuthContext>
  );
}

export default App;
