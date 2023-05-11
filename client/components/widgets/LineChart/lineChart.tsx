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
import { useDispatch } from "react-redux";
import styles from "../../../styles/widgets/lineChart.module.css";

interface Props {
  showWidget: () => void;
}

const LineChart = ({ showWidget }: Props) => {
  const dispatch = useDispatch();
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
  ];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Dataset 1",
        data: ["40", "34", "15", "27", "126", '89'],
        fill: false,
        borderColor: "#002642",
        backgroundColor: "#002642",
      },
      {
        label: "Dataset 2",
        data: ["78", "54", "2", "206", "26", '15'],
        fill: true,
        borderColor: "#840032",
        backgroundColor: "#840032",
      },
      {
        label: "Dataset 3",
        data: ["50", "48", "46", "40", "45", '42'],
        fill: true,
        borderColor: "#538927",
        backgroundColor: "#538927",
      },
    ],
  };
  useEffect(() => {
    dispatch({
      type: "FETCH_DATA"
    })
  }, [])

  return (
    <div className={styles.chart}>
      <div className={styles.icons}>
        <DragOutlined />
        <CloseOutlined onClick={handleClose} />
      </div>
      <Line data={data} />
    </div>
  );
};

export default LineChart;
