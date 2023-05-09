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

interface Props {
  showWidget: () => void;
}

const PieChart = ({ showWidget }: Props) => {
  const handleClose = () => {
    showWidget();
  };

  const labels = ["1", '2', '3'];
  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: [10, 2, 35],
        backgroundColor: ["#002642", "#840032", "#FFC65C"],
      },
    ],
  };

  return (
    <div className={styles.chart}>
      <div className={styles.icons}>
        <DragOutlined />
        <CloseOutlined onClick={handleClose} />
      </div>
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
