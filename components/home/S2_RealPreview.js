import { Col, Row } from "react-bootstrap";

export const S2_RealPreview = () => (
  <Row id="s2_realPreview">
    <Col md={2}></Col>
    <Col md={10} className="d-flex flex-column ">
      <Row className="justify-content-center align-items-center h-100">
        <Col md={8} className="d-flex flex-column p-0 justify-content-center align-items-center">
          <img
            className="border_creme"
            src="./studio_picture1.png"
            alt="Photgraphie des produits quadratik.fr dans le studio DiscoCasino de Rennes" />
        </Col>
      </Row>
    </Col>
  </Row>
);
