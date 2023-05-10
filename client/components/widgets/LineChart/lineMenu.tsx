import React, { useState } from "react";
import { Select, Space, Button, Cascader, DatePicker } from "antd";
import styles from "../../../styles/widgets/lineChart.module.css";
import { DataFilter } from './dataFilter';
const { RangePicker } = DatePicker;

interface Props {
  showWidget: (arg0: string) => void;
}
const LineMenu = ({ showWidget }: Props) => {
  const [yAxis, setYaxis] = useState(['salesValue', 'acrossLocations']);
  const [xAxis, setXaxis] = useState(['time', 'month']);

  const openWidget = () => {
    showWidget("Line Chart");
  };
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  return (
    <div className={styles.container}>
      <h1>Line Graph</h1>
      <Space wrap>
        <p>Y-axis:</p>
        <Cascader
          aria-label="Y-axis"
          style={{ width: 300 }}
          onChange={(value: string[]) => { setYaxis(value) }}
          className={styles.input}
          options={[
            {
              value: 'salesQuantity',
              label: 'Number of goods sold',
              children: [{
                value: 'acrossLocations',
                label: 'Across all locations',
              }, {
                value: 'inEachLocation',
                label: 'In each location'
              }]
            },
            {
              value: 'salesValue',
              label: 'Value of goods sold',
              children: [{
                value: 'acrossLocations',
                label: 'Across all locations',
              }, {
                value: 'inEachLocation',
                label: 'In each location'
              }]
            },
            {
              value: 'transactionsQuantity',
              label: 'Number of transactions',
              children: [{
                value: 'acrossLocations',
                label: 'Across all locations',
              }, {
                value: 'inEachLocation',
                label: 'In each location'
              }]
            },
          ]}
        />
        <Space />
        <p>X-axis:</p>
        <Cascader
          aria-label="X-axis"
          style={{ width: 300 }}
          onChange={(value: string[]) => { setXaxis(value) }}
          className={styles.input}
          options={[
            {
              value: "time",
              label: "Time",
              children: [{
                value: "year",
                label: "Per Year"
              }, {
                value: "quarter",
                label: "Per Quarter"
              }, {
                value: "month",
                label: "Per Month"
              }, {
                value: "week",
                label: "Per Week"
              }, {
                value: "day",
                label: "Per Day"
              }]
            },
            {
              value: "customerAge",
              label: 'Customer Age',
              children: []
            },
          ]}
        />
        {
          xAxis[0] === 'time' ?
            <Space>
              <p>Between</p>
              <RangePicker
                picker={xAxis[1]}
                style={{ width: 300 }}
              />
            </Space>
            : <></>
        }


        <DataFilter isLast={true} />

      </Space>
      <Button onClick={openWidget}>Display</Button>
    </div>
  );
};

export default LineMenu;
