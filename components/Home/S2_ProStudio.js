import { Col, Row } from "react-bootstrap";

export const S2_ProStudio = () => (
  <Row id="s2_proStudio">
    <Col md={2}></Col>
    <Col md={10} className="d-flex flex-column">
      <Row className="justify-content-center align-items-center h-100">
        <Col md={8} className="d-flex flex-column  p-0 justify-content-end align-items-center">
          <img src="./studio2.svg" alt="image de studio d'enregistrement de musique" />
        </Col>
      </Row>
    </Col>{" "}
  </Row>
);
