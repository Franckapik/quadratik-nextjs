import { Card, Carousel, Col, Modal, Row } from "react-bootstrap";
import Image from "next/image";
import c3Img from "../../public/images/customers/customer3.png";
import c2Img from "../../public/images/customers/customer2.png";
import c1Img from "../../public/images/customers/customer1.png";
import c4Img from "../../public/images/customers/customer4.png";
import c5Img from "../../public/images/customers/customer5.png";
import c6Img from "../../public/images/customers/customer6.png";
import c7Img from "../../public/images/customers/customer7.png";
import { LayoutHome } from "../../components/LayoutHome";

const images = [c3Img, c1Img, c2Img, c4Img, c7Img, c5Img, c6Img];

const Realisations = ({ lgShow, setLgShow }) => {
  return (
    <>
      <LayoutHome home contact fixed dark />

      <Row className="realisations layout_space">
        {images.map((a, i) => (
          <Col key={"gallery" + i}>
            <Card>
              <Image src={a} alt="Image d'un studio d'enregistrement équipé de modèles Quadratik" style={{ objectFit: "contain" }} />
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Realisations;
