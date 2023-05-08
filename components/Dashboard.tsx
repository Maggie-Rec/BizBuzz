"use client";

import React from "react";
import styles from "../styles/Dashboard.module.css";
import SMLCalendar from "./SmallCalendar";

import type { MenuProps } from "antd";
import { Button, Popover, Dropdown, Space, Segmented, DatePicker } from "antd";


const { RangePicker } = DatePicker;
const Dashboard = () => {
  const calendar = <SMLCalendar />;

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "widget 1",
    },
    {
      key: "2",
      label: "widget 2",
    },
    {
      key: "3",
      label: "widget 3",
    },
    {
      key: "4",
      label: "widget 4",
    },
    {
      key: "5",
      label: "widget 5",
    },
  ];

  return (
    <div className={styles.containerDashboard}>
      <div className={styles.toolBar}>
        <Space wrap>
          <Popover content={calendar} trigger="click">
            <Button className={styles.calendarBtn}>Calendar</Button>
          </Popover>
        </Space>
        <div>
          <Segmented
            options={["Daily", "Weekly", "Monthly", "Quarterly", "Yearly"]}
          />

          <Space direction="vertical" size={12}>
            <RangePicker className={styles.dateSelector} />
          </Space>
        </div>
        <Dropdown menu={{ items, selectable: true }}>
          <Button>Add Widget</Button>
        </Dropdown>
      </div>
    </div>
  );
};

export default Dashboard;
