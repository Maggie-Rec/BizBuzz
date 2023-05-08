"use client";

import { useState } from "react";
import styles from "../styles/LoginWindow.module.css";
import { Input, Space, Divider, Button } from "antd";

const LoginWindow = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [showLogo, setShowLogo] = useState(true);

  function displayRegister() {
    setIsLogged(!isLogged);
    setShowLogo(!showLogo);
  }

  return (
    <div className={styles.container}>
      {showLogo && (
        <div className="logo">
          <h1>LOGO</h1>
        </div>
      )}

      <div className={styles.login}>
        <h1 className={styles.title}> LOG IN</h1>
        <form className={styles.formLogin}>
          <Space.Compact>
            <Input type="text" placeholder="EMAIL" className={styles.input} />
          </Space.Compact>
          <Space.Compact>
            <Input
              type="password"
              placeholder="PASSWORD"
              className={styles.input}
            />
          </Space.Compact>
          <Button className={styles.button}>Log in</Button>
        </form>
        <Divider plain>OR</Divider>
        <a className={styles.smallText} onClick={displayRegister}>
          Dont have an account? Register Here!
        </a>
      </div>
      {isLogged && (
        <div className={styles.registration}>
          <h1 className={styles.title}>REGISTER</h1>
          <form className={styles.formReg}>
            <Space.Compact>
              <Input
                type="text"
                placeholder="Business name"
                className={styles.input}
              />
            </Space.Compact>
            <Space.Compact>
              <Input type="text" placeholder="Email" className={styles.input} />
            </Space.Compact>
            <Space.Compact>
              <Input
                type="password"
                placeholder="Password"
                className={styles.input}
              />
            </Space.Compact>
            <Button className={styles.button}>Log in</Button>
          </form>
          <Divider plain>OR</Divider>
        </div>
      )}
    </div>
  );
};

export default LoginWindow;
