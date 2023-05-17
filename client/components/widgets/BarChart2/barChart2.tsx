import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);
import { CloseOutlined, DragOutlined } from "@ant-design/icons";
import styles from "../../../styles/widgets/barChart.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Rnd } from "react-rnd";
import { useState, useEffect, SetStateAction } from "react";
import savePositionLocal, { restorePosition } from "../../../utils/posSaver";
import { Modal } from "antd";
import {
  queryTotalItemsByMonth,
  queryTotalCustomersByMonth,
  queryTotalAmountByMonth,
  queryTotalTransactionsByMonth,
} from "../../../utils/queryKingV2";


interface IBarChartProps {
  id: number,
  option: string,
  period: string[],
  // labels: string[],
  // datasetLabels: string[],
  // datasetData: Array<number[]>
}

interface IBarData {
  labels: string[],
  datasets: {
    label: string,
    data: number[],
    backgroundColor?: string
  }[]
}

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
function generateBarChartLabels(startingMonth: string, endingMonth: string) {
  const startingMonthIndex = parseInt(startingMonth?.split('-')[1]) - 1;
  const endingMonthIndex = parseInt(endingMonth?.split('-')[1]);

  return MONTHS.slice(startingMonthIndex, endingMonthIndex);
}

// INPUT EXPECTED (e.g.) monthRange ==> ["2023-01", "2023-05"]
// OUTPUT EXPECTED (e.g.) ==> [["2023-01-01", "2023-01-31"], 
// ["2023-02-01", "2023-02-28"], ["2023-03-01", "2023-03-31"]]
function generateOneMonthDateRange(monthRange: string[]) {

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
async function generateDataArrayFromDB(dateTupleArray: Array<Date[]>, dataToFetch: string) {
  const dataArray: number[] = [];
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
        console.log('res', res)
        dataArray.push(res ? res.length : 0);
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
        dataArray.push(res ? res.length : 0);
      })
      break;
  }
  console.log(dataToFetch ,dataArray);
  return dataArray;
}

function adequateBarData(labels: string[], datasetLabels: string[], datasetData: Array<number[]>) {

  console.log('datasetData', datasetData[0])
  console.log('newData', datasetData[0][0])

  // INTITAL BAR CHART OBJECT DATA
  const finalData: IBarData = {
    labels: labels,
    datasets: []
  }

  for (let i = 0; i < Math.min(datasetLabels.length, datasetData.length); i++) {
    const data = datasetData[i];

    finalData.datasets.push({
      label: datasetLabels[i],
      data: datasetData[i]
    })
  }

  console.log('finalData', finalData);

  return finalData;
}


async function loadWidgetData (period: string[], option: string) {
  // GET LABELS FOR CHART
  const labels = generateBarChartLabels(period[0], period[1]);

  // GENERATE SINGLE MONTH DATE RANGES TUPLES
  const dateTupleArray = generateOneMonthDateRange(period);

  // FETCH DATA FROM DB USING dateTupleArray
  const chartData = await generateDataArrayFromDB(dateTupleArray, option);

  console.log('HERE', chartData)
  console.log('here', await adequateBarData(labels, [option], new Array(chartData)))

  return adequateBarData(labels, [option], [chartData]);
}

const config = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }

const BarChart2 = ({ id, option, period }: IBarChartProps) => {

  /* SIZE OF THE WIDGET */
  const [size, setSize] = useState({ width: 300, height: 300 });
  /* POSITION OF THE WIDGET */
  const [position, setPosition] = useState({ x: 10, y: 10 });

  /* CURRENT DATA OF THE BAR CHART */
  const [barData, setBarData] = useState({} as IBarData);

  const options = {scales: {y: { beginAtZero: true}}}

  useEffect(() => {
    loadWidgetData(period, option)
      .then(res => {
        console.log('res', res);
        setBarData({...res})
      })
  }, []);

  return (
    <div style={{ height: '30vh', width: '50vw', position: 'absolute', zIndex: '3', backgroundColor: 'whitesmoke', color: 'white' }}>
      {Object.getOwnPropertyNames(barData).length > 0 && <Bar options={options} data={barData}/>}
    </div>
  )
}

export default BarChart2;