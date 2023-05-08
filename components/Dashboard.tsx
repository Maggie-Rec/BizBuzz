'use client'

import React from "react";
import styles from '../styles/Dashboard.module.css'
import type { MenuProps } from "antd";
import { Button, Dropdown, Space } from "antd";

const Dashboard = () => {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <a>filer1</a>,
    },
    {
      key: "2",
      label: <a>filer2</a>,
    },
    {
      key: "3",
      label: <a>filer3</a>,
    },
    {
      key: "4",
      label: <a>filer4</a>,
    },
    {
      key: "5",
      label: <a>filer5</a>,
    },
  ];
  return (
    <div className={styles.containerDashboard}>
      <div className={styles.toolBar}>
        <div>
          <Space direction="vertical">
            <Space wrap>
              <Dropdown menu={{ items }} placement="bottom">
                <div className={styles.button}>
                  <Button size="large">Filter by</Button>
                </div>
              </Dropdown>
            </Space>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
