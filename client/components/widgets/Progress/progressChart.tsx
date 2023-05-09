import { CloseOutlined, DragOutlined } from "@ant-design/icons";
import { Progress, Space } from "antd";
import styles from "../../../styles/widgets/progressChart.module.css";

interface Props {
  showWidget: () => void;
}

const ProgressChart = ({ showWidget }: Props) => {
  const handleClose = () => {
    showWidget();
  };

  const data = {};

  return (
    <div className={styles.chart}>
      <div className={styles.icons}>
        <DragOutlined />
        <CloseOutlined onClick={handleClose} />
      </div>
      <h1 className={styles.bigNumber}>£32,459</h1>
      <div className={styles.circle}>
        <Progress type="circle" percent={73} />
      </div>
    </div>
  );
};

export default ProgressChart;
