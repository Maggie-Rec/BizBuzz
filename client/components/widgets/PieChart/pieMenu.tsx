'use client'

import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { Space, Select, Button } from "antd";
import styles from "../../../styles/widgets/pieMenu.module.css";

interface Props {
  showWidget: (arg0: string) => void,
  setPieChartSelection: Dispatch<SetStateAction<string[]>>
}
const PieMenu = ({ showWidget, setPieChartSelection }: Props) => {
  const [period, setPeriod] = useState('');
  const [dataType, setDataType] = useState('');

  function handleChange(value: string,
    setter: (selection: string) => void) {
      setter(value);
    }
  
  const openWidget = () => {
    setPieChartSelection([period, dataType]);
    showWidget("Pie Chart");
  };

  return (
    <div className={styles.container}>
      <h1>Sales</h1>
      <Space wrap>
        <label>Period to show
          <br />
          <Select
            defaultValue="past_week"
            style={{ width: 120 }}
            onChange={(event) => handleChange(event, setPeriod)}
            className={styles.input}
            options={[
              { value: "past_week", label: "Past week" },
              { value: "past_month", label: "Past month" },
              { value: "past_quarter", label: "Past quarter" },
            ]}
          />
        </label>

        <label>Present by
          <br />
          <Select
            defaultValue="location"
            style={{ width: 120 }}
            onChange={(event) => handleChange(event, setDataType)}
            className={styles.input}
            options={[
              // QUERY STRINGS TO PUT IN 'WHERE' OF THE PRISMA QUERY
              // value TO BE SUBSTITUTED FOR ACTUAL VALUES
              { value: '["transaction", { "location_id": "value" }]', label: "Locations" },
              { value: '["location", { "region": "value" }]', label: "Regions" },
              { value: '["item", { "category": "value" }]', label: "Item category" },
              { value: '["transaction", { "is_member": "value" }]', label: "Client status" },
              { value: '["customer", { "gender": "value" }]', label: "Client gender" },
            ]}
          />
        </label>
      </Space>
      <br />
      <br />
      {/* TODO: FIX DISPLAY LOGIC - THERE IS NO NEED TO HAVE SO MANY BUTTONS IN THE MODAL */}
      <Button onClick={openWidget}>Display</Button>
    </div>
  );
};

export default PieMenu;
