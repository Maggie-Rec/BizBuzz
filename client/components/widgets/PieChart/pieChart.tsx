"use client";
import {
  lastWeekTF,
  lastMonthTF,
  lastQuarterTF,
} from "../../../utils/timeFilters";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";
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

import styles from "../../../styles/widgets/pieChart.module.css";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Rnd } from "react-rnd";

interface Props {
  pieChartSelection: string[];
  key: number;
}

const PieChart = ({ pieChartSelection, key }: Props) => {
  const [labels, setLabels] = useState([] as string[]);
  const [pieData, setPieData] = useState([] as number[]);
  const [size, setSize] = useState({ width: 300, height: 300 });
  const [position, setPosition] = useState({ x: 10, y: 10 });

  function handleClose() {}

  useEffect(() => {
    let periodStart = "";
    switch (
      pieChartSelection[0] // [0] for period, [1] for data type
    ) {
      case "past_week":
        // periodStart = lastWeekTF[0].toISOString()
        periodStart = "2023-03-23T23:00:00.000Z";
        break;
      case "past_month":
        // periodStart = lastMonthTF[0].toISOString()
        periodStart = "2023-03-01T23:00:00.000Z";
        break;
      case "past_quarter":
        // periodStart = lastQuarterTF[0].toISOString()
        periodStart = "2023-01-01T23:00:00.000Z";
        break;
    }

    async function getLabelsPossibleValues() {
      let filter = getFilterObject(pieChartSelection[1], "value");
      // console.log(filter);
      let path = Object.keys(filter)[0];
      let relatedCriterion = filter[path];
      Object.keys(relatedCriterion).forEach(
        (key) => (relatedCriterion[key] = true)
      );
      let selection = relatedCriterion;

      let response = await fetch(`http://localhost:3456/${path}s`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          query: {
            distinct: [`${Object.keys(relatedCriterion)[0]}`],
            select: selection,
          },
        }),
      });

      response = await response.json();

      // console.log('Possible values', response);
      return response;
    }

    function getFilterObject(string, value) {
      return Object.fromEntries([JSON.parse(string.replace("value", value))]);
    }

    async function getSumBy(value) {
      let filter = getFilterObject(pieChartSelection[1], value);
      // POSSIBLE VALUE OF A CRITERION
      // console.log(periodStart);

      if (filter.transaction) {
        filter = filter.transaction;
        for (let key in filter) {
          if (filter[key] === "true") {
            filter[key] = true;
          } else if (filter[key] === "false") {
            filter[key] = false;
          } else {
            filter[key] = Number(filter[key]);
          }
        }
      }

      // console.log(filter);

      filter.date = { gt: periodStart };

      let response = await fetch("http://localhost:3456/transactions", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          query: {
            _sum: {
              total_with_tax: true,
            },
            where: filter,
          },
          keyword: "aggregate",
        }),
      });

      response = await response.json();
      return response;
    }

    interface dataResponse extends Response {
      label: string;
    }

    async function fetchData() {
      const possibleValues = (await getLabelsPossibleValues()) as unknown as [];
      let data = [];
      await Promise.all(
        possibleValues.map(async (obj) => {
          const sum = (await getSumBy(Object.values(obj)[0])) as dataResponse;
          sum.label = Object.values(obj)[0] as string;
          data.push(sum);
        })
      ).then(() => {
        setLabels(data.map((item) => item.label));
        // console.log(labels);
        setPieData(data.map((item) => Number(item._sum.total_with_tax)));
        // console.log(pieData);
      });
    }

    fetchData();
  }, [pieChartSelection]);

  const data = {
    labels,
    datasets: [
      {
        data: pieData,
        backgroundColor: ["#002642", "#840032", "#FFC65C"],
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
      minWidth={300}
      minHeight={350}
    >
      <div className={styles.chart}>
        <div className={styles.icons}>
          <DragOutlined />
          <CloseOutlined onClick={(event) => handleClose()} />
        </div>
        <Pie data={data} />
        Sales {pieChartSelection[0]} {pieChartSelection[1]}
      </div>
    </Rnd>
  );
};

export default PieChart;
