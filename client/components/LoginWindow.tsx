"use client";

import { useState } from "react";
import styles from "../styles/LoginWindow.module.css";
import { Input, Space, Divider, Button } from "antd";
import Image from "next/image";
import Login from "../public/login.svg";
import Registration from "../public/registrate.svg";
import { getLogin } from "./ApiService/getLogin";
import { registerUser } from "./ApiService/registerUser";
import { useDispatch } from "react-redux";

const LoginWindow = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [businessName, setBusinessName] = useState("");

  // const dispatch = useDispatch()
  function toggleRegister() {
    setIsRegistered(!isRegistered);
  }

  function handleChange(value, setter) {
    setter(value);
  }
  const handleLogin = async () => {
    console.log(document.cookie);
    const creds = {
      email: email,
      password: password,
    };

    const data = await getLogin(creds);
  //  const token = data.token
    if (data.ok) {
      window.location.replace("http://localhost:3000/");
    } else {
      alert("Wrong Login Details. Try again.");
    }

// dispatch({type: "LOGIN", payload: token })

  };

  const handleRegistration = async () => {
    console.log(businessName, email, password);
    const user = {
      username: businessName,
      email: email,
      password: password,
    };
    const data = await registerUser(user);
    window.location.replace("http://localhost:3000/");
  };

  return (
    <div className={styles.container}>
      <>
        {!isRegistered ? (
          <div className={styles.login}>
            <div className={styles.leftBoxImg}>
              <Image src={Login} alt="login image" width={400} height={300} />
            </div>
            <div className={styles.rightBoxForm}>
              <form className={styles.formLogin}>
                <div>
                  <Input
                    type="text"
                    placeholder="EMAIL"
                    className={styles.input}
                    onChange={(event: any) =>
                      handleChange(event.target.value, setEmail)
                    }
                  />
                </div>
                <div>
                  <Input
                    type="password"
                    placeholder="PASSWORD"
                    className={styles.input}
                    onChange={(event: any) =>
                      handleChange(event.target.value, setPassword)
                    }
                  />
                </div>

                <Button className={styles.button} onClick={() => handleLogin()}>
                  Log in
                </Button>
              </form>
              <Divider plain className={styles.divider}>
                OR
              </Divider>

              <a className={styles.smallText} onClick={toggleRegister}>
                Dont have an account? Register Here!
              </a>
            </div>
          </div>
        ) : (
          <div className={styles.registration}>
            <div className={styles.rightBoxImg}>
              <div>
                <Button className={styles.goBackBtn} onClick={toggleRegister}>
                  Go back to Login
                </Button>
              </div>
              <div>
                <Image
                  src={Registration}
                  alt="login image"
                  width={400}
                  height={300}
                  className={styles.regImg}
                />
              </div>
            </div>
            <div className={styles.leftBoxForm}>
              <form className={styles.formReg}>
                <div>
                  <Input
                    type="text"
                    placeholder="Business name"
                    className={styles.input}
                    onChange={(event: any) =>
                      handleChange(event.target.value, setBusinessName)
                    }
                  />
                </div>
                <div>
                  <Input
                    type="text"
                    placeholder="Email"
                    className={styles.input}
                    onChange={(event: any) =>
                      handleChange(event.target.value, setEmail)
                    }
                  />
                </div>
                <div>
                  <Input
                    type="password"
                    placeholder="Password"
                    className={styles.input}
                    onChange={(event: any) =>
                      handleChange(event.target.value, setPassword)
                    }
                  />
                </div>
                <Button className={styles.button} onClick={handleRegistration}>
                  Register
                </Button>
              </form>
              <Divider plain className={styles.divider}>
                OR
              </Divider>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default LoginWindow;
