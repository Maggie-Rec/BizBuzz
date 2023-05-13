import React, { useState, useEffect, ReactNode, useRef } from "react";
import styles from "../styles/Dashboard.module.css";
import SMLCalendar from "./SmallCalendar";
import LineChart from "./widgets/LineChart/lineChart";
import PieMenu from "./widgets/PieChart/pieMenu";
import LineMenu from "./widgets/LineChart/lineMenu";
import BarMenu from "./widgets/BarChart/barMenu";
import ProgressMenu from "./widgets/Progress/ProgressMenu";
import BarChart from "./widgets/BarChart/barChart";
import ProgressChart from "./widgets/Progress/progressChart";
import { useSelector, useDispatch } from "react-redux";
import Note from "./widgets/Note";

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
import randomAlphaNumeric from "../utils/randomizer";

const { RangePicker } = DatePicker;
const Dashboard = () => {
  const [activeMenu, setActiveMenu] = useState<ReactNode>();
  const [openWidget, setOpenWidget] = useState<{ chartType?: string }>({});
  const [notes, setNotes] = useState([]);

  const widgetSelection = useSelector((state: any) => {
    return state.widgetSelection;
  });

  const dispatch = useDispatch();

  const showWindow = (value: string) => {
    console.log(value);
    if (value === "bar-chart") {
      setActiveMenu(<BarMenu />);
    } if (value === "pie-chart") {
      setActiveMenu(<PieMenu />);
    } if (value === "line-chart") {
      setActiveMenu(<LineMenu showWidget={showWidget} />);
    } if (value === "progress-chart") {
      setActiveMenu(<ProgressMenu />);
    }
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

  let containerRef = useRef<HTMLElement>();

  function addNote() {
    setNotes([...notes, {
      s: { width: 300, height: 300 },
      p: { x: 10, y: 10 },
      t: "",
      c: "",
      id: randomAlphaNumeric()
    }])
  }

  useEffect(() => {
    dispatch({
      type: "REPOPULATE_DASHBOARD", // WITH WIDGETS
    });

    let localNotes = JSON.parse(window.localStorage.getItem("notes"));
    localNotes ? setNotes(localNotes) : undefined;

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
        <Button onClick={addNote}>Add a note</Button>
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

        <section className={styles.widgetContainer} ref={containerRef}>
          {widgetSelection}
          {notes.map((item) => {
            console.log('re-rendering notes');
            return <Note
              s={item.s}
              p={item.p}
              t={item.t}
              c={item.c}
              id={item.id}
              key={randomAlphaNumeric()}
              setter={setNotes}
            />
          })}
        </section>

        <Modal open={!!activeMenu} onOk={handleOk} onCancel={handleCancel}>
          {activeMenu}
        </Modal>
      </div>
    </div>
  );
};

export default Dashboard;
