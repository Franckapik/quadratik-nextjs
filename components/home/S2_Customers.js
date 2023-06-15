import { useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import Image from "next/image";
import studioImg from "../../public/images/home/Studios1.png";
import c3Img from "../../public/images/customers/customer3.webp";
import c1Img from "../../public/images/customers/customer1.webp";
import c2Img from "../../public/images/customers/customer2.webp";
import c4Img from "../../public/images/customers/customer4.webp";
import c5Img from "../../public/images/customers/customer5.webp";
import c6Img from "../../public/images/customers/customer6.webp";
import c7Img from "../../public/images/customers/customer7.webp";

export default function S2_Customers() {
  const [lgShow, setLgShow] = useState(false);

  return (
    <Row id="s2_customers " className="section p-0 m-0 bg_darker justify-content-md-start justify-content-md-start">
      <Col md={1} className="text-end p-0 d-none d-md-flex "></Col>

      <Col md={11} className="d-flex flex-column justify-content-center justify-content-md-start justify-content-md-evenly ">
        <Row>
          <Col md={5} className="d-flex flex-column justify-content-evenly align-items-center">
            <Row className="text-center p-2 mt-4">
              <span className="ft5 text-uppercase pb-2">Vous etes</span>
              <span className="ft05 text-uppercase ">Professionnel</span>
              <span className="ft2 p-4">quelles que soient les dimensions de votre espace</span>
            </Row>
            <Row className="flex-nowrap">
              <Image src={studioImg} alt="Image d'un studio d'enregistrement équipé de modèles Quadratik" className="p-3 h-100" style={{ objectFit: "contain" }} />
            </Row>

            <Row className="d-flex">
              <Col className="d-block d-md-none d-flex flex-column justify-content-center">
              </Col>
              <Row>
                <p className="m-0 mt-4 ft5 text-center text-uppercase"> Découvrir les projets </p>
                <Button variant="primary" className="mt-4" onClick={() => setLgShow(true)}>
                  - Les réalisations -
                </Button>
              </Row>
            </Row>
          </Col>
          <Col className="d-none d-md-flex"></Col>
          <Col md={5} className="s2_customers_photo d-none d-md-flex flex-column justify-content-center align-items-center ">
            <Row>
              <Col md={4} className=" p-0">
                <Image src={c3Img} alt="Image d'un studio d'enregistrement équipé de modèles Quadratik" style={{ objectFit: "cover" }} />
              </Col>
              <Col md={8} className=" p-0">
                <Image src={c1Img} alt="Image d'un studio d'enregistrement équipé de modèles Quadratik" style={{ objectFit: "cover" }} />
              </Col>
            </Row>
            <Row>
              <Col md={5} className=" p-0">
                <Image src={c2Img} alt="Image d'un studio d'enregistrement équipé de modèles Quadratik" style={{ objectFit: "cover" }} />
              </Col>
              <Col md={7} className=" p-0">
                <Image src={c5Img} alt="Image d'un studio d'enregistrement équipé de modèles Quadratik" style={{ objectFit: "cover" }} />
              </Col>
            </Row>
          </Col>
          <Col className="d-none d-md-flex"></Col>
        </Row>
      </Col>

      <Modal show={lgShow} onHide={() => setLgShow(false)} fullscreen={true} theme>
        <Modal.Header closeButton>
          <Modal.Title className="text-dark">Les réalisations Quadratik</Modal.Title>
        </Modal.Header>

        <Modal.Body className="s2_modal_gallery bg_dark">
          <Col className="s2_customers_photo">
Gallerie ici
          </Col>
        </Modal.Body>
      </Modal>
    </Row>
  );
}
