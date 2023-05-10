import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from "chart.js";
import Papa from "papaparse";
import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import { documentByFilename, documentByProductId } from "../dolibarrApi/fetch";

export const PerformanceCharts = ({ nomenclature }) => {
  const [performances, setperformances] = useState({});
  const [error, setError] = useState(false);

  Object.filter = (obj, predicate) =>
    Object.keys(obj)
      .filter((key) => predicate(obj[key]))
      .reduce((res, key) => ((res[key] = obj[key]), res), {});

  useEffect(() => {
    if (nomenclature) {
      documentByProductId(8)
        .get()
        .then((response) => {
          const csvObj = Object.filter(response.data.ecmfiles_infos, (val) => val.filename.includes(nomenclature.performance));
          if (Object.keys(csvObj).length) {
            console.log(nomenclature.performance);
            const filename = Object.values(csvObj)[0].filename;
            const filepath = Object.values(csvObj)[0].filepath.replace("produit/", "");
            documentByFilename(filepath + "/" + filename)
              .get()
              .then((response) => {
                let buff = new Buffer(response.data.content, "base64");
                let text = buff.toString("ascii");
                let parsedCsv = Papa.parse(text).data;
                parsedCsv.shift();
                setperformances({
                  labels: parsedCsv.map((a, i) => parseFloat(a[0].replace(/,/g, "."))),
                  difCoef: parsedCsv.map((a, i) => parseFloat(a[1].replace(/,/g, "."))),
                  scatCoef: parsedCsv.map((a, i) => parseFloat(a[2].replace(/,/g, "."))),
                });
              })
          }
        })
        .catch((error) => {
          setError(true);
          console.log(error);
        });
    }
  }, [nomenclature]);

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
      <Row className="d-none d-md-flex ft8"> {/*Mobile and desktop version*/}
      {!error ? <Line options={options} data={data} /> : "Ce modèle ne dispose pas encore de données techniques. Vous pouvez vous renseigner sur ce produit via la rubrique Contact " } 
      </Row>
      <Row className="d-md-none ft8">
       {!error ? <Line options={options} data={data} width={100} height={80} /> : "Ce modèle ne dispose pas encore de données techniques. Vous pouvez vous renseigner sur ce produit via la rubrique Contact " } 
      </Row>
    </>
  );
};
