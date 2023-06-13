import { useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { Gallery } from "react-grid-gallery";
import { useBearStore } from "../../hooks/store";
import Image from "next/image";
import studioImg from "../../public/images/home/Studios1.png";

export default function S2_Customers () {
  const height = useBearStore((state) => state.height);
  const images = [
    {
      src: "/images/customers/customer3.webp",
      width: 205,
      height: 357,
      alt: "Diffuseur 1D avec finition huile",
    },
    {
      src: "/images/customers/customer1.webp",
      width: 548,
      height: 478,
      alt: "Modèles présentés depuis le studio d'enregistrement Disco Casino Rennes",
    },
    {
      src: "/images/customers/customer2.webp",
      width: 548,
      height: 478,
      alt: "Salle de régie et d'enregistrement Auray",
    },

    {
      src: "/images/customers/customer4.webp",
      width: 268,
      height: 400,
      alt: "Diffuseur 1D et 2D en peuplier clair",
    },
    {
      src: "/images/customers/customer5.webp",
      width: 548,
      height: 478,
      alt: "Diffuseurs 2D dans un salon HIFI Home cinéma",
    },
    {
      src: "/images/customers/customer6.webp",
      width: 548,
      height: 478,
      alt: "Diffuseur 2D en peuplier dans une salle d'essai de fabrication de bombardes",
    },
    {
      src: "/images/customers/customer7.webp",
      width: 205,
      height: 357,
      alt: "Diffuseur 2D présenté sur un piano Rhodes",
    },
  ];

  const [lgShow, setLgShow] = useState(false);

  return (
    <Row id="s2_customers " className="section p-0 m-0 bg_darker justify-content-md-start justify-content-md-start">
      <Col md={1} className="text-end p-0 d-none d-md-flex "></Col>

      <Col md={10} className="d-flex flex-column justify-content-center justify-content-md-start justify-content-md-evenly ">
        <Row>
          <Col md={6} className="d-flex flex-column justify-content-evenly align-items-center">
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
                <Gallery id="s2_mobile_gallery" rowHeight={80} maxRows={1} images={images} />
              </Col>
              <Row> <p className="m-0 mt-4 ft5 text-center text-uppercase"> Découvrir les projets </p>
              <Button variant="primary" className="mt-4" onClick={() => setLgShow(true)}>
                - Les réalisations -
              </Button></Row>
             
            </Row>
          </Col>
          <Col></Col>
          <Col md={5} className="d-none d-md-block s2_customers_photo">
            <Gallery rowHeight={300} maxRows={2} images={images} />
          </Col>
        </Row>
      </Col>

      <Modal show={lgShow} onHide={() => setLgShow(false)} fullscreen={true} theme>
        <Modal.Header closeButton>
          <Modal.Title className="text-dark">Les réalisations Quadratik</Modal.Title>
        </Modal.Header>

        <Modal.Body className="s2_modal_gallery bg_dark">
          <Col className="s2_customers_photo">
            <Gallery rowHeight={height / 2.3} images={images} />
          </Col>
        </Modal.Body>
      </Modal>
    </Row>
  );
};
