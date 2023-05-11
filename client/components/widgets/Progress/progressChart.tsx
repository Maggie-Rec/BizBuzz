import { CloseOutlined, DragOutlined } from "@ant-design/icons";
import { Progress } from "antd";
import styles from "../../../styles/widgets/progressChart.module.css";
import { useSelector } from "react-redux";
import { Rnd } from "react-rnd";
import { useState } from "react";

interface Props {
  showWidget: () => void;
}

const ProgressChart = ({ showWidget }: Props) => {
  const [size, setSize] = useState({ width: 300, height: 300 });
  const [position, setPosition] = useState({ x: 10, y: 10 });


    const percent = useSelector((state:any) => { return state.progressChart.percentage})
    const inputValue = useSelector((state:any) => { return state.progressChart.userInput})
  const handleClose = () => {
    showWidget();
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
      minWidth={330}
      maxWidth={330}
      minHeight={300}
      maxHeight={300}
    >
      <div className={styles.chart}>
        <div className={styles.icons}>
          <DragOutlined />
          <CloseOutlined onClick={handleClose} />
        </div>
        <div className={styles.circle}>
          <h1 className={styles.bigNumber}>{inputValue}</h1>
          <Progress type="circle" percent={percent} />
        </div>
      </div>
    </Rnd>
  );
};

export default ProgressChart;
