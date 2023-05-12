import React, { useState } from "react";
import { Space, Select, Button, DatePicker } from "antd";
import styles from "../../../styles/widgets/barChart.module.css";
import { useDispatch } from "react-redux";
import BarChart from "./barChart";

const { RangePicker } = DatePicker;
const BarMenu = () => {
  const dispatch = useDispatch();
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [monthStart, setMonthStart] = useState("");
  const [monthEnd, setMonthEnd] = useState("");

  const addWidget = () => {
    function newBarChart() {
      return (
        <BarChart
          barChartSelection={[option1, option2, option3]}
          barChartPeriod = {monthArray}
          id={Date.now()}
          key={Date.now()}
          type={"BarChart"}
        />
      );
    }

    dispatch({
      type: "ADD_WIDGET",
      payload: newBarChart(),
    });
  };

  const allMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const handleChange = (string: string[]) => {
    const monthNumber1: Number = new Date(string[0]).getMonth();
    const monthNumber2: Number = new Date(string[1]).getMonth();

    const getMonthName = (monthNumber) => {
      return allMonths[monthNumber];
    };

    setMonthStart(getMonthName(monthNumber1));
    setMonthEnd(getMonthName(monthNumber2));
  };

  const monthArray = () => {
    let startIndex = allMonths.indexOf(monthStart);
    let endIndex = allMonths.indexOf(monthEnd);

    let monthsArray: string[] = [];

    for (let i = startIndex; i <= endIndex; i++) {
      monthsArray.push(allMonths[i]);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Bar Chart</h1>
      <Space wrap>
        <Select
          defaultValue="option"
          style={{ width: 120 }}
          onChange={setOption1}
          className={styles.input}
          options={[
            { value: "location", label: "Location" },
            { value: "quantity", label: "Item Quantity" },
            { value: "membership", label: "Membership" },
            { value: "tax", label: "Tax" },
            { value: "age", label: "Age" },
            { value: "gender", label: "Gender" },
            { value: "units", label: "Units" },
            { value: "category", label: "Item Category" },
            { value: "region", label: "Location Region" },
          ]}
        />
        <Select
          defaultValue="option"
          style={{ width: 120 }}
          onChange={setOption2}
          className={styles.input}
          options={[
            { value: "location", label: "Location" },
            { value: "quantity", label: "Item Quantity" },
            { value: "membership", label: "Membership" },
            { value: "tax", label: "Tax" },
            { value: "age", label: "Age" },
            { value: "gender", label: "Gender" },
            { value: "units", label: "Units" },
            { value: "category", label: "Item Category" },
            { value: "region", label: "Location Region" },
          ]}
        />

        <Select
          defaultValue="option"
          style={{ width: 120 }}
          onChange={setOption3}
          className={styles.input}
          options={[
            { value: "location", label: "Location" },
            { value: "quantity", label: "Item Quantity" },
            { value: "membership", label: "Membership" },
            { value: "tax", label: "Tax" },
            { value: "age", label: "Age" },
            { value: "gender", label: "Gender" },
            { value: "units", label: "Units" },
            { value: "category", label: "Item Category" },
            { value: "region", label: "Location Region" },
          ]}
        />

        <Space direction="vertical" size={12}>
          <RangePicker
            picker="month"
            onChange={(value, string) => handleChange(string)}
          />
        </Space>
      </Space>
      <Button onClick={addWidget}>Display</Button>
    </div>
  );
};

export default BarMenu;
