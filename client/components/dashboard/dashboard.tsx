import React, { useState, useEffect, ReactNode } from "react";
import styles from "../../styles/Dashboard.module.css";
import SMLCalendar from "../SmallCalendar";
import LineChart from "../widgets/LineChart/lineChart";
import PieMenu from "../widgets/PieChart/pieMenu";
import LineMenu from "../widgets/LineChart/lineMenu";
import BarMenu from "../widgets/BarChart/barMenu";
import ProgressMenu from "../widgets/Progress/ProgressMenu";
import BarChart from "../widgets/BarChart/barChart";
import ProgressChart from "../widgets/Progress/progressChart";
import { useSelector, useDispatch } from "react-redux";

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
  const [activeMenu, setActiveMenu] = useState<ReactNode>();
  const [openWidget, setOpenWidget] = useState<{ chartType?: string }>({});

  const widgetSelection = useSelector((state: any) => {
    return state.widgetSelection;
  });

  const dispatch = useDispatch();

  function refreshActiveMenu() {
    setActiveMenu(undefined);
  }

  const showWindow = (value: string) => {
<<<<<<< HEAD:client/components/Dashboard.tsx
    console.log(value);
    if (value === "bar-chart") {
      setActiveMenu(<BarMenu />);
    } if (value === "pie-chart") {
      setActiveMenu(<PieMenu />);
    } if (value === "line-chart") {
      setActiveMenu(<LineMenu showWidget={showWidget} />);
    } if (value === "progress-chart") {
      setActiveMenu(<ProgressMenu />);
=======
    if (value === "bar-chart") {
      setActiveMenu(<BarMenu func={refreshActiveMenu} />);
    }
    if (value === "pie-chart") {
      setActiveMenu(<PieMenu func={refreshActiveMenu} />);
    }
    if (value === "line-chart") {
      setActiveMenu(<LineMenu showWidget={showWidget} />);
    }
    if (value === "progress-chart") {
      setActiveMenu(<ProgressMenu showWidget={showWidget} />);
>>>>>>> db-connection:client/components/dashboard/dashboard.tsx
    }
    // setOpenMenu(event.target.textContent);
  };

  const showWidget = (chartType: string) => {
    setOpenWidget({ chartType });
  };

  function handleOk() {
    setActiveMenu(false);
  };

  const handleCancel = () => {
    setActiveMenu(false);
  };

  const calendar = <SMLCalendar />;

  const items: MenuProps["items"] = [
    {
      key: "2",
      label: (
        <div
          style={{ display: "flex" }}
          onClick={() => showWindow("pie-chart")}
        >
          <PieChartOutlined style={{ fontSize: "40px", marginRight: "20px" }} />{" "}
          <h2>Pie Chart</h2>
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div
          style={{ display: "flex" }}
          onClick={() => showWindow("bar-chart")}
        >
          <BarChartOutlined style={{ fontSize: "40px", marginRight: "20px" }} />{" "}
          <h2>Bar Chart</h2>
        </div>
      ),
    },
    {
      key: "4",
      label: (
        <div
          style={{ display: "flex" }}
          onClick={() => showWindow("line-chart")}
        >
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
        <div
          style={{ display: "flex" }}
          onClick={() => showWindow("progress-chart")}
        >
          <DollarOutlined style={{ fontSize: "40px", marginRight: "20px" }} />{" "}
          <h2>Progress Chart</h2>
        </div>
      ),
    },
  ];

  useEffect(() => {
    dispatch({
      type: "REPOPULATE_DASHBOARD",
    });
  }, []);

  return (
    <div>
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
      <div className={styles.containerDashboard}>
        {/* TODO: HOOK UP THE LINE CHART TO THE WIDGETS REDUX STORE */}
        {openWidget.chartType === "Line Chart" && (
          <LineChart showWidget={() => setOpenWidget({})} />
        )}

        <section className={styles.widgetContainer}>{widgetSelection}</section>

        {/* <Modal open={!!activeMenu} onOk={handleOk} onCancel={handleCancel}> */}
        {activeMenu}
        {/* </Modal> */}
      </div>
    </div>
  );
};

export default Dashboard;
