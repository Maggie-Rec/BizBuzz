import React, { ChangeEvent, Dispatch, SetStateAction, useState, useEffect } from "react";
import { Space, Select, Input, Modal } from "antd";
import styles from "../../../styles/widgets/progressChart.module.css";
import { useDispatch } from "react-redux";
import ProgressChart from "./progressChart";
import randomAlphaNumeric from "../../../utils/randomizer";

function Progress({func}) {
  const dispatch = useDispatch();
  const [target, setTarget] = useState(1000);
  const [period, setPeriod] = useState("this_month");
  const [isShowing, setIsShowing] = useState(true);

  function handleChange(event: ChangeEvent<HTMLInputElement>,
    setter: Dispatch<SetStateAction<number | string>>) {
    setter(event.target.value as number | string);
  }

  function addWidget() {
    function newProgressChart() {
      return <ProgressChart
        id={Date.now()}
        target={target}
        period={period}
        key={randomAlphaNumeric()}
        type={"ProgressChart"}
      />
    }
    dispatch({
      type: "ADD_WIDGET",
      payload: newProgressChart()
    });
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
        <h1>Set your sales target</h1>
        <br />
        <Space wrap>
          <label>
            <span>I want to earn</span>
            <Input
              defaultValue={1000}
              style={{ width: 120, marginLeft: 10 }}
              type="number"
              onChange={(event) => handleChange(event, setTarget)}
            />
          </label>
          <Select
            style={{ width: 120 }}
            onChange={setPeriod}
            className={styles.input}
            defaultValue={"this_month"}
            options={[
              { value: "this_month", label: "this month" },
              { value: "this_quarter", label: "this quarter" },
              { value: "this_year", label: "this year" },
            ]}
          />
        </Space>
        <br />
        {/* <Button onClick={addWidget}>Display</Button> */}
      </div>
    </Modal>
  );
};

export default Progress;
