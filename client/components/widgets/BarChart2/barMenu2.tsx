import React, { useEffect, useState } from "react";
import { Space, Select, Button, DatePicker, Modal } from "antd";
import styles from "../../../styles/widgets/barChart.module.css";
import { useDispatch } from "react-redux";
import BarChart from "./barChart2";
import {
  queryTotalItemsByMonth,
  queryTotalCustomersByMonth,
  queryTotalAmountByMonth,
  queryTotalTransactionsByMonth,
} from "../../../utils/queryKingV2";
const { RangePicker } = DatePicker;

const BarMenu2 = ({ func }) => {

  const dispatch = useDispatch();

  const [options, setOptions] = useState(['', '', ''] as string[]);
  const [period, setPeriod] = useState([] as string[]);
  const [isShowing, setIsShowing] = useState(true);

  async function addWidget() {

    dispatch({
      type: 'ADD_WIDGET',
      payload: (
        <BarChart
          key={Date.now()}
          id={Date.now()}
          period={period}
          options={options.filter(el => el !== '' && el !== 'Select an option')}
        />
      )
    })

    handleCancel();
  }

  function handleCancel() {
    setIsShowing(!isShowing);
    func();
  }

  function handleNewOption (optionNumber: number, newOption: string) {
    let temp = [...options];
    temp[optionNumber] =  newOption;
    setOptions([...temp]);
  } 

  return (
    <Modal
      open={isShowing}
      width={'50vw'}
      onCancel={() => handleCancel()}
      cancelButtonProps={{ style: { display: "none" } }}
      onOk={() => addWidget()}
    >
      <h1>Bar Chart</h1>
      <div className={styles.container}>
        <Space>
          <Select
            defaultValue="Select an option"
            style={{ width: '13vw' }}
            onChange={(value) => handleNewOption(0, value)}
            className={styles.input}
            options={[
              {
                value: "total_items",
                label: "Total items sold"
              },
              {
                value: "total_customers",
                label: "Total amount of customers",
              },
              {
                value: "total_with_tax",
                label: "Total amount",
              },
              {
                value: "total_transactions",
                label: "Total amount of transactions",
              },
            ]}
          />
          <Select
            defaultValue="Select an option"
            style={{ width: '13vw' }}
            onChange={(value) => handleNewOption(1, value)}
            className={styles.input}
            options={[
              {
                value: "total_items",
                label: "Total items sold"
              },
              {
                value: "total_customers",
                label: "Total amount of customers",
              },
              {
                value: "total_with_tax",
                label: "Total amount",
              },
              {
                value: "total_transactions",
                label: "Total amount of transactions",
              },
            ]}
          />
          <Select
            defaultValue="Select an option"
            style={{ width: '13vw' }}
            onChange={(value) => handleNewOption(2, value)}
            className={styles.input}
            options={[
              {
                value: "total_items",
                label: "Total items sold"
              },
              {
                value: "total_customers",
                label: "Total amount of customers",
              },
              {
                value: "total_with_tax",
                label: "Total amount",
              },
              {
                value: "total_transactions",
                label: "Total amount of transactions",
              },
            ]}
          />
        </Space>
        <RangePicker
          picker="month"
          onChange={(value, string) => setPeriod(string)}
        />
      </div>
    </Modal>
  )
}

export default BarMenu2;