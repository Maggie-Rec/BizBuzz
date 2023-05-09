import React from "react";
import styles from "../../styles/Login.module.css";
import LoginWindow from "../../components/LoginWindow";

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <LoginWindow />
    </div>
  );
};

export default LoginPage;
