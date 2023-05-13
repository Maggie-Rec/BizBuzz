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
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../../styles/widgets/lineChart.module.css";
import { Rnd } from "react-rnd";
import { useState } from "react";
import { generateKey } from "crypto";
import { generateAggSumQuery } from "../../../utils/aggregateSUmQueries";
import { generateTimePeriods } from '../../../utils/generateTimePeriods';
import { makeFetchRequest } from '../../../utils/queryRequestMaker';
import { translateQuantity } from "./translations";

interface Props {
  showWidget: () => void;
}

const LineChart = ({ showWidget }: Props) => {
  const dispatch = useDispatch();
  const [size, setSize] = useState({ width: 300, height: 300 });
  const [position, setPosition] = useState({ x: 10, y: 10 });

  const handleClose = () => {
    showWidget();
  };
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  const queriesInfo = useSelector((state) => { return state.lineChart });


  console.log('Queries info:', queriesInfo);

  let requests = [];
  // console.log('input to generate time periods', {
  //   start: queriesInfo.period.start,
  //   end: queriesInfo.period.end,
  //   unit: queriesInfo.axes.x[1]
  // })
  let { startDates, endDates } = generateTimePeriods({
    start: queriesInfo.period.start,
    end: queriesInfo.period.end,
    unit: queriesInfo.axes.x[1]
  });
  // console.log('output from generate time periods', startDates, endDates);
  if (queriesInfo.axes.y[1] === 'acrossLocations') {
    for (let i = 0; i < startDates.length; i++) {
      requests.push({
        label: 'Total',
        query: generateAggSumQuery(queriesInfo.filters, [startDates[i], endDates[i]], 'aggregate',
          translateQuantity(queriesInfo.axes.y[0]))
      });
    }
  } else if (queriesInfo.axes.y[1] === 'inSpecificLocations') {
    console.log('inSpecificLocations');
    if (queriesInfo.axes.y[2]) {
      for (let location of queriesInfo.axes.y[2]) {
        for (let i = 0; i < startDates.length; i++) {
          requests.push({
            label: location,
            query: generateAggSumQuery(queriesInfo.filters.concat(`location_id:${i}`), [startDates[i], endDates[i], 'aggregate',
            translateQuantity(queriesInfo.axes.y[0])
            ])
          });
        }
      }
    } else {
      console.log("No query, error caught. This shouldn't occur if app is used as I expect.");
    }

  } else if (queriesInfo.axes.y[1] === 'inEachLocation') {
    for (let i = 0; i < startDates.length; i++) {
      requests.push({
        label: 'Total',
        query: generateAggSumQuery(queriesInfo.filters, [startDates[i], endDates[i]], 'aggregate',
          translateQuantity(queriesInfo.axes.y[0]))
      });
    }
    for (let location of [0, 1, 2, 3, 4]) {
      for (let i = 0; i < startDates.length; i++) {
        requests.push({
          label: 'Total',
          query: generateAggSumQuery(queriesInfo.filters.concat({ 'location_id': location }), [startDates[i], endDates[i]], 'aggregate',
            translateQuantity(queriesInfo.axes.y[0]))
        });
      }
    }
  }
  console.log('Requests', requests);
  // Each request represents either total sales, or sales in a particular location
  // Aim to convert these, through use of fetch requests, into objects as per below
  // Each fetch request will provide one number for the data
  const colorPackages = [
    [false, "#002642", "#002642"],
    [false, "#840032", "#840032"],
    [true, "#538927", "#538927"],
    {
      fill: false,
      borderColor: "#002642",
      backgroundColor: "#002642",
    }, {
      fill: true,
      borderColor: "#840032",
      backgroundColor: "#840032",
    },
    {
      fill: true,
      borderColor: "#538927",
      backgroundColor: "#538927",
    }
  ]

  const datasets = [];

  async function fetchData() {


    for (let request of requests) {
      console.log('about to send fetch request with body', request.query);
      const dataPoint = await makeFetchRequest({ queryObject: request.query, keyword: 'aggregate' });
      const index = datasets.find((set) => set.label === request.label);
      console.log('fetched datapoint:', dataPoint);
      if (index === -1) {
        let obj = {
          label: request.label,
          data: [dataPoint]
        };
        [obj.fill, obj.borderColor, obj.backgroundColor] = colorPackages[datasets.length % 3]
        datasets.push(obj);
      } else {
        datasets[index].data.push(dataPoint);
      }
    }
    console.log('Completed requests', datasets);
  }
  fetchData();

  const data = {
    labels: labels.slice(0, 7),
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

  const onDragStop = (e, d) => {
    setPosition({ x: d.x, y: d.y });
  };

  const onResizeStop = (e, direction, ref, delta, position) => {
    setSize({
      width: parseInt(ref.style.width),
      height: parseInt(ref.style.height),
    });
    setPosition(position);
    console.log(size);
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
