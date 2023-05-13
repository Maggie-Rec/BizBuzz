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
<<<<<<< HEAD
import { useState, useEffect } from "react";
import savePositionLocal, { restorePosition } from "../../../utils/posSaver";
=======
import { useState, useEffect, SetStateAction } from "react";
>>>>>>> db-connection

interface Props {
  barChartSelection: string[];
  barChartPeriod: string[];
  id: number;
<<<<<<< HEAD
  type: string;
}

const BarChart = ({ barChartSelection, barChartPeriod, id, type }: Props) => {
=======
  selectedData: string;
  period: string[];
}

const BarChart = ({
  barChartSelection,
  barChartPeriod,
  selectedData,
  id,
  period,
}: Props) => {
>>>>>>> db-connection
  const dispatch = useDispatch();
  console.log(selectedData);
  // console.log(barChartPeriod);

  const [size, setSize] = useState({ width: 300, height: 300 });
  const [position, setPosition] = useState({ x: 10, y: 10 });
  const [barData, setBarData] = useState([] as string[]);

  const handleClose = () => {
    dispatch({
      type: "REMOVE_WIDGET",
      payload: id,
    });
  };

  const getData = async (selectedData: string) => {
    let response = await fetch(`http://localhost:3020/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: selectedData,
    });
    let data = (await response.json()) as unknown as { [key: string]: any }[];
    console.log(data);
    return data;
  };

  useEffect(() => {
    getData(selectedData).then((data) => {
     console.log(selectedData)
      let temp = [] as string[];
      for (
        let i = new Date(period[0]).getMonth();
        i <= new Date(period[1]).getMonth();
        i++
      ) {
        // console.log(i)
        temp.push(
          data.filter((el) => new Date(el.date).getMonth() === i).length + ""
        );
        // console.log(data.filter(el => (new Date(el.date).getMonth() === i)).length)
      }

      setBarData(temp);
    });
  }, []);

  const labels = barChartPeriod;
  let data: any = {
    labels,
    datasets: [
      {
        label: barChartSelection[0],
        data: [...barData],
        backgroundColor: "#002642",
      },
      // {
      //   label: barChartSelection[1],
      //   data: [12],
      //   backgroundColor: "#840032",
      // },
      // {
      //   label: barChartSelection[2],
      //   data: [16],
      //   backgroundColor: "#FFC65C",
      // },
    ],
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
<<<<<<< HEAD
    savePositionLocal(id, size, position);
  };

  useEffect(() => {
    restorePosition(id, setPosition, setSize);
  }, [])
=======
  };

  useEffect(() => {
    data = {
      ...data,
      labels: barChartPeriod,
    };
  }, [barChartPeriod]);
>>>>>>> db-connection

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
        {barChartPeriod && barChartPeriod.length > 0 && <Bar data={data} />}
      </div>
      {JSON.stringify(barData)}
    </Rnd>
  );
};

export default BarChart;
