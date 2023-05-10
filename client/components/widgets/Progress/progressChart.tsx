import { CloseOutlined, DragOutlined } from "@ant-design/icons";
import { Progress } from "antd";
import styles from "../../../styles/widgets/progressChart.module.css";
import { useSelector } from "react-redux";

interface Props {
  showWidget: () => void;
}

const ProgressChart = ({ showWidget }: Props) => {
    const percent = useSelector((state:any) => { return state.progressChart.percentage})
    const inputValue = useSelector((state:any) => { return state.progressChart.userInput})
  const handleClose = () => {
    showWidget();
  };


  return (
    <div className={styles.chart}>
      <div className={styles.icons}>
        <DragOutlined />
        <CloseOutlined onClick={handleClose} />
      </div>
      <h1 className={styles.bigNumber}>{inputValue}</h1>
      <div className={styles.circle}>
        <Progress type="circle" percent={percent} />
      </div>
    </div>
  );
};

export default ProgressChart;
