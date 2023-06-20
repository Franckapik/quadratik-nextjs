import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from "chart.js";
import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import { useQuery } from "react-query";
import { CSVByFilename } from "../dolibarrApi/fetch";

export const PerformanceCharts = ({ product }) => {
  const [performances, setperformances] = useState({});
  const { data: chart, isSuccess: chartSucceed } = useQuery(["chart", { name: product?.nomenclature?.performance }], () => CSVByFilename("Frequencies/" + product.nomenclature.performance + ".csv"), {
    staleTime: Infinity,
    enabled: !!product?.nomenclature?.performance && product?.nomenclature?.performance != undefined,
  });

  useEffect(() => {
    if (chartSucceed && product.dimensions.F === undefined) { //diffusors

      const data = {
        labels: chart.map((a, i) => parseFloat(a[0]?.replace(/,/g, "."))),
        datasets: [
          {
            label: "Diffusion",
            backgroundColor: "#9fb07c",
            borderColor: "#9fb07c",
            data: chart.map((a, i) => parseFloat(a[1]?.replace(/,/g, "."))),
            tension: 0.2,
          },
          {
            label: "Scattering",
            backgroundColor: "#e07e7e",
            borderColor: "#e07e7e",
            data: chart.map((a, i) => parseFloat(a[2]?.replace(/,/g, "."))),
            tension: 0.2,
          },
        ],
      };

      setperformances(data);
    }
    if (chartSucceed && product.dimensions.F !== undefined) { //absorbers
      const data = {
        labels: chart.map((a, i) => parseFloat(a[0]?.replace(/,/g, "."))),
        datasets: [
          {
            label: "Absorption",
            backgroundColor: "#9fb07c",
            borderColor: "#9fb07c",
            data: chart.map((a, i) => parseFloat(a[1]?.replace(/,/g, "."))),
            tension: 0.2,
          },
        ],
      };
      setperformances(data);
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

  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

  return (
    <>
      {chartSucceed && Object.entries(performances).length && (
        <>
          <Row className="d-none d-md-flex ft8 graph_img">
            {/*Mobile and desktop version*/}
            <Line options={options} data={performances} />
          </Row>
          <Row className="d-md-none ft8">
            <Line options={options} data={performances} width={100} height={80} />
          </Row>
        </>
      )}
    </>
  );
};
