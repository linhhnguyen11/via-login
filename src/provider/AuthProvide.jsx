import { createContext, useState } from "react";
export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export default function AuthProvider({ children }) {
  const [role, setRole] = useState("hihi");
  const [otp, setOtp] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const login = (role) => {
    if (role) {
      setRole(role);
      return;
    }
  };
  const logout = () => {
    setRole("");
    setUserName("");
    setPassword("");
  };
  const setPasswordEmpty = () => {
    setPassword("");
  };
  const getOtp = (otp) => {
    if (otp) {
      setOtp(otp);
    }
    return;
  };
  const changeUserName = (userName) => {
    if (userName) {
      setUserName(userName);
    }
    return;
  };
  const changePassword = (password) => {
    if (password) {
      setPassword(password);
    }
    return;
  };
  return (
    <AuthContext.Provider
      value={{
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
