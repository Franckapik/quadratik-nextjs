import React from "react";
import { Col, Row } from "react-bootstrap";
import { useProductStore } from "../../hooks/store";

export const QuadralabView1D = ({product}) => {
  const ratio = useProductStore((state) => state.ratio);
  console.log();
  return (
    <Col className="quadralab_view1d_main ">
      <Row className="bg_darker values">
        {Array(product.dimensions.p)
          .fill("")
          .map((a, i) => {
            return <Col className="text-center">{ratio ? product.dimensions.report[i]?.ratio : product.dimensions.report[i]?.hauteur}</Col>;
          })}
      </Row>
      <Row className="align-items-end bg_creme" style={{ height: product.dimensions.amax * 10 + 10 }}>
        {Array(product.dimensions.p)
          .fill("")
          .map((a, i) => {
            return <Col className="border_creme bg_green" style={{ height: product.dimensions.report[i]?.ratio * 10 }}></Col>;
          })}
      </Row>
      <Row className="bg_darker values">
        {Array(product.dimensions.p)
          .fill("")
          .map((a, i) => {
            return <Col className="text-center">{i}</Col>;
          })}
      </Row>
    </Col>
  );
};
