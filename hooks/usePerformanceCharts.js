import { useEffect, useState, useRef } from "react";
import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from "chart.js";
import { Line } from "react-chartjs-2";
import { useToggle } from "./useToggle";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const usePerformanceCharts = (product) => {
  const [performances, setPerformances] = useState(null);
  const [chartsImg, setChartsImg] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (product?.frequencies && product.dimensions.F === undefined) {
      // diffusors
      const data = {
        labels: product.frequencies.labels,
        datasets: [
          {
            label: "Diffusion",
            backgroundColor: "#9fb07c",
            borderColor: "#9fb07c",
            data: product.frequencies.diffusion,
            tension: 0.2,
          },
          {
            label: "Scattering",
            backgroundColor: "#e07e7e",
            borderColor: "#e07e7e",
            data: product.frequencies.scattering,
            tension: 0.2,
          },
        ],
      };

      setPerformances(data);
    }
    if (product?.frequencies && product.dimensions.F !== undefined) {
      // absorbers
      const data = {
        labels: product.frequencies.labels,
        datasets: [
          {
            label: "Absorption",
            backgroundColor: "#e0e66e",
            borderColor: "#e0e66e",
            data: product.frequencies.absorption,
            tension: 0.2,
          },
        ],
      };

      setPerformances(data);
    }
  }, [product]);

  useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current;
      const base64Image = chart.toBase64Image();
      console.log(base64Image);

      setChartsImg(base64Image);
    }
  }, [performances]);

  const ChartComponent = () =>
    performances ? (
      <Line
        ref={chartRef}
        options={{
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              display: true,
              
              ticks: {
                font: {
                  size: 5,
                  color : "red"
              }},
              grid: {
                display: false,
              },
            },
            y: {
              display: false,
              grid: {
                display: false,
              },
            },
          },
          legend: { display : false  },
          animation: false,
          datasets: {
            line: {
              borderWidth: 1,
            },
          },
          elements: {
            point: {
              borderWidth: 0,
              radius: 0,
              backgroundColor: "rgba(130, 56, 56, 0)",
            },
            maintainAspectRatio: false,
          },
        }}
        data={performances}
        height={80}
        width={100}
      />
    ) : null;

  return { chartsImg, ChartComponent };
};
