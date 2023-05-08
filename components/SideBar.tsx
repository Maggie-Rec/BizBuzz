'use client'

import React from 'react'
import styles from '../styles/SideBar.module.css'

const SideBar = () => {
  return (
    <div className={styles.containerSidebar}>
      <div className={styles.component}>Reports</div>
      <div className={styles.component}>Emails</div>
      <div className={styles.component}>Campaigns</div>
      <div className={styles.component}>Complaints</div>
      <div className={styles.component}>Employee Manager</div>
      <div className={styles.component}>Inventory</div>
      <div className={styles.component}>Competition Map</div>
    </div>
  );
}

export default SideBar