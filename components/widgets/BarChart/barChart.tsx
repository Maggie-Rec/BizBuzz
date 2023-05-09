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

interface Props {
  showWidget: () => void;
}

const BarChart = ({ showWidget }: Props) => {
  //   const options: any = {
  //     indexAxis: "y",
  //     elements: {
  //       bar: {
  //         borderWidth: 2,
  //       },
  //     },
  //     responsive: true,
  //     plugins: {
  //       legend: {
  //         position: "left",
  //       },
  //       title: {
  //         display: true,
  //         text: "Chart.js Chart",
  //       },
  //     },
  //   };

  const handleClose = () => {
    showWidget();
  };

  const labels = ["red", "yellow", "blue"];
  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: [1, 2, 3, 4, 5],
        backgroundColor: "#002642",
      },
      {
        label: "Dataset 2",
        data: [1, 2, 3, 4, 5],
        backgroundColor: "#840032",
      },
      {
        label: "Dataset 3",
        data: [1, 2, 3, 4, 5],
        backgroundColor: "#FFC65C",
      },
    ],
  };

  return (
    <div className={styles.chart}>
      <div className={styles.icons}>
        <DragOutlined />
        <CloseOutlined onClick={handleClose} />
      </div>
      <Bar data={data} />
    </div>
  );
};

export default BarChart;
