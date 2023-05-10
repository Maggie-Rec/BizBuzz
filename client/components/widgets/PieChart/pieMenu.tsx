'use client'

import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { Space, Select, Button } from "antd";
import styles from "../../../styles/widgets/pieMenu.module.css";
import { useDispatch } from "react-redux";
import PieChart from "./pieChart";

interface Props {
  setMyWidgets: Dispatch<SetStateAction<any[]>>,
  myWidgets: any[]
}
const PieMenu = ({ myWidgets, setMyWidgets }: Props) => {
  const [period, setPeriod] = useState('');
  const [dataType, setDataType] = useState('');

  function handleChange(value: string,
    setter: (selection: string) => void) {
      setter(value);
    }


  // TODO: MOVE THE CLOSE HANDLER TO THE DASHBOARD, DRILL IT DOWN TO AVOID STATE PROBLEMS  
  // MOVE THE WIDGETS ARRAY STATE TO REDUX STORE

  function handleClose () {
      // console.log(event.target);
      console.log(myWidgets);
      // let tbd = myWidgets.findIndex((element) => {
      //   console.log(element.key);
      //   console.log(element.key === key);
      //   element.key.toString() === key ? true : false;
      // });
      // console.log('tbd', tbd);
      // setMyWidgets([...myWidgets.splice(tbd, 1)]);
    };
  
  const addWidget = () => {
    const newPieChart = <PieChart 
      pieChartSelection={[period, dataType]} 
      key={(() => { return Date.now()})()} 
      handleClose={handleClose}
      />
    console.log(newPieChart);
    setMyWidgets([...myWidgets, newPieChart])
    console.log(myWidgets);
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
      {/* <Button onClick={openWidget}>Display</Button> */}
      <Button onClick={addWidget}>Display</Button>
    </div>
  );
};

export default PieMenu;
function showWidget(): void {
  throw new Error("Function not implemented.");
}

