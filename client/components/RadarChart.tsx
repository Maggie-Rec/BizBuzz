import React, { useState } from "react";
import styles from "../styles/inventoryView.module.css";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  Filler,
  LineElement,
  RadialLinearScale,
} from "chart.js";
import { PointElement, RadarController } from "chart.js";
ChartJS.register(
  RadarController,
  LineElement,
  PointElement,
  RadialLinearScale,
  Title,
  Filler,
  Tooltip,
  Legend
);
import { Radar } from "react-chartjs-2";

interface Props {
  data: any;
}

export const RadarChart = ({ data }: Props) => {
  const options = {
    r: {
      suggestedMax: 100,
      suggestedMin: 0,
    },
  };

  return (
    <>
      <Radar data={data} options={options} className={styles.chart} />
    </>
  );
};
