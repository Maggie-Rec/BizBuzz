'use client'

import React from 'react'
import styles from '../styles/SideBar.module.css'
import { useDispatch, useSelector } from 'react-redux'

const SideBar = () => {

  const currTab = useSelector((state: any) => state.currentTab);
  const dispatch = useDispatch();

  return (
    <div className={styles.containerSidebar}>
      <div
        className={styles.component}
        onClick={() => dispatch({ type: 'CHANGE_CURRENT_TAB', payload: 'dashboard' })}
      >Dashboard</div>
      <div
        className={styles.component}
        onClick={() => dispatch({ type: 'CHANGE_CURRENT_TAB', payload: 'reports' })}
      >Reports</div>
      <div className={styles.component}>Emails</div>
      <div className={styles.component}>Campaigns</div>
      <div
        className={styles.component}
        onClick={() => dispatch({ type: 'CHANGE_CURRENT_TAB', payload: 'locations' })}
      >Locations</div>
      <div className={styles.component}>Complaints</div>
      <div className={styles.component}>Employee Manager</div>
      <div className={styles.component}>Inventory</div>
      <div className={styles.component}>Competition Map</div>
    </div>
  );
}

export default SideBar