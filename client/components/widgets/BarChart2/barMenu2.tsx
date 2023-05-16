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


const MONTHS = [
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
  "December"
]

async function fecthAPI(stringifiedQuery: string) {
  try {
    const res = await fetch('http://localhost:3001/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: stringifiedQuery,
      credentials: 'include'
    })

    const data = await res.json();
    return data;
  } catch (err) {
    console.log('ERROR: ', err);
  }
}

// INPUT EXPECTED (e.g.) startingMonth => "2023-01" endingMonth => "2023-05"
// OUTPUT EXPECTED (e.g) ==> ['January', 'February', 'March', 'April', 'May']
function generateBarChartLabels (startingMonth: string, endingMonth: string) {
  const startingMonthIndex = parseInt(startingMonth?.split('-')[1]) - 1;
  const endingMonthIndex = parseInt(endingMonth?.split('-')[1]);

  return MONTHS.slice(startingMonthIndex, endingMonthIndex);
}

// INPUT EXPECTED (e.g.) monthRange ==> ["2023-01", "2023-05"]
// OUTPUT EXPECTED (e.g.) ==> [["2023-01-01", "2023-01-31"], 
// ["2023-02-01", "2023-02-28"], ["2023-03-01", "2023-03-31"]]
function generateOneMonthDateRange (monthRange: string[]) {

  // JS MONTHS ARE 0 INDEXED
  const startingMonthIndex = parseInt(monthRange[0]?.split('-')[1]) - 1;
  const endingMonthIndex = parseInt(monthRange[1]?.split('-')[1]);

  const oneMonthRangeArray: Array<Date[]> = [] 

  const year = parseInt(monthRange[0]?.split('-')[0]);

  for (let i = startingMonthIndex; i < endingMonthIndex; i++) {
    oneMonthRangeArray.push([
      new Date(year, i, 1, 1, 0, 0, 0), // FIRST DAY OF THE MONTH
      new Date(year, (i + 1), 0, 23, 59, 59, 999) // LAST DAY OF THE MONTH 
      // by setting the day to 0 and month + 1 we get last day of month
    ])
  }

  return oneMonthRangeArray;
}
// INPUT EXPECTED (e.g.) ==> [["2023-01-01", "2023-01-31"], 
// ["2023-02-01", "2023-02-28"], ["2023-03-01", "2023-03-31"]]
// OUTPUT EXPECTED (e.g.) ==> [3392, 8812, 1031, 0]
async function generateDataArrayFromDB (dateTupleArray: Array<Date[]>, dataToFetch: string) {
  const dataArray : number[] = [];
  // return dateTupleArray;
  switch (dataToFetch) {
    case 'total_items':
      dateTupleArray.forEach(async (tuple) => {
        const res = await fecthAPI(queryTotalItemsByMonth(tuple));
        dataArray.push(Number.isNaN(parseInt(res?._sum.quantity)) ? 0 : parseInt(res?._sum.quantity));
      })
      break;
    case 'total_customers':
      dateTupleArray.forEach(async (tuple) => {
        const res = await fecthAPI(queryTotalCustomersByMonth(tuple));
        dataArray.push(res? res.length : 0);
      })
      break;
    case 'total_with_tax':
      dateTupleArray.forEach(async (tuple) => {
        const res = await fecthAPI(queryTotalAmountByMonth(tuple));
        dataArray.push(Number.isNaN(parseInt(res?._sum.quantity)) ? 0 : parseInt(res?._sum.quantity));
      })
      break;
    case 'total_transactions':
      dateTupleArray.forEach(async (tuple) => {
        const res = await fecthAPI(queryTotalTransactionsByMonth(tuple));
        dataArray.push(res? res.length : 0);
      })
      break;
  }
  console.log(dataToFetch ,dataArray);
  return dataArray;
}

const BarMenu2 = ({ func }) => {

  const dispatch = useDispatch();

  const [option1, setOption1] = useState("");
  const [dbDates, setDBDates] = useState([]);
  const [period, setPeriod] = useState([] as string[]);
  const [isShowing, setIsShowing] = useState(true);

  useEffect(() => {
    // console.log(period, option1)
  }, [period, option1])

  async function addWidget() {

    // GET LABELS FOR CHART
    const labels = generateBarChartLabels(period[0], period[1]);

    // GENERATE SINGLE MONTH DATE RANGES TUPLES
    const dateTupleArray = generateOneMonthDateRange(period);

    // FETCH DATA FROM DB USING dateTupleArray
    const chartData = await generateDataArrayFromDB(dateTupleArray, option1);

    dispatch({
      type: 'ADD_WIDGET',
      payload: (
        <BarChart
          key={Date.now()}
          id={Date.now()}
          labels={labels}
          datasetLabels={[option1]}
          datasetData={[chartData]}
        />
        )
    })

    handleCancel();
  }

  function handleCancel() {
    setIsShowing(!isShowing);
    func();
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
        <Space wrap>
          <Select
            defaultValue="Select an option"
            style={{ width: '15vw' }}
            onChange={setOption1}
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
          {JSON.stringify(period)}
          {JSON.stringify(generateOneMonthDateRange(period))}
          {JSON.stringify(generateDataArrayFromDB([[new Date("2023-01-01T00:00:00.000Z"),new Date("2023-01-31T23:59:59.999Z")],[new Date("2023-02-01T00:00:00.000Z"),new Date("2023-02-28T23:59:59.999Z")],[new Date("2023-03-01T00:00:00.000Z"), new Date("2023-03-31T23:59:59.999Z")],[new Date("2023-04-01T00:00:00.000Z"), new Date("2023-04-30T23:59:59.999Z")],[new Date("2023-05-01T00:00:00.000Z"), new Date("2023-05-31T23:59:59.999Z")]], 'total_customers'))}
          <Space>
            <RangePicker
              picker="month"
              onChange={(value, string) => setPeriod(string)}
            />
          </Space>
        </Space>
      </div>
    </Modal>
  )
}

export default BarMenu2;