import React, { useEffect, useState } from "react";
import { Space, Select, Button, DatePicker, Modal } from "antd";
import styles from "../../../styles/widgets/barChart.module.css";
import { useDispatch } from "react-redux";
import BarChart from "./barChart";
import { generateQuery } from "../../../utils/queryKing";

const { RangePicker } = DatePicker;
const BarMenu = ({ func }) => {
  const dispatch = useDispatch();
  const [option1, setOption1] = useState("");
  const [dbDates, setDBDates] = useState([]);
  // // const [option2, setOption2] = useState("");
  // // const [option3, setOption3] = useState("");

  const [period, setPeriod] = useState([] as string[]);
  const [isShowing, setIsShowing] = useState(true);

  const addWidget = () => {
    dispatch({
      type: "ADD_WIDGET",
      payload: (
        <BarChart
          barChartSelection={[option1]}
          barChartPeriod={monthArray(period)}
          id={Date.now()}
          key={Date.now()}
          period={period}
          selectedData={generateQuery(dbDates)}
        />
      ),
    });
    handleCancel();
  };

  const monthArray = (string) => {
    const allYear = [
      "2023-01",
      "2023-02",
      "2023-03",
      "2023-04",
      "2023-05",
      "2023-06",
      "2023-07",
      "2023-08",
      "2023-09",
      "2023-10",
      "2023-11",
      "2023-12",
    ];

    const getDates = (start: string, end: string): string[] => {
      const startDate = new Date(start).getMonth();
      const endDate = new Date(end).getMonth();
      const dates: string[] = [];

      for (let i: any = startDate; i <= endDate; i++) {
        const date = new Date(`${allYear[i]}-01T00:00:00.000Z`);
        dates.push(date.toISOString());
      }

      return dates;
    };

    setDBDates(getDates(string[0], string[1]));
    console.log(dbDates);

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
    const monthNumber1 = new Date(period[0]).getMonth();
    const monthNumber2 = new Date(period[1]).getMonth();

    console.log(monthNumber1);

    let selectedMonths: string[] = [];

    for (let i: any = monthNumber1; i <= monthNumber2; i++) {
      selectedMonths.push(allMonths[i]);
    }

    return selectedMonths;
  };

  useEffect(() => {
    setIsShowing(true);
  }, []);

  function handleCancel() {
    setIsShowing(!isShowing);
    func();
  }

  return (
    <Modal
      open={isShowing}
      onCancel={() => handleCancel()}
      cancelButtonProps={{ style: { display: "none" } }}
      onOk={addWidget}
    >
      <div className={styles.container}>
        <h1>Bar Chart</h1>
        <Space wrap>
          {/* <Select
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
        /> */}
          {/* <Select
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
        /> */}

          <Select
            defaultValue="option"
            style={{ width: 120 }}
            onChange={setOption1}
            className={styles.input}
            options={[
              { value: "1", label: "Total items sold" },
              {
                value: "2",
                label: "Total amount of customers",
              },
              {
                value: "3",
                label: "Total amount of customers",
              },
              {
                value: "4",
                label: "Total amount of customers",
              },
            ]}
          />

          <Space direction="vertical" size={12}>
            <RangePicker
              picker="month"
              onChange={(value, string) => setPeriod(string)}
            />
          </Space>
        </Space>
      </div>
    </Modal>
  );
};

export default BarMenu;
