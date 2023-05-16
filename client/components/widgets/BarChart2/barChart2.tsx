import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend } from "chart.js";
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
import { useState, useEffect, SetStateAction } from "react";
import savePositionLocal, { restorePosition } from "../../../utils/posSaver";
import { Modal } from "antd";


interface IBarChartProps {
  id: number,
  labels: string[],
  datasetLabels: string[],
  datasetData: Array<number[]>
}

interface IBarData {
  labels: string[],
  datasets: Array<{
    label: string,
    data: number[],
    backgroundColor?: string 
  }>
}

function adequateBarData (labels: string[], datasetLabels: string[], datasetData: Array<number[]>) {

  // INTITAL BAR CHART OBJECT DATA
  const finalData : IBarData = {
    labels: labels,
    datasets: []
  }

  for (let i = 0; i < Math.min(datasetLabels.length, datasetData.length); i++) {
    finalData.datasets.push({
      label: datasetLabels[i],
      data: datasetData[i]
    })
  }

  return finalData;
}

const BarChart2 = ({id, labels, datasetLabels, datasetData} : IBarChartProps) => {

  /* SIZE OF THE WIDGET */
  const [size, setSize] = useState({ width: 300, height: 300 });
  /* POSITION OF THE WIDGET */
  const [position, setPosition] = useState({ x: 10, y: 10 });

  /* CURRENT DATA OF THE BAR CHART */
  const [barData, setBarData] = useState({} as IBarData);


  useEffect(() => {
    // setBarData(adequateBarData(labels, datasetLabels, datasetData));
    console.log(adequateBarData(labels, datasetLabels, datasetData))
  }, []);

  return (
    <Modal open={true}>
      <Bar data={barData}></Bar>
    </Modal>
  )
}

export default BarChart2;