import React, { useState, useEffect } from "react";
import { Select, Space, Button, Cascader, DatePicker, Slider } from "antd";
import styles from "../../../styles/widgets/lineChart.module.css";
import { DataFilter } from "./dataFilter";
import { useDispatch } from "react-redux";
const { RangePicker } = DatePicker;

interface Props {
  showWidget: (arg0: string) => void;
}
type ValidXAxis =
  | ["time" | "age", "time" | "month" | "day" | "week" | "quarter" | "year"]
  | undefined;

const LineMenu = ({ showWidget }: Props) => {
  const [yAxis, setYaxis] = useState(["salesValue", "acrossLocations"]);
  const [xAxis, setXaxis] = useState<ValidXAxis>(["time", "month"]);
  const [xStartEnd, setXStartEnd] = useState({ start: Date(), end: Date() } as {
    start: any;
    end: any;
  });

  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch({ type: "FETCH_DATA" });
    showWidget("Line Chart");
  };
  const filterOptions = [
    { value: "location", label: "Location" },
    {
      value: "gender",
      label: "Gender",
      baseFilterObject: { gender: ["male", "female"] },
    },
    {
      value: "region",
      label: "Location Region",
      baseFilterObject: { region: ["Greater London"] },
    },
    {
      value: "quantity",
      label: "Item Quantity",
      baseFilterObject: { quantity: { gt: 0, lt: 100 } },
    },
    {
      value: "age",
      label: "Age",
      baseFilterObject: { quantity: { gt: 0, lt: 100 } },
    },
    {
      value: "is_member",
      label: "Membership",
      baseFilterObject: { is_member: true },
    },
    {
      value: "category",
      label: "Item Category",
      baseFilterObject: { category: "" },
    },
  ];

  const [filters, setFilters] = useState([]);

  function handleNewFilter(value: string) {
    setFilters(value);
  }
  const filterDetails = filters.map((filter, i) => {
    return <DataFilter filter={filter} key={i} />;
  });
  useEffect(() => {
    dispatch({
      type: "SET_AXES",
      payload: {
        y: yAxis,
        x: xAxis,
      },
    });
  }, [yAxis, xAxis]);
  useEffect(() => {
    dispatch({
      type: "SET_DATES",
      payload: xStartEnd,
    });
  }, [xStartEnd]);

  return (
    <div className={styles.container}>
      <Button
        style={{
          color: "white",
          backgroundColor: "red",
        }}
        onClick={() => {
          dispatch({
            type: "SET_AXES",
            payload: {
              x: ["time", "month"],
              y: ["salesValue", "acrossLocations"],
            },
          });
          dispatch({
            type: "SET_DATES",
            payload: {
              start: { year: 2022, month: 9 },
              end: { year: 2023, month: 3 },
            },
          });
          dispatch({
            type: "ADD_FILTER",
            payload: {
              obj: { is_member: [true] },
              filter: "is_member",
            },
          });
        }}
      >
        Shortcut for testing purposes only
      </Button>
      <h1>Line Graph</h1>
      <Space wrap>
        <p>Y-axis:</p>
        <Cascader
          aria-label="Y-axis"
          style={{ width: 300 }}
          onChange={(value: string[]) => {
            setYaxis(value);
          }}
          className={styles.input}
          multiple
          options={[
            {
              value: "salesQuantity",
              label: "Number of goods sold",
              children: [
                {
                  value: "acrossLocations",
                  label: "Across all locations",
                },
                {
                  value: "inEachLocation",
                  label: "In each location",
                },
                {
                  value: "inSpecificLocations",
                  label: "In specific locations",
                  children: [
                    { value: 0, label: "mock location 0" },
                    { value: 1, label: "mock location 1" },
                    { value: 2, label: "mock location 2" },
                    { value: 3, label: "mock location 3" },
                    { value: 4, label: "mock location 4" },
                  ],
                },
              ],
            },
            {
              value: "salesValue",
              label: "Value of goods sold",
              children: [
                {
                  value: "acrossLocations",
                  label: "Across all locations",
                },
                {
                  value: "inEachLocation",
                  label: "In each location",
                },
                {
                  value: "inSpecificLocations",
                  label: "In specific locations",
                  children: [
                    { value: 0, label: "mock location 0" },
                    { value: 1, label: "mock location 1" },
                    { value: 2, label: "mock location 2" },
                    { value: 3, label: "mock location 3" },
                    { value: 4, label: "mock location 4" },
                  ],
                },
              ],
            },
            {
              value: "transactionsQuantity",
              label: "Number of transactions",
              children: [
                {
                  value: "acrossLocations",
                  label: "Across all locations",
                },
                {
                  value: "inEachLocation",
                  label: "In each location",
                },
                {
                  value: "inSpecificLocations",
                  label: "In specific locations",
                  children: [
                    { value: 0, label: "mock location 0" },
                    { value: 1, label: "mock location 1" },
                    { value: 2, label: "mock location 2" },
                    { value: 3, label: "mock location 3" },
                    { value: 4, label: "mock location 4" },
                  ],
                },
              ],
            },
          ]}
        />
        <Space />
        <p>X-axis:</p>
        <Cascader
          aria-label="X-axis"
          style={{ width: 300 }}
          onChange={(value: ValidXAxis) => {
            setXaxis(value);
          }}
          className={styles.input}
          options={[
            {
              value: "time",
              label: "Time",
              children: [
                {
                  value: "year",
                  label: "Per Year",
                },
                {
                  value: "quarter",
                  label: "Per Quarter",
                },
                {
                  value: "month",
                  label: "Per Month",
                },
                {
                  value: "week",
                  label: "Per Week",
                },
                {
                  value: "day",
                  label: "Per Day",
                },
              ],
            },
            {
              value: "customerAge",
              label: "Registered Customer Age",
              children: [],
            },
          ]}
        />
        {xAxis && xAxis[0] === "time" ? (
          <Space>
            <p>Between</p>
            <RangePicker
              picker={xAxis[1]}
              style={{ width: 300 }}
              onChange={(value) => {
                const [start, end] = [
                  { year: value[0].year() },
                  { year: value[1].year() },
                ] as [any, any];
                if (xAxis[1] === "year") {
                  setXStartEnd({ start, end });
                  return;
                }
                start.month = value[0].month() + 1;
                end.month = value[1].month() + 1;
                if (xAxis[1] === "day" || xAxis[1] === "week") {
                  start.day = value[0].day();
                  end.day = value[1].day();
                }
                setXStartEnd({ start, end });
              }}
            />
          </Space>
        ) : (
          <Slider style={{ width: 300 }} defaultValue={[18, 65]} range />
        )}
        <Space>
          <p>Filter by:</p>
          <Select
            mode="multiple"
            options={filterOptions}
            style={{ width: 180 }}
            onChange={handleNewFilter}
          />
        </Space>
        {filterDetails}
      </Space>
      <Button onClick={handleSubmit}>Display</Button>
    </div>
  );
};

export default LineMenu;
