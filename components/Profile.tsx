
"use client";

import styles from "../styles/Profile.module.css";
import React, { useState } from "react";
import { Modal } from "antd";
import { UserOutlined } from "@ant-design/icons";

/* COMPONENTS */
import ProfileInfoTab from "./ProfileInfoTab";
import ChangePasswordTab from "./ChangePasswordTab";
import LogOutTab from "./LogOutTab";

const Profile = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openTab, setOpenTab] = useState(0);

  function handleOpenProfile() {
    if (!isModalOpen) setIsModalOpen(true);
  }

  return (
    <div className={styles.container} onClick={() => handleOpenProfile()}>
      <Modal
        title="Your Profile"
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(!isModalOpen)}
        style={{

          top: 20,

        }}
        width={1000}
      >
        <div className={styles.modal}>
          <div className={styles.firstRow}>
            <div className={styles.profilePic}></div>
            <h2>Bussiness Name</h2>
            <div className={styles.buttonContainer}>
              <span
                style={{ backgroundColor: openTab === 0 ? "" : "#E59500" }}
                onClick={() => setOpenTab(0)}

              >
                User Details
              </span>
              <span
                style={{ backgroundColor: openTab === 1 ? "" : "#E59500" }}
                onClick={() => setOpenTab(1)}
              >
                Change Password
              </span>
              <span
                style={{ backgroundColor: openTab === 2 ? "" : "#E59500" }}
                onClick={() => setOpenTab(2)}
              >
                Log Out
              </span>
            </div>
          </div>
          <div className={styles.secondRow}>
            {openTab === 0 && <ProfileInfoTab></ProfileInfoTab>}
            {openTab === 1 && <ChangePasswordTab></ChangePasswordTab>}
            {openTab === 2 && <LogOutTab></LogOutTab>}
          </div>
        </div>
      </Modal>
      <UserOutlined style={{ fontSize: "70px", color: "#FFC65C" }} />
    </div>
  );
};

export default Profile;

