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
  options: string[],
  period: string[],
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

const COLORS = [
  "#f0a202",
  "#d95d39",
  "#6d213c",
  "#fdc149",
  "#fbac4b",
  "#e89c87",
  "#ad345e",
  "#E6F69D",
  "#AADEA7",
  "#64C2A6",
  "#2D87BB",
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
  let dataArray: number[] = [];

  switch (dataToFetch) {
    case 'total_items':
      const itemsArray = await Promise.all(dateTupleArray.map(async (tuple) => {
        const res = await fecthAPI(queryTotalItemsByMonth(tuple));
        return Number.isNaN(parseInt(res?._sum.quantity)) ? 0 : parseInt(res?._sum.quantity);
      }))
      dataArray.push(...itemsArray);
      break;
    case 'total_customers':
      const customersArray = await Promise.all(dateTupleArray.map(async (tuple) => {
        const res = await fecthAPI(queryTotalCustomersByMonth(tuple));
        return res.length;
      }))
      dataArray.push(...customersArray);
      break;
    case 'total_with_tax':
      const amountArray = await Promise.all(dateTupleArray.map(async (tuple) => {
        const res = await fecthAPI(queryTotalAmountByMonth(tuple));
        return Number.isNaN(parseInt(res?._sum.total_with_tax)) ? 0 : parseInt(res?._sum.total_with_tax);
      }))
      dataArray.push(...amountArray);
      break;
    case 'total_transactions':
      const transactionsArray = await Promise.all(dateTupleArray.map(async (tuple) => {
        const res = await fecthAPI(queryTotalTransactionsByMonth(tuple));
        return res.length;
      }))
      dataArray.push(...transactionsArray);
      break;
  }

  return dataArray;
}

function adequateBarData(labels: string[], datasetLabels: string[], datasetData: Array<number[]>) {

  // INTITAL BAR CHART OBJECT DATA
  const finalData: IBarData = {
    labels: labels,
    datasets: []
  }

  for (let i = 0; i < Math.min(datasetLabels.length, datasetData.length); i++) {
    finalData.datasets.push({
      label: datasetLabels[i],
      data: datasetData[i],
      backgroundColor: COLORS[i]
    })
  }

  return finalData;
}


async function loadWidgetData(period: string[], options: string[]) {
  // GET LABELS FOR CHART
  const labels = generateBarChartLabels(period[0], period[1]);

  // GENERATE SINGLE MONTH DATE RANGES TUPLES
  const dateTupleArray = generateOneMonthDateRange(period);

  // FETCH DATA FROM DB USING dateTupleArray
  const chartData = await Promise?.all(options?.map(async (option) => await generateDataArrayFromDB(dateTupleArray, option)))

  return adequateBarData(labels, options, chartData);
}

const BarChart2 = ({ id, options, period }: IBarChartProps) => {

  const dispatch = useDispatch();

  /* SIZE OF THE WIDGET */
  const [size, setSize] = useState({ width: 300, height: 300 });
  /* POSITION OF THE WIDGET */
  const [position, setPosition] = useState({ x: 10, y: 10 });

  /* CURRENT DATA OF THE BAR CHART */
  const [barData, setBarData] = useState({} as IBarData);

  const config = { scales: { y: { beginAtZero: true } } }

  useEffect(() => {
    restorePosition(id, setPosition, setSize);
    loadWidgetData(period, options)
      .then(res => {
        setBarData({ ...res })
      })
  }, []);

  const handleClose = () => {
    dispatch({
      type: "REMOVE_WIDGET",
      payload: id,
    });
  };
  const onDragStop = (e, d) => {
    setPosition({ x: d.x, y: d.y });
    savePositionLocal(id, size, position);
  };

  const onResizeStop = (e, direction, ref, delta, position) => {
    setSize({
      width: parseInt(ref.style.width),
      height: parseInt(ref.style.height),
    });
    setPosition(position);
    savePositionLocal(id, size, position);
  };

  return (
    <Rnd
      size={size}
      position={position}
      onDragStop={onDragStop}
      onResizeStop={onResizeStop}
      dragGrid={[30, 30]}
      resizeGrid={[30, 30]}
      bounds="parent"
      minWidth={500}
      minHeight={320}
    >
      <div className={styles.chart}>
        <div className={styles.icons}>
          <DragOutlined />
          <p style={{ textAlign: "center" }}>
            {
              options.map((option, index) =>
                option.split('_').map((el, i) =>
                  el.charAt(0).toUpperCase() + el.slice(1) + `${i === 0 ? ' ' : ''}`).concat(`${index === options.length - 1 ? ' ' : ', '}`))
            }
            {'from ' + period[0] + ' to ' + period[1]}
          </p>
          <CloseOutlined onClick={handleClose} />
        </div>
        {Object.getOwnPropertyNames(barData).length > 0 && <Bar options={config} data={barData} />}
      </div>
    </Rnd>
  )
}

export default BarChart2;