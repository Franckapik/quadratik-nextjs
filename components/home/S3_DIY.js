import { animated, useInView } from "@react-spring/web";
import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";

export const S3_DIY = () => {
  const [ref, springs] = useInView(
    () => ({
      from: {
        opacity: 0,
        scale: 0.5,
      },
      to: {
        opacity: 1,
        scale: 1,
      },
    }),
    { once: true }
  );

  const switchExplanation = (explanation) => {
    switch (explanation) {
      case 1:
        return (
          <Col>
            Une onde sonore qui arrive sur un diffuseur entre en contact avec des cellules de différentes profondeurs,
            induisant des rebonds dans de multiples directions.
          </Col>
        );
      case 2:
        return (
          <Col>
            Plus la profondeur de ces cellules est importante, plus le diffuseur sera efficace avec les basses
            fréquences.
          </Col>
        );
      case 3:
        return <Col>Plus les cellules sont étroites, plus le diffuseur sera efficace dans les aigus.</Col>;
      case 4:
        return (
          <Col>
            Plus le nombre de cellules est élevé, plus le nombre de rebonds est important et plus le phénomène de
            diffusion est effectif.
          </Col>
        );
      default:
        return null;
    }
  };

  const [explanation, setExplanation] = useState(1);

  return (
    /*     <animated.div style={springs} ref={ref}> */
    <Row id="s3_diy" className="section bg_darker m-0 d-flex align-items-center justify-content-center h-100 w-100">
      <Col md={1} className="d-none d-md-flex"></Col>
      <Col md={11} className="d-flex flex_column h-100 justify-content-start align-items-center">
        <Row className="s3_diy_bg justify-content-center align-items-center">
          <Col md={6} className="d-flex flex-column s3_diy_guide_text justify-content-evenly order-md-last p-2 p-md-5">
            <Row className="justify-content-center ft4 text-uppercase text-center">
              Comment fonctionne un diffuseur ?
            </Row>
            <Row className="d-flex s2_hor_swipe s3_diy_swipe flex-nowrap p-md-0 align-items-center text-center">
              <div className="s3_arrow d-flex d-md-none justify-content-center align-items-center h-100">
                <i className="fad fa-chevron-left "></i>
              </div>
              <Col >
                <img
                  onMouseOver={() => setExplanation(1)}
                  src="./s3_guide_i1.png"
                  style={{ opacity: explanation === 1 ? 1 : 0.1 }}
                ></img>
              </Col>

              <Col >
                <img
                  onMouseOver={() => setExplanation(2)}
                  src="./s3_guide_i2.png"
                  style={{ opacity: explanation === 2 ? 1 : 0.1 }}
                ></img>
              </Col>

              <Col >
                <img
                  onMouseOver={() => setExplanation(3)}
                  src="./s3_guide_i3.png"
                  style={{ opacity: explanation === 3 ? 1 : 0.1 }}
                ></img>
              </Col>

              <Col >
                <img
                  onMouseOver={() => setExplanation(4)}
                  src="./s3_guide_i4.png"
                  style={{ opacity: explanation === 4 ? 1 : 0.1 }}
                ></img>
              </Col>
              <div className="s3_arrow d-flex d-md-none justify-content-center align-items-center h-100">
                <i className="fad fa-chevron-right "></i>
              </div>
            </Row>
            <Row className="s3_row_explanation ft4">{switchExplanation(explanation)}</Row>
            <Row className="d-md-none pt-2 ">
              <Button variant="primary" className="button_home m-auto">
                <i className="fad fa-draw-square"></i>Dessiner votre diffuseur
              </Button>
            </Row>
          </Col>
          <Col
            md={6}
            className="d-none d-md-flex flex-column justify-content-evenly align-items-center s3_diy_draw p-0 order-md-first "
          >
            <Row className="pt-2 ">
              <Button variant="primary" className="button_home m-auto">
                <i className="fad fa-draw-square"></i>Dessiner votre diffuseur
              </Button>
            </Row>
            <Row className=" s3_line_bg w-75 h-25 align-items-center">
              <div className="d-flex justify-content-evenly">
                <span>Taille</span>
                <span>Matière</span>
                <span>Couleur</span>
              </div>
            </Row>
            <Row className=" s3_dif_diy mt-4">
              <img src="./diy_diffuseur.svg" alt="Image d'un diffuseur personnalisé" />
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
    /*     </animated.div> */
  );
};
