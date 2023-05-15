'use client';

import styles from '../styles/ProfileInfoTab.module.css';
import React, { useState } from 'react'
import { Collapse, Input, Button } from 'antd';
const { Panel } = Collapse;

const ProfileInfoTab = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState(['', '']);

  function handleChange() {
    // ...
  }


  return (
    <>
      <div className={styles.container}>
        <h2>Bussiness Details</h2>
        <Collapse accordion style={{ width: "30vw" }}>
          <Panel header="Your Details" key={1} style={{ fontWeight: "bold" }}>
            <p>Your First Name</p>
            <p>Your Last Name</p>
          </Panel>
          <Panel
            header="Your Bussiness Details"
            key={2}
            style={{ fontWeight: "bold" }}
          ></Panel>
          <Panel header="Your Locations" key={3} style={{ fontWeight: "bold" }}>
            <p>- Barcelona</p>
            <p>- London</p>
            <p>- Berlin</p>
          </Panel>
          <Panel header="Update your details" key={4}>
            <Input
              type="text"
              placeholder="First Name"
              className={styles.businessInput}
            />
            <Input
              type="text"
              placeholder="Last Name"
              className={styles.businessInput}
            />
            <h3>Business Address</h3>
            <Input
              type="text"
              placeholder="Number and Street name"
              className={styles.businessInput}
            />
            <Input
              type="text"
              placeholder="Post code"
              className={styles.businessInput}
            />
            <Input
              type="text"
              placeholder="Region"
              className={styles.businessInput}
            />
            <Input
              type="text"
              placeholder="City"
              className={styles.businessInput}
            />
            <Input
              type="text"
              onChange={handleChange}
              placeholder="Type: (Onsite / Online)"
              className={styles.businessInput}
            />
            <Button type='primary'>Submit</Button>
          </Panel>
        </Collapse>
      </div>
    </>
  );
}

export default ProfileInfoTab