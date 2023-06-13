import { animated, useInView } from "@react-spring/web";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import encartHautImg from "../../public/images/home/Indus_haut.png";
import encartBasImg from "../../public/images/home/Indus_bas.png";
import guide1Img from "../../public/images/home/s3_guide_i1.png";
import guide2Img from "../../public/images/home/s3_guide_i2.png";
import guide3Img from "../../public/images/home/s3_guide_i3.png";
import guide4Img from "../../public/images/home/s3_guide_i4.png";
import diffusorDiyImg from "../../public/images/home/diy_diffuseur.png";

export const S3_DIY = () => {
  const switchExplanation = (explanation) => {
    switch (explanation) {
      case 0:
        return <Col>Une onde sonore entre en contact avec les cellules du diffuseur de différentes profondeurs.</Col>;
      case 1:
        return <Col>Plus la profondeur de ces cellules est importante, plus le diffuseur sera efficace avec les basses fréquences.</Col>;
      case 2:
        return <Col>Plus les cellules sont étroites, plus le diffuseur sera efficace dans les aigus.</Col>;
      case 3:
        return <Col>Plus le nombre de cellules est élevé, plus les rebonds sont importants et plus la diffusion est effective.</Col>;
      default:
        return null;
    }
  };

  const [explanation, setExplanation] = useState();

  useEffect(() => {
    let a = 0;
    const intervalId = setInterval(() => {
      setExplanation(a % 4);
      a++;
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Row id="s3_diy" className="section bg_darker m-0 d-flex align-items-center justify-content-center h-100 w-100">
      <Col md={1} className="d-none d-md-flex"></Col>
      <Col md={11} className="d-none d-md-flex flex_column h-100 justify-content-center align-items-center">
        <Row className="s3_diy_bg justify-content-center align-items-center p-2 p-md-5">
          <Col md={6} className="d-flex flex-column s3_diy_guide_text  order-md-last ">
            <Row className="pb-md-4 d-none d-md-flex">
              <Image className="d-block w-100" src={encartHautImg} alt="Encart industriel du haut" style={{ objectFit: "contain" }} />
            </Row>
            <Row className="justify-content-center ft5 text-uppercase text-center  mb-4">Comment fonctionne un diffuseur ?</Row>
            <div className="d-flex s2_hor_swipe s3_diy_swipe flex-nowrap p-md-2 align-items-center text-center">
              <div className="s3_arrow d-flex d-md-none justify-content-center align-items-center h-100">
                <i className="fad fa-chevron-left "></i>
              </div>
              <Col>
                <Image alt="Une onde sonore en contact avec une cellule de diffuseur acoustique" onMouseOver={() => setExplanation(0)} src={guide1Img} style={{ opacity: explanation === 0 ? 1 : 0.1, objectFit: "contain" }}></Image>
              </Col>

              <Col>
                <Image alt="La profondeur des cellule d'un diffuseur acoustique influence le traitement des basses fréquences" onMouseOver={() => setExplanation(1)} src={guide2Img} style={{ opacity: explanation === 1 ? 1 : 0.1, objectFit: "contain" }}></Image>
              </Col>

              <Col>
                <Image alt="La largeur des cellules d'un diffuseur acoustique conditionne le traitement dans les aigus" onMouseOver={() => setExplanation(2)} src={guide3Img} style={{ opacity: explanation === 2 ? 1 : 0.1, objectFit: "contain" }}></Image>
              </Col>

              <Col>
                <Image alt="L'efficacité du traitement dépend du nombre de cellules d'un diffuseur acoustique" onMouseOver={() => setExplanation(3)} src={guide4Img} style={{ opacity: explanation === 3 ? 1 : 0.1, objectFit: "contain" }}></Image>
              </Col>
              <div className="s3_arrow d-flex d-md-none justify-content-center align-items-center h-100">
                <i className="fad fa-chevron-right "></i>
              </div>
            </div>
            <div className="s3_row_explanation p-md-4">{switchExplanation(explanation)}</div>
            <div className="d-flex flex-column d-md-none justify-content-center w-100 mt-4">
              <p className="mt-4  ft5 text-center text-uppercase"> Dessiner votre diffuseur </p>

              <Button variant="primary" className="">
                - Le Quadralab -
              </Button>
            </div>
            <Row className="d-none d-md-flex">
              <Image style={{ objectFit: "contain" }} alt="Encart industriel du bas" src={encartBasImg}></Image>
            </Row>
          </Col>
          <Col md={6} className="d-none d-md-flex flex-column justify-content-evenly align-items-center s3_diy_draw p-0 order-md-first ">
            <Row>
              <p className="m-0 pb-2 ft5 text-center"> Dessiner votre diffuseur </p>
              <div className="p-4 text-center">
                <Button variant="primary" className="button_home" href="/quadralab?childCat=6&vid=146&dpid=8">
                  - Le Quadralab -
                </Button>
              </div>
            </Row>
            <Row className=" s3_line_bg w-75 h-25 align-items-center">
              <div className="d-flex justify-content-evenly">
                <span>Taille</span>
                <span>Matière</span>
                <span>Couleur</span>
              </div>
            </Row>
            <Row className="s3_dif_diy mt-4">
              <Image style={{ objectFit: "contain" }} src={diffusorDiyImg} alt="Image d'un diffuseur personnalisé" />
            </Row>
          </Col>
        </Row>
      </Col>
      <Col className="d-flex d-md-none flex-column h-100 justify-content-center align-items-center">
        <Row className="s3_dif_diy justify-content-center">
          <Image style={{ objectFit: "contain" }} src={diffusorDiyImg} alt="Image d'un diffuseur personnalisé" />
        </Row>
        <div className="d-flex flex-column justify-content-center w-100 mt-4">
          <p className="mt-4  ft5 text-center text-uppercase"> Dessiner votre diffuseur </p>

          <Button variant="primary" className="">
            - Le Quadralab -
          </Button>
        </div>
      </Col>
    </Row>
  );
};
