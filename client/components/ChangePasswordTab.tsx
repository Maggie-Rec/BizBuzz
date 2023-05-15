'use client';

import styles from '../styles/ChangePasswordTab.module.css';
import React from 'react'
import { Button, Input } from 'antd';

const ChangePasswordTab = () => {
  return (
    <div className={styles.container}>
      <h2>Change Your Password</h2>
      <div className={styles.formWrapper}>
        <div>
          <p>New Password</p>
          <Input.Password></Input.Password>
        </div>
        <div>
          <p>Repeat New Password</p>
          <Input.Password></Input.Password>
        </div>
        <Button
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
}

export default ChangePasswordTab