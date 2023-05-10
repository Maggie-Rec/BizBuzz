"use client";

import React, { useState } from "react";
import styles from "../styles/Dashboard.module.css";
import SMLCalendar from "./SmallCalendar";
import LineChart from "./widgets/LineChart/lineChart";
import PieMenu from "./widgets/PieChart/pieMenu";
import LineMenu from "./widgets/LineChart/lineMenu";
import BarMenu from "./widgets/BarChart/barMenu";
import ProgressMenu from "./widgets/Progress/ProgressMenu";
import PieChart from "./widgets/PieChart/pieChart";
import BarChart from "./widgets/BarChart/barChart";
import ProgressChart from "./widgets/Progress/progressChart";

import type { MenuProps } from "antd";
import {
  Button,
  Popover,
  Dropdown,
  Space,
  Segmented,
  DatePicker,
  Modal,
} from "antd";
import {
  PieChartOutlined,
  BarChartOutlined,
  LineChartOutlined,
  DollarOutlined,
} from "@ant-design/icons";

const { RangePicker } = DatePicker;
const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState("");
  const [openWidget, setOpenWidget] = useState<{ chartType?: string }>({});

  const showWindow = (event: any) => {
    setIsOpen(true);
    setOpenMenu(event.target.textContent);
  };

  const showWidget = (chartType: string) => {
    setOpenWidget({ chartType });
    
  };
  const handleOk = () => {
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const calendar = <SMLCalendar />;

  const items: MenuProps["items"] = [
    {
      key: "2",
      label: (
        <div style={{ display: "flex" }} onClick={(event) => showWindow(event)}>
          <PieChartOutlined style={{ fontSize: "40px", marginRight: "20px" }} />{" "}
          <h2>Pie Chart</h2>
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div style={{ display: "flex" }} onClick={showWindow}>
          <BarChartOutlined style={{ fontSize: "40px", marginRight: "20px" }} />{" "}
          <h2>Bar Chart</h2>
        </div>
      ),
    },
    {
      key: "4",
      label: (
        <div style={{ display: "flex" }} onClick={showWindow}>
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
        <div style={{ display: "flex" }} onClick={showWindow}>
          <DollarOutlined style={{ fontSize: "40px", marginRight: "20px" }} />{" "}
          <h2>Progress Chart</h2>
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

      {openWidget.chartType === "Pie Chart" && (
        <PieChart showWidget={() => setOpenWidget({})} />
      )}
      {openWidget.chartType === "Bar Chart" && (
        <BarChart showWidget={() => setOpenWidget({})} />
      )}
      {openWidget.chartType === "Line Chart" && (
        <LineChart showWidget={() => setOpenWidget({})} />
      )}
      {openWidget.chartType === "Progress Chart" && (
        <ProgressChart showWidget={() => setOpenWidget({})} />
      )}

      <Modal
        // title="insert data"
        open={isOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {(() => {
          switch (openMenu) {
            case "Pie Chart":
              return <PieMenu showWidget={showWidget} />;
            case "Bar Chart":
              return <BarMenu showWidget={showWidget} />;
            case "Line Chart":
              return <LineMenu showWidget={showWidget} />;
            case "Progress Chart":
              return <ProgressMenu showWidget={showWidget} />;
            default:
              return null;
          }
        })()}
      </Modal>
    </div>
  );
};

export default Dashboard;
