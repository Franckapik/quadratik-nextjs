import { Col, Row } from "react-bootstrap";

export const S2_Customers = () => (
  <Row id="s2_customers" className="p-0 m-0">
    <Col md={2} className="text-end p-0 ">
      <Row className="p-0 m-0">
        <Col md={8} className="p-0 m-0">
          <img src="./vertical_square.svg" alt="Ligne verticale" className="s2_vertical_square" />
        </Col>
        <Col md={4} className="p-0 m-0 d-flex flex-colmun justify-content-end">
          <Row className="d-flex justify-content-between text-uppercase text-center list_pro">
            <Col>Home studio</Col>
            <Col>Salle de répétition</Col>
            <Col>Salle des fêtes</Col>
            <Col>Enregistrement</Col>
            <Col>Home cinéma</Col>
            <Col>Collectivités</Col>
          </Row>
        </Col>
      </Row>
    </Col>

    <Col md={10} className="d-flex flex-column justify-content-start ">
      <Row className="dark_bg  text-uppercase ">
      <Col md={2} className=""></Col>
        <Col md={8} >        <div className="text-center border_creme w-100 p-5">
          <span>Révelez votre</span>
          <h2>Professionnalisme</h2>
          <span className="sub2">quelles que soient les dimensions de votre espace</span>
        </div></Col>
        <Col md={2} className=""></Col>

      </Row>
      <Row className="justify-content-start">
        <Col md={2} className=""></Col>
        <Col md={8} ></Col>
        <Col md={2} className=""></Col>
      </Row>
    </Col>
  </Row>
);
