import { Button, Col, Row } from "react-bootstrap";
import { Gallery } from "react-grid-gallery";

export const S2_Customers = ({ scroll, vh, mobile }) => {
  const images = [
    {
      src: "/customers/customer3.png",
      width: 205,
      height: 357,
    },
    {
      src: "/customers/customer1.png",
      width: 548,
      height: 478,
    },
    {
      src: "/customers/customer2.png",
      width: 548,
      height: 478,
    },

    {
      src: "/customers/customer4.png",
      width: 548,
      height: 478,
    },
    {
      src: "/customers/customer5.png",
      width: 548,
      height: 478,
    },
    {
      src: "/customers/customer6.png",
      width: 548,
      height: 478,
    },
  ];

  return (
    <Row id="s2_customers " className="section p-0 m-0 bg_darker justify-content-md-start justify-content-md-start">
      <Col md={1} className="text-end p-0 d-none d-md-flex "></Col>

      <Col md={10} className="d-flex flex-column justify-content-start justify-content-md-evenly ">
        <Row>
          {" "}
          <Col md={6} className="d-flex flex-column justify-content-evenly align-items-center">
            <Row className="text-center p-2 mt-4">
              <span className="ft5 text-uppercase pb-2">Vous etes</span>
              <span className="ft05 text-uppercase ">Professionnel</span>
              <span className="ft2 p-4">quelles que soient les dimensions de votre espace</span>
            </Row>
            <Row className="flex-nowrap">
            <img src="Studios1.png" alt="Image du studio" className="p-3"></img>
            </Row>
            <Row className="d-flex">
              <Button variant="primary" className="mt-4">
                <i className="fad fa-projector"></i>Découvrir les réalisations
              </Button>
            </Row>
          </Col>
          <Col></Col>
          <Col md={5} className="d-none d-md-flex s2_customers_photo">
            <Gallery rowHeight={400} maxRows={2} images={images} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
