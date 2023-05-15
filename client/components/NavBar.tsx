"use client"

import React from "react";
import styles from '../styles/NavBar.module.css'
import type { MenuProps } from "antd";
import { Button, Dropdown, Space } from "antd";
import Profile from "./Profile";
import Image from "next/image";
import logo from "../assets/logo1.png";

const NavBar = () => {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div>
          <Profile />
        </div>
      ),
    },
    {
      key: "2",
      label: <a>Logout</a>,
    },
  ];

  return (
    <div className={styles.container}>
      {/* <div className={styles.logo}>Logo</div> */}
      <Image src={logo} height={200} alt="bee" />
      <h1 className={styles.title}>BizBuzz Dashboard</h1>
      <div className={styles.user}>
        <div className={styles.dropdown}>
          <Space direction="vertical">
            <Space wrap>
              <Dropdown menu={{ items, selectable: true}} placement="bottom">
                <Button>Menu</Button>
              </Dropdown>
            </Space>
          </Space>
        </div>
        <Profile />
      </div>
    </div>
  );
};

export default NavBar;
