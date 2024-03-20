import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvide";

const useAuth = () => {
  const {
    role,
    login,
    otp,
    getOtp,
    changeUserName,
    userName,
    changePassword,
    password,
    logout,
    setPasswordEmpty,
  } = useContext(AuthContext);

  return {
    role,
    login,
    otp,
    getOtp,
    userName,
    changeUserName,
    changePassword,
    password,
    logout,
    setPasswordEmpty,
  };
};

export default useAuth;
