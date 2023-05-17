"use client";

import styles from "../styles/Profile.module.css";
import React, { useState, useEffect } from "react";
import { ConfigProvider } from "antd";
import { useSelector } from "react-redux";

/* COMPONENTS */
import ProfileInfoTab from "./ProfileInfoTab";
import ChangePasswordTab from "./ChangePasswordTab";
import LogOutTab from "./LogOutTab";

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openTab, setOpenTab] = useState(0);
  const [username, setUsername] = useState('')

 

  function handleOpenProfile() {
    if (!isModalOpen) setIsModalOpen(true);
  }

 useEffect(() => {
   // const cookies = cookieStore as cookieStore;
   const username = cookieStore.get("username").then((data) => {
     console.log(data);
     setUsername(data.value);
   });
 }, []);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#f8b825",
        },
      }}
    >
      <div onClick={() => handleOpenProfile()}>
        <div className={styles.modal}>
          <div className={styles.firstRow}>
            <div className={styles.profilePic}>
             <h1>Welcome!</h1>
            <h2>{username}</h2>
            </div>
            <div className={styles.buttonContainer}>
            
              <span
                style={{ backgroundColor: openTab === 1 ? "" : "#f9cf80" }}
                onClick={() => setOpenTab(1)}
              >
                Change Password
              </span>
              <span
                style={{ backgroundColor: openTab === 2 ? "" : "#f9cf80" }}
                onClick={() => setOpenTab(2)}
              >
                Log Out
              </span>
            </div>
          </div>
          <div className={styles.secondRow}>
       
            {openTab === 1 && <ChangePasswordTab></ChangePasswordTab>}
            {openTab === 2 && <LogOutTab></LogOutTab>}
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default Profile;
