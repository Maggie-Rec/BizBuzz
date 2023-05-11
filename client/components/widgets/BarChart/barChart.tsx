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
import { useSelector } from "react-redux";
import { Rnd } from "react-rnd";
import { useState } from "react";

interface Props {
  showWidget: () => void;
}

const BarChart = ({ showWidget }: Props) => {
  const [size, setSize] = useState({ width: 300, height: 300 });
  const [position, setPosition] = useState({ x: 10, y: 10 });

  const option1 = useSelector((state: any) => {
    return state.barChart.option1;
  });
  const option2 = useSelector((state: any) => {
    return state.barChart.option2;
  });
  const option3 = useSelector((state: any) => {
    return state.barChart.option3;
  });
  const monthsArray = useSelector((state: any) => {
    return state.barChart.monthsArray;
  });

  const handleClose = () => {
    showWidget();
  };

  const labels = monthsArray;
  const data: any = {
    labels,
    datasets: [
      {
        label: option1,
        data: [1, 20, 16],
        backgroundColor: "#002642",
      },
      {
        label: option2,
        data: [3, 12, 28],
        backgroundColor: "#840032",
      },
      {
        label: option3,
        data: [1, 5, 16],
        backgroundColor: "#FFC65C",
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
  // console.log(position);

  return (
    <Rnd
      size={size}
      position={position}
      onDragStop={onDragStop}
      onResizeStop={onResizeStop}
      dragGrid={[30, 30]}
      // resizeGrid={[30, 30]}
      bounds="parent"
    >
      <div className={styles.chart}>
        <div className={styles.icons}>
          <DragOutlined />
          <CloseOutlined onClick={handleClose} />
        </div>
        <Bar data={data} />
      </div>
    </Rnd>
  );
};

export default BarChart;
