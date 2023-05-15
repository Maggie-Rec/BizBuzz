
import styles from '../styles/LogOutTab.module.css';
import React from 'react';
import { Button } from 'antd';

const LogOutTab = () => {
  return (
    <div className={styles.container}>
      <Button
        type="primary"
        style={{
          backgroundColor: "#f8b825",
          fontWeight: "bold",
        }}
        size="large"
      >
        LOG OUT
      </Button>
    </div>
  );
}

export default LogOutTab;