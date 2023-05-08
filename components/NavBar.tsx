"use client";

import React from "react";
import styles from '../styles/NavBar.module.css'
import type { MenuProps } from "antd";
import { Button, Dropdown, Space } from "antd";
import Profile from "./Profile";

const NavBar = () => {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <a>Profile</a>,
    },
    {
      key: "2",
      label: <a>Logout</a>,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.logo}>Logo</div>
      <h1 className={styles.title}>BizBuzz Dashboard</h1>
      <div className={styles.user}>
        <div className={styles.dropdown}>
          <Space direction="vertical">
            <Space wrap>
              <Dropdown menu={{ items }} placement="bottom">
                <Button>dropdown</Button>
              </Dropdown>
            </Space>
          </Space>
        </div>
        <Profile></Profile>
      </div>
    </div>
  );
};

export default NavBar;
