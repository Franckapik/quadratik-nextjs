import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from "chart.js";
import React, { useEffect, useState } from "react";
import { Button, Col, Modal, Row, Table } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import useToggle from "../../hooks/useToggle";

export const PerformanceCharts = ({ product }) => {
  const [performances, setperformances] = useState({});
  const [show, setShow] = useToggle();

  useEffect(() => {
    if (product.frequencies && product.dimensions.F === undefined) {
      //diffusors
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

      setperformances(data);
    }
    if (product.frequencies && product.dimensions.F !== undefined) {
      //absorbers
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
      setperformances(data);
    }
  }, [product]);

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
      {product.frequencies && Object.entries(performances).length && (
        <>
          <Row className="d-none d-md-flex ft8 graph_img">
            {/*Mobile and desktop version*/}
            <Line options={options} data={performances} />
          </Row>
          <Row className="d-md-none ft8">
            <Line options={options} data={performances} width={100} height={80} />
          </Row>
          <Row>
            <Col className="d-flex justify-content-center">
              {" "}
              <Button variant="secondary" className="btn-outline m-4" size="sm" onClick={() => setShow()}>
                Tableau des valeurs d'absorption
              </Button>
            </Col>
          </Row>
          <Modal size="lg" show={show} onHide={() => setShow()}>
            <Modal.Header closeButton>Tableau des valeurs d'absorption du modèle {product.nomenclature.simple} </Modal.Header>
            <Modal.Body>
              <Table variant="light" striped bordered hover className="text-center">
                <tbody>
                  <tr>
                    <td>Fréquences</td>
                    <td>Absorption (Alpha sabine)</td>
                  </tr>
                  {Object.values(performances?.datasets[0].data) //cellules
                    .map((a, i) => {
                      return (
                        <tr key={"perf_labels" + i}>
                          <td> {performances.labels[i]} Hz</td>
                          <td> {a}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </Modal.Body>
          </Modal>
        </>
      )}
    </>
  );
};
