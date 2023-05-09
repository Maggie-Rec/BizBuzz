"use client";

import React from "react";
import styles from "../styles/Dashboard.module.css";
import SMLCalendar from "./SmallCalendar";

import type { MenuProps } from "antd";
import { Button, Popover, Dropdown, Space, Segmented, DatePicker } from "antd";
import {
  PieChartOutlined,
  AreaChartOutlined,
  BarChartOutlined,
  LineChartOutlined,
  DollarOutlined,
} from "@ant-design/icons";

const { RangePicker } = DatePicker;
const Dashboard = () => {
  const calendar = <SMLCalendar />;

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div style={{ display: "flex" }}>
          <AreaChartOutlined
            style={{ fontSize: "40px", marginRight: "20px" }}
          />{" "}
          <h2>Area Chart</h2>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div style={{ display: "flex" }}>
          <PieChartOutlined style={{ fontSize: "40px", marginRight: "20px" }} />{" "}
          <h2>Pie Chart</h2>
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div style={{ display: "flex" }}>
          <BarChartOutlined style={{ fontSize: "40px", marginRight: "20px" }} />{" "}
          <h2>Bar Chart</h2>
        </div>
      ),
    },
    {
      key: "4",
      label: (
        <div style={{ display: "flex" }}>
          <LineChartOutlined
            style={{ fontSize: "40px", marginRight: "20px" }}
          />
          <h2>Line Chart</h2>
        </div>
      ),
    },
    {
      key: "5",
      label: (
        <div style={{ display: "flex" }}>
          <DollarOutlined style={{ fontSize: "40px", marginRight: "20px" }} />{" "}
          <h2>Big number Chart</h2>
        </div>
      ),
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
        <Dropdown
          overlayStyle={{ width: "300px" }}
          menu={{ items, selectable: true }}
        >
          <Button>Add Widget</Button>
        </Dropdown>
      </div>
    </div>
  );
};

export default Dashboard;
