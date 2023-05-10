import React, { useState } from "react";
import { Space, Select, Button, Input } from "antd";
import styles from "../../../styles/widgets/progressChart.module.css";
import { useDispatch } from "react-redux";

interface Props {
  showWidget: (arg0: string) => void;
}
const Progress = ({ showWidget }: Props) => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const [totalValue, setTotalValue] = useState("");
  const calculatePercentage = () => {
    const part = Number(totalValue);
    const whole = Number(inputValue);
    const percent = Math.round((part / whole) * 100);

    dispatch({ type: "GENERATE", payload: { inputValue, percent } });
  };

  const createWidget = () => {
    showWidget("Progress Chart");
    calculatePercentage();
  };

  return (
    <div className={styles.container}>
      <h1>Area Chart</h1>
      <Space wrap>
        <Input
          type="number"
          onChange={(event) => setInputValue(event.target.value)}
        />
        <Select
          style={{ width: 120 }}
          onChange={setTotalValue}
          className={styles.input}
          options={[
            { value: "55798", label: "Total Sales" },
            { value: "798", label: "Total Items " },
          ]}
        />
      </Space>

      <Button onClick={createWidget}>Display</Button>
    </div>
  );
};

export default Progress;
