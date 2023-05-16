"use client";

import styles from "../styles/ChangePasswordTab.module.css";
import React, { useState } from "react";
import { Button, Input } from "antd";
import postChangePassword from "../components/ApiService/changePassword";

const ChangePasswordTab = () => {
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const handleChange = (event, setter) => {
    setter(event);
  };
  const handleChangePassword = () => {
    console.log(password1, password2);
    if (password1 === password2) {
      const password = {
        password: password2,
      };
      postChangePassword(password);
      alert("password changed succesfully!");
    } else {
      alert("Password doesnt match!");
    }
  };
  return (
    <div className={styles.container}>
      <h2>Change Your Password</h2>
      <div className={styles.formWrapper}>
        <div>
          <p>New Password</p>
          <Input.Password
            onChange={(event: any) =>
              handleChange(event.target.value, setPassword1)
            }
          />
        </div>
        <div>
          <p>Repeat New Password</p>
          <Input.Password
            onChange={(event: any) =>
              handleChange(event.target.value, setPassword2)
            }
          />
        </div>
        <Button
          onClick={handleChangePassword}
          type="primary"
          style={{
            backgroundColor: "#f8b825",
            fontWeight: "bold",
          }}
          size="large"
        >
          CHANGE PASSWORD
        </Button>
      </div>
    </div>
  );
};

export default ChangePasswordTab;
