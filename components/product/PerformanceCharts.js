import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from "chart.js";
import React from "react";
import { Line } from "react-chartjs-2";
import dataCsv from "../../public/performances/CSV/D2N7P15W50.csv";
import { Row } from "react-bootstrap";

export const PerformanceCharts = () => {
  const options = {
    //no points on line
    elements: {
      point: {
        borderWidth: 0,
        radius: 0,
        backgroundColor: "rgba(0,0,0,0)",
      },
      maintainAspectRatio: false,
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
   <><Row className="d-none d-md-flex ft8">
      <Line options={options} data={data}  />
    </Row>
    <Row className="d-md-none ft8">
      <Line options={options} data={data} width={100} height={80}/>
    </Row></> 
  );
};
