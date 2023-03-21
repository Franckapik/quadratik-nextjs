import { Col, Row } from "react-bootstrap";

export const S1_Square = () => {
  return (
    <Row id="s1_square" className="justify-content-start align-items-center m-0 ">
      <Col md={1}></Col>
      <Col md={5} className="border_creme s1_square text-end pt-3">
        {" "}
        Le diffuseur Woodik-7
      </Col>
    </Row>
  );
};
