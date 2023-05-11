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

interface Props {
  showWidget: () => void;
}

const BarChart = ({ showWidget }: Props) => {
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
