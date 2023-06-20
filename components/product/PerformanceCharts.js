import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from "chart.js";
import Papa from "papaparse";
import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import { documentByFilename } from "../dolibarrApi/fetch";
import { useQuery } from "react-query";

export const PerformanceCharts = ({ nom }) => {
  const [performances, setperformances] = useState({});
  const { data: chart, isSuccess: chartSucceed } = useQuery(["chart", { name: nom }], () => documentByFilename("Frequencies/" + nom +".csv"), { staleTime: Infinity, enabled: !!nom && nom != undefined });

  useEffect(() => {
    if (chartSucceed) {
      let buff = new Buffer(chart, "base64");
      let text = buff.toString("ascii");
      let parsedCsv = Papa.parse(text).data;
      parsedCsv.shift();
      setperformances({
        labels: parsedCsv.map((a, i) => parseFloat(a[0].replace(/,/g, "."))),
        difCoef: parsedCsv.map((a, i) => parseFloat(a[1].replace(/,/g, "."))),
        scatCoef: parsedCsv.map((a, i) => parseFloat(a[2].replace(/,/g, "."))),
      });
    }
  }, [chartSucceed]);

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

  const data = {
    labels: performances.labels,
    datasets: [
      {
        label: "Diffusion",
        backgroundColor: "#9fb07c",
        borderColor: "#9fb07c",
        data: performances.difCoef,
        tension: 0.2,
      },
      {
        label: "Scattering",
        backgroundColor: "#e07e7e",
        borderColor: "#e07e7e",
        data: performances.scatCoef,
        tension: 0.2,
      },
    ],
  };

  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

  return (
    <>
      <Row className="d-none d-md-flex ft8 graph_img"> {/*Mobile and desktop version*/}
      {chartSucceed ? <Line options={options} data={data} /> : null } 
      </Row>
      <Row className="d-md-none ft8">
       {chartSucceed ? <Line options={options} data={data} width={100} height={80} /> : null } 
      </Row>
    </>
  );
};