import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip
} from "chart.js";
import React from "react";
import { Line } from "react-chartjs-2";
import dataCsv from "../../public/performances/CSV/D2N7P15W50.csv";

export const PerformanceCharts = () => {
  const options = {
    //no points on line
    elements: {
      point: {
        borderWidth: 0,
        radius: 0,
        backgroundColor: "rgba(0,0,0,0)",
      },
    },
  };

  const labels = dataCsv.map((a, i) => a["Frequency [Hz]"]);
  const difCoef = dataCsv.map((a, i) => parseFloat(a["Diffusion Coefficient"].replace(/,/g, ".")));
  const scatCoef = dataCsv.map((a, i) => parseFloat(a["Scattering Coefficient"].replace(/,/g, ".")));

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Diffusion",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: difCoef,
        tension: 0.2,
      },
      {
        label: "Scattering",
        backgroundColor: "blue",
        borderColor: "blue",
        data: scatCoef,
        tension: 0.2,
      },
    ],
  };

  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

  return (
    <Line options={options} data={data} />
  );
};
