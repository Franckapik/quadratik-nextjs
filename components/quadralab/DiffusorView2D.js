import React from "react";
import { Col, Row } from "react-bootstrap";
import { useProductStore } from "../../hooks/store";

export const DiffusorView2D = () => {
  const report2D = useProductStore((state) => state.report2D);
  const ratio = useProductStore((state) => state.ratio);


  return (
    <Row className="w-100">
      <Row className="bg_darker pt-2 pb-2 mb-4">
        {Array(report2D.Type)
          .fill("")
          .map((a, i) => {
            return <Col className="text-center">{ratio ? report2D[i]?.ratio : report2D[i]?.hauteur}</Col>;
          })}
      </Row>
      <Row className="align-items-end">
        {Array(report2D.Type)
          .fill("")
          .map((a, i) => {
            return <Col className="border_creme bg_green" style={{ height: report2D[i]?.ratio * 10 }}></Col>;
          })}
      </Row>
      <Row className="bg_darker pt-2 pb-2 mb-4">
        {Array(report2D.Type)
          .fill("")
          .map((a, i) => {
            return <Col className="text-center">{i}</Col>;
          })}
      </Row>
    </Row>
  );
};
