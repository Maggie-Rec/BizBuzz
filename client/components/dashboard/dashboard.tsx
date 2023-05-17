import React, { useState, useEffect, ReactNode, useRef } from "react";
import styles from "../../styles/Dashboard.module.css";
import SMLCalendar from "../SmallCalendar";
import LineChart from "../widgets/LineChart/lineChart";
import PieMenu from "../widgets/PieChart/pieMenu";
import LineMenu from "../widgets/LineChart/lineMenu";
import BarMenu2 from "../widgets/BarChart2/barMenu2";
import ProgressMenu from "../widgets/Progress/ProgressMenu";
import BarChart from "../widgets/BarChart/barChart";
import ProgressChart from "../widgets/Progress/progressChart";
import { useSelector, useDispatch } from "react-redux";
import Note from "../widgets/Note";
import randomAlphaNumeric from "../../utils/randomizer";

import type { MenuProps } from "antd";
import {
  Button,
  Popover,
  Dropdown,
  Space,
  DatePicker,
  Modal,
  ConfigProvider,
} from "antd";
import {
  PieChartOutlined,
  BarChartOutlined,
  LineChartOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import DataUpload from "../DataUpload";

const { RangePicker } = DatePicker;
const Dashboard = () => {
  const [activeMenu, setActiveMenu] = useState<ReactNode>(undefined);
  const [openWidget, setOpenWidget] = useState<{ chartType?: string }>({});
  const [notes, setNotes] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);

  function handleUploadModal() {
    setShowUploadModal(!showUploadModal);
  };

  const widgetSelection = useSelector((state: any) => {
    return state.widgetSelection;
  });

  const dispatch = useDispatch();

  function refreshActiveMenu() {
    setActiveMenu(undefined);
  }
  const showWindow = (value: string) => {
    if (value === "bar-chart") {
      setActiveMenu(<BarMenu2 func={refreshActiveMenu} />);
    }
    if (value === "pie-chart") {
      setActiveMenu(<PieMenu func={refreshActiveMenu} />);
    }
    if (value === "line-chart") {
      setActiveMenu(<LineMenu func={refreshActiveMenu} />);
    }
    if (value === "progress-chart") {
      setActiveMenu(<ProgressMenu func={refreshActiveMenu} />);
    }
    // setOpenMenu(event.target.textContent);
  };

  // const showWidget = (chartType: string) => {
  //   setOpenWidget({ chartType });
  // };

  function handleOk() {
    setActiveMenu(undefined);
  }

  const handleCancel = () => {
    setActiveMenu(undefined);
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
          <PieChartOutlined style={{ fontSize: "20px", marginRight: "20px" }} />{" "}
          <h2 className={styles.dropdownText}>Pie Chart</h2>
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
          <BarChartOutlined style={{ fontSize: "20px", marginRight: "20px" }} />{" "}
          <h2 className={styles.dropdownText}>Bar Chart</h2>
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
            style={{ fontSize: "20px", marginRight: "20px" }}
          />
          <h2 className={styles.dropdownText}>Line Chart</h2>
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
          <DollarOutlined style={{ fontSize: "20px", marginRight: "20px" }} />{" "}
          <h2 className={styles.dropdownText}>Progress Chart</h2>
        </div>
      ),
    },
  ];

  let containerRef = useRef<HTMLElement>();

  function addNote() {
    setNotes([
      ...notes,
      {
        s: { width: 300, height: 300 },
        p: { x: 20, y: 10 },
        t: "",
        c: "",
        id: randomAlphaNumeric(),
      },
    ]);
  }

  useEffect(() => {
    dispatch({
      type: "REPOPULATE_DASHBOARD", // WITH WIDGETS
    });

    let localNotes = JSON.parse(window.localStorage.getItem("notes"));
    localNotes ? setNotes(localNotes) : undefined;
  }, []);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#f8b825",
        },
      }}
    >
      <div>
        <div className={styles.toolBar}>
          <Space wrap>
          <Button onClick={handleUploadModal}>Upload data</Button>
            <Popover content={calendar} trigger="click">
              <Button className={styles.calendarBtn}>Calendar</Button>
            </Popover>
          </Space>

          <Button type="default" onClick={addNote} className={styles.noteBtn}>
            Add a note
          </Button>

          <Dropdown
            overlayStyle={{ width: "300px" }}
            menu={{ items, selectable: true, selectedKeys: [''] }}
          >
            <Button type="primary" className={styles.widgetBtn}>
              Add Widget
            </Button>
          </Dropdown>
        </div>
        <div className={styles.containerDashboard} id="test"> 
          {/* TODO: HOOK UP THE LINE CHART TO THE WIDGETS REDUX STORE
          {openWidget.chartType === "Line Chart" && (
            <LineChart showWidget={() => setOpenWidget({})} />
          )} */}

          <section className={styles.widgetContainer} ref={containerRef}>
            {widgetSelection}
            {notes.map((item) => {
              console.log("re-rendering notes");
              return (
                <Note
                  s={item.s}
                  p={item.p}
                  t={item.t}
                  c={item.c}
                  id={item.id}
                  key={randomAlphaNumeric()}
                  setter={setNotes}
                  containerRef={containerRef}
                />
              );
            })}
          </section>

          {/* <Modal open={!!activeMenu} onOk={handleOk} onCancel={handleCancel}>
          </Modal> */}
            {!!activeMenu && activeMenu}
          { 
        showUploadModal ?
        <Modal open={showUploadModal} 
          footer={[
            <Button key={randomAlphaNumeric()} onClick={handleUploadModal}>Done</Button>
          ]}>
          { <DataUpload /> }
        </Modal> 
        : undefined  
      }
        </div>
      </div>
    </ConfigProvider>
  );
};

export default Dashboard;
