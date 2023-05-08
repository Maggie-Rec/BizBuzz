import React from "react";
import "@/styles/Login.css";
import '@/styles/LoginWindow.css'
import LoginWindow from "@/components/LoginWindow";


const LoginPage = () => {
  return (
    <div className="container-login">
      <LoginWindow />
    </div>
  );
};

export default LoginPage;
