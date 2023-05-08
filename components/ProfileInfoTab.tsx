'use client';

import styles from '../styles/ProfileInfoTab.module.css';
import React from 'react'
import { Collapse } from 'antd';
const { Panel } = Collapse;

const ProfileInfoTab = () => {
  return (
    <div className={styles.container}>
      <h2>Bussiness Details</h2>
      <Collapse accordion
        style={{width: "30vw"}}
      >
        <Panel header='Your Details' key={1} style={{fontWeight: "bold"}}>
          <p>Your First Name</p>
          <p>Your Last Name</p>
        </Panel>
        <Panel header='Your Bussiness Details' key={2} style={{fontWeight: "bold"}}></Panel>
        <Panel header='Your Locations' key={3} style={{fontWeight: "bold"}}>
          <p>- Barcelona</p>
          <p>- London</p>
          <p>- Berlin</p>
        </Panel>
      </Collapse>
    </div>
  )
}

export default ProfileInfoTab