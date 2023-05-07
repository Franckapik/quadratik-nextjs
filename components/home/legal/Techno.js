import Image from "next/image";
import { Col, Modal, Row } from "react-bootstrap";

export const Techno = ({ show, setShow }) => {
  return (
    <Modal show={show} onHide={() => setShow(!show)} className="text_dark" size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Technologies Webdesign de Quadratik.fr</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="techno_main_row  ">
          <Row>
            <Col>
              <img src="techno/react.svg" alt="Logo du framework React" />
            </Col>
            <Col>
              <img src="techno/bootstrap.svg" alt="Logo du framework Bootstrap" />
            </Col>
            <Col>
              <img src="techno/nextjs.svg" alt="Logo du framework Nextjs" />
            </Col>
          </Row>
          <Row>
            <Col>
              <img src="techno/drei.jpeg" alt="Logo du threejs helper Drei" />
            </Col>
            <Col>
              <img src="techno/chartjs.svg" alt="Logo de Chartjs" />
            </Col>
            <Col>
              <img src="techno/reacthookform.jpg" alt="Logo de react Hook Form" />
            </Col>
          </Row>
          <Row>
            <Col>
              <img src="techno/threejs.svg" alt="Logo de Threejs" />
            </Col>
            <Col>
              <img src="techno/zustand.png" alt="Logo du manager de store Zustand" />
            </Col>
            <Col>
              <img src="techno/dolibarr.png" alt="Logo du programme libre ERM Dolibarr" />
            </Col>
          </Row>
        </Row>
      </Modal.Body>
    </Modal>
  );
};
