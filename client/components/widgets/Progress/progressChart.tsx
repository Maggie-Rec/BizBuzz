import { CloseOutlined, DragOutlined } from "@ant-design/icons";
import { Progress } from "antd";
import styles from "../../../styles/widgets/progressChart.module.css";
import { useDispatch } from "react-redux";
import { Rnd } from "react-rnd";
import { useState, useEffect } from "react";
import getThisPeriod from "../../../utils/thisTimePeriod";
import savePositionLocal from "../../../utils/posSaver";

interface Props {
  id: number,
  target: number,
  period: string,
  type: string
}

const ProgressChart = ({ id, target, period, type }: Props) => {
  const [size, setSize] = useState({ width: 300, height: 300 });
  const [position, setPosition] = useState({ x: 10, y: 10 });
  const [current, setCurrent] = useState(0);

  const dispatch = useDispatch();

  function handleClose() {
    dispatch({
      type: "REMOVE_WIDGET",
      payload: id,
    });
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
    savePositionLocal(id, size, position);
  };

  async function fetchTotals() {
    console.log(getThisPeriod(period));
    let response = await fetch("http://localhost:3456/transactions", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        query: {
          _sum: {
            total_with_tax: true
          },
          where: {
            AND: [
              {
                date: {
                  gt: getThisPeriod(period)[0]
                }
              },
              {
                date: {
                  lt: getThisPeriod(period)[1]
                }
              }
            ]
          }
        },
        keyword: "aggregate"
      })
    });
    response = await response.json();
    return response;
  };

  function restorePosition() {
    try {
      let positions = JSON.parse(window.localStorage.getItem("widgetPositions"));
      let index = positions.findIndex(element => element.widgetId === id);
      console.log(index);
      if (index >= 0) {
        setPosition(positions[index].position);
        setSize(positions[index].size);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTotals()
      .then((data: any) => {
        console.log(data);
        setCurrent(Number(data._sum.total_with_tax) as number);
      });
    
    restorePosition();
  }, [current]);

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
          <h1>{current} of {target}<br />{period}</h1>
          <Progress type="circle" percent={Math.ceil(current / target * 100)} />
        </div>
      </div>
    </Rnd>
  );
};

export default ProgressChart;
