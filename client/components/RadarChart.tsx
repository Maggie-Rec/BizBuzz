import React, { useState } from "react";
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
import { Radar } from 'react-chartjs-2';

interface Props {
  data: any
}

export const RadarChart = ({ data }: Props) => {

  return (
    <>
      <Radar
        data={data}
      />
    </>
  )
}