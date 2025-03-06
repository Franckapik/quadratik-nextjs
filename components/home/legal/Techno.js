import Image from "next/image";
import { Col, Modal, Row } from "react-bootstrap";
import reactImg from "../../../public/images/techno/react.svg"
import threejsImg from "../../../public/images/techno/threejs.svg"
import chartjsImg from "../../../public/images/techno/chartjs.svg"
import bootstrapÎmg from "../../../public/images/techno/bootstrap.svg"
import nextjsImg from "../../../public/images/techno/nextjs.svg"
import dolibarrImg from "../../../public/images/techno/dolibarr.png"
import reactHookFormImg from "../../../public/images/techno/reacthookform.jpg"
import dreiImg from "../../../public/images/techno/drei.jpeg"
import zustandImg from "../../../public/images/techno/zustand.png"


export const Techno = ({ show, setShow }) => {
  return (
    <Modal show={show} onHide={() => setShow(!show)}  size="lg">
      <Modal.Header closeButton>
        <Modal.Title className="text_creme">Technologies Webdesign de Quadratik.fr</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="techno_main_row bg_creme ">
          <Row>
            <Col>
              <Image style={{ objectFit: 'contain' }} src={reactImg} alt="Logo du framework React" />
            </Col>
            <Col>
              <Image style={{ objectFit: 'contain' }} src={bootstrapÎmg} alt="Logo du framework Bootstrap" />
            </Col>
            <Col>
              <Image style={{ objectFit: 'contain' }} src={nextjsImg} alt="Logo du framework Nextjs" />
            </Col>
          </Row>
          <Row>
            <Col>
              <Image style={{ objectFit: 'contain' }} src={dreiImg} alt="Logo du threejs helper Drei" />
            </Col>
            <Col>
              <Image style={{ objectFit: 'contain' }} src={chartjsImg} alt="Logo de Chartjs" />
            </Col>
            <Col>
              <Image style={{ objectFit: 'contain' }} src={reactHookFormImg} alt="Logo de react Hook Form" />
            </Col>
          </Row>
          <Row>
            <Col>
              <Image style={{ objectFit: 'contain' }} src={threejsImg} alt="Logo de Threejs" />
            </Col>
            <Col>
              <Image style={{ objectFit: 'contain' }} src={zustandImg} alt="Logo du manager de store Zustand" />
            </Col>
            <Col>
              <Image style={{ objectFit: 'contain' }} src={dolibarrImg} alt="Logo du programme libre ERM Dolibarr" />
            </Col>
          </Row>
        </Row>
      </Modal.Body>
    </Modal>
  );
};
