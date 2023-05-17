import styles from "../styles/LogOutTab.module.css";
import React from "react";
import { Alert, Button } from "antd";

const LogOutTab = () => {
  function handleLogout() {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    alert("you have been succesully logged out!");
    window.location.replace("http://localhost:3000/login");
  }
  return (
    <div className={styles.container}>
      <Button
        type="primary"
        style={{
          backgroundColor: "#f8b825",
          fontWeight: "bold",
        }}
        size="large"
        onClick={handleLogout}
      >
        LOG OUT
      </Button>
    </div>
  );
};

export default LogOutTab;
