'use client';

import styles from '../styles/Profile.module.css';
import React, { useState } from 'react';
import { Button, Modal, ModalProps } from "antd";

const Profile = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openTab, setOpenTab] = useState(0);

  function handleOpenProfile () {
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
          top: 20
        }}
        width={1000}
      >
        <div className={styles.modal}>
          <div className={styles.firstRow}>
            <div className={styles.profilePic}></div>
            <h2>Bussiness Name</h2>
            <div className={styles.buttonContainer}>
              <span 
                style={{backgroundColor: openTab === 0 ? "" : "#E59500"}}
                onClick={() => setOpenTab(0)}
              >Bussiness Info</span>
              <span 
                style={{backgroundColor: openTab === 1 ? "" : "#E59500"}}
                onClick={() => setOpenTab(1)}  
              >Change Password</span>
              <span 
                style={{backgroundColor: openTab === 2 ? "" : "#E59500"}}
                onClick={() => setOpenTab(2)}  
              >Log Out</span>
            </div>
          </div>
          <div className={styles.secondRow}>
            {openTab === 0 && 
              <h1>Bussiness Info</h1>
            }
            {openTab === 1 && 
              <h1>Change Password</h1>
            }
            {openTab === 2 && 
              <h1>Log Out</h1>
            }
          </div>
        </div>
      </Modal>
    </div>
  )
}


export default Profile;