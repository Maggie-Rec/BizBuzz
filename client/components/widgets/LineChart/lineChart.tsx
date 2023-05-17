import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);
import { CloseOutlined, DragOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../../styles/widgets/lineChart.module.css";
import { Rnd } from "react-rnd";
import { useState, useEffect } from "react";
import { generateKey } from "crypto";
import { generateAggSumQuery } from "../../../utils/aggregateSumQueries";
import { generateTimePeriods } from "../../../utils/generateTimePeriods";
import { makeFetchRequest } from "../../../utils/queryRequestMaker";
import { translateQuantity } from "./translations";
import { monthData } from "../../../utils/monthData";

const LineChart = ({ id, type }) => {
  const dispatch = useDispatch();
  const [size, setSize] = useState({ width: 300, height: 300 });
  const [position, setPosition] = useState({ x: 10, y: 10 });
  const queriesInfo = useSelector((state) => {
    return state.lineChart;
  });
  const monthLabels = [
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
    "December",
  ];

  const handleClose = () => {
    dispatch({
      type: "REMOVE_WIDGET",
      payload: id,
    });
  };
  function returnLabels(number) {
    let result = [];
    let period = queriesInfo.axes.x[1];
    let current = queriesInfo.period.start;
    if (period === "month") {
      while (result.length < number) {
        result.push(monthLabels[current.month - 1]);
        current.month++;
        if (current.month > 12) {
          current.year++;
          current.month -= 12;
        }
      }
    }
    if (period === "quarter") {
      while (result.length < number) {
        result.push(monthLabels[current.month - 1]);
        current.month += 3;
        if (current.month > 12) {
          current.year++;
          current.month -= 12;
        }
      }
    }
    if (period === "year") {
      while (result.length < number) {
        result.push(current.year);
        current.year++;
      }
    }
    if (period === "week") {
      console.log({ current });
      let [firstOfYear, firstOfMonth] = [true, true];
      while (result.length < number) {
        result.push(
          `${firstOfYear ? current.year + " " : ""}${firstOfMonth ? monthLabels[current.month - 1] + " " : ""
          }${current.day}`
        );
        [firstOfYear, firstOfMonth] = [false, false];
        current.day += 7;
        if (current.day > monthData(current.month).lastDay) {
          if (current.month === 12) {
            current.year++;
            current.month = 1;
            current.day -= current.month.lastDay;
            [firstOfYear, firstOfMonth] = [true, true];
          } else {
            current.month++;
            current.day -= current.month.lastDay;
            firstOfMonth = true;
          }
        }
      }
    }
    if (period === "day") {
      let [firstOfYear, firstOfMonth] = [true, true];
      while (result.length < number) {
        result.push(
          `${firstOfYear ? current.year + " " : ""}${firstOfMonth ? monthLabels[current.month - 1] + " " : ""
          }${current.day}`
        );
        [firstOfYear, firstOfMonth] = [false, false];
        current.day++;
        if (current.day > monthData(current.month).lastDay) {
          if (current.month === 12) {
            current.year++;
            current.month = 1;
            current.day = 1;
            [firstOfYear, firstOfMonth] = [true, true];
          } else {
            current.month++;
            current.day = 1;
            firstOfMonth = true;
          }
        }
      }
    }
    return result;
  }

  // e.g. queriesInfo: {
  //   axes: {
  //     x: ['time', 'quarter']
  //     y: ['salesQuantity', 'acrossLocations']
  //   }
  //   filterNames: [],
  //   filters : [],
  //     period : {
  //       end : { year: 2023, month: 4 },
  //       start :{ year: 2022, month: 7 }
  //   }
  // }

  let { startDates, endDates } = generateTimePeriods({
    start: queriesInfo.period.start,
    end: queriesInfo.period.end,
    unit: queriesInfo.axes.x[1],
  });
  const [requests, setRequests] = useState([]);

  function generateRequests() {
    let newRequests = [];
    if (queriesInfo.axes.y[1] === "acrossLocations") {
      for (let i = 0; i < startDates.length; i++) {
        newRequests.push({
          label: "Total",
          query: generateAggSumQuery({
            filterArr: queriesInfo.filters,
            filterNames: queriesInfo.filterNames,
            dateArr: [startDates[i], endDates[i]],
            keyword: "aggregate",
            operator: translateQuantity(queriesInfo.axes.y[0]),
          }),
        });
      }
    } else if (queriesInfo.axes.y[1] === "inSpecificLocations") {
      if (queriesInfo.axes.y[2]) {
        for (let location of queriesInfo.axes.y[2]) {
          for (let i = 0; i < startDates.length; i++) {
            newRequests.push({
              label: location,
              query: generateAggSumQuery({
                filterArr: queriesInfo.filters.concat({
                  location_id: location,
                }),
                filterNames: queriesInfo.filterNames,
                filterArr: queriesInfo.filters.concat({
                  location_id: location,
                }),
                dateArr: [startDates[i], endDates[i]],
                keyword: "aggregate",
                operator: translateQuantity(queriesInfo.axes.y[0]),
              }),
            });
          }
        }
      } else {
        console.log(
          "No query, error caught. This shouldn't occur if app is used as I expect."
        );
      }
    } else if (queriesInfo.axes.y[1] === "inEachLocation") {
      for (let i = 0; i < startDates.length; i++) {
        newRequests.push({
          label: "Total",
          query: generateAggSumQuery({
            filterArr: queriesInfo.filters,
            filterNames: queriesInfo.filterNames,
            dateArr: [startDates[i], endDates[i]],
            keyword: "aggregate",
            operator: translateQuantity(queriesInfo.axes.y[0]),
          }),
        });
        for (let location of [1, 2, 3, 4, 5]) {
          for (let i = 0; i < startDates.length; i++) {
            newRequests.push({
              label: location,
              query: generateAggSumQuery({
                filterArr: queriesInfo.filters.concat({
                  location_id: location,
                }),
                filterNames: queriesInfo.filterNames,
                filterArr: queriesInfo.filters.concat({
                  location_id: location,
                }),
                dateArr: [startDates[i], endDates[i]],
                keyword: "aggregate",
                operator: translateQuantity(queriesInfo.axes.y[0]),
              }),
            });
          }
        }
      }
    }
    setRequests(newRequests);
  }

  // Each request represents either total sales, or sales in a particular location
  // Aim to convert these, through use of fetch requests, into objects as per below
  // Each fetch request will provide one number for the data
  const colorPackages = [
    [false, "#f2a202", "#f2a202"],
    [false, "#f08605", "#f08605"],
    [false, "#db6443", "#db6443"],
  ];

  async function fetchData() {
    const datasets = [];
    for (let request of requests) {
      let dataPoint = await makeFetchRequest({
        queryObject: request.query,
        route: "transactions",
      });
      while (dataPoint && typeof dataPoint === "object") {
        dataPoint = dataPoint[Object.keys(dataPoint)[0]];
      }
      const index = datasets.findIndex((set) => set.label === request.label);
      // console.log('Data to be used for new dataset:', dataPoint, request.label);
      if (index === -1) {
        let obj = {
          label: request.label,
          data: [dataPoint ? dataPoint : 0],
          // NB Need to adjust the below to only add the final part of dataPoint
          data: [dataPoint],
        };
        [obj.fill, obj.borderColor, obj.backgroundColor] =
          colorPackages[datasets.length % 3];
        datasets.push(obj);
      } else {
        // console.log('Data to be added to existing dataset', dataPoint, request.label);

        datasets[index].data.push(dataPoint ? dataPoint : 0);
      }
    }
    if (datasets[0] && datasets[0].data) {
      setData({
        labels: returnLabels(datasets[0].data.length),
        datasets,
      });
    }

    // console.log('data changed to', data);
  }

  const dummyData = {
    labels: monthLabels.slice(0, 7),
    datasets: [
      {
        label: "Dataset 1",
        data: ["40", "34", "15", "27", "126", "89"],
        fill: false,
        borderColor: "#002642",
        backgroundColor: "#002642",
      },
      {
        label: "Dataset 2",
        data: ["78", "54", "2", "206", "26", "15"],
        fill: true,
        borderColor: "#840032",
        backgroundColor: "#840032",
      },
      {
        label: "Dataset 3",
        data: ["50", "48", "46", "40", "45", "42"],
        fill: true,
        borderColor: "#538927",
        backgroundColor: "#538927",
      },
    ],
  };
  const [data, setData] = useState(dummyData);
  useEffect(() => {
    generateRequests();
  }, []);
  useEffect(() => {
    fetchData();
  }, [requests]);

  const onDragStop = (e, d) => {
    setPosition({ x: d.x, y: d.y });
  };

  const onResizeStop = (e, direction, ref, delta, position) => {
    setSize({
      width: parseInt(ref.style.width),
      height: parseInt(ref.style.height),
    });
    setPosition(position);
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
      minHeight={300}
    >
      <div className={styles.chart}>
        <div className={styles.icons}>
          <DragOutlined />
          <CloseOutlined onClick={handleClose} />
        </div>
        <Line data={data} />
      </div>
    </Rnd>
  );
};
export default LineChart;
