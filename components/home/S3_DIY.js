import { animated, useInView } from "@react-spring/web";
import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";

export const S3_DIY = () => {
  const [ref, springs] = useInView(() => ({
    from: {
      opacity: 0,
      scale: 0.5,
    },
    to: {
      opacity: 1,
      scale: 1,
    },
  }), {once:true});

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
      <Row id="s3_diy" className="section m-0 d-flex align-items-center justify-content-center w-100">
        <Col md={1} className="d-none d-md-flex"></Col>
        <Col md={11} className="d-flex flex_column h-100 justify-content-start align-items-center">
            <Row className="s3_diy_bg justify-content-center align-items-center p-2 p-md-5">
              <Col md={6} className="d-flex flex-column justify-content-evenly align-items-center s3_diy_draw p-0 ">
                <Row className="pt-2 ">
                  <Button variant="primary" className="button_home m-auto">
                    <i className="fad fa-draw-square"></i>Dessiner votre diffuseur
                  </Button>
                </Row>
                <Row className="d-none d-md-flex s3_line_bg w-75 h-25 align-items-center">
                  <div className="d-flex justify-content-evenly">
                    <span>Taille</span>
                    <span>Matière</span>
                    <span>Couleur</span>
                  </div>
                </Row>
                <Row className="s3_dif_diy mt-4">
                  <img src="./diy_diffuseur.svg" alt="Image d'un diffuseur personnalisé" />
                </Row>
              </Col>
              <Col md={6} className="d-flex flex-column s3_diy_guide_text justify-content-evenly">
                <Row className="justify-content-center ft1 text-uppercase text-center">
                  Comment fonctionne un diffuseur ?
                </Row>
                <Row className="text-center s3_row_icons justify-content-evenly flex-nowrap">
                  <Col className={explanation === 1 ? "border_creme " : null}>
                    {explanation === 1 ? (
                      <>
                        <i className="fad fa-arrow-alt-square-left s3_arrow_left"></i>
                        <i className="fad fa-arrow-alt-square-right s3_arrow_right"></i>
                      </>
                    ) : null}

                    <img
                      onMouseOver={() => setExplanation(1)}
                      src="./s3_guide_i1.png"
                      style={{ opacity: explanation === 1 ? 1 : 0.1 }}
                    ></img>
                  </Col>

                  <Col className={explanation === 2 ? "border_creme " : null}>
                    {explanation === 2 ? (
                      <>
                        <i className="fad fa-arrow-alt-square-left s3_arrow_left"></i>
                        <i className="fad fa-arrow-alt-square-right s3_arrow_right"></i>
                      </>
                    ) : null}

                    <img
                      onMouseOver={() => setExplanation(2)}
                      src="./s3_guide_i2.png"
                      style={{ opacity: explanation === 2 ? 1 : 0.1 }}
                    ></img>
                  </Col>

                  <Col className={explanation === 3 ? "border_creme " : null}>
                    {explanation === 3 ? (
                      <>
                        <i className="fad fa-arrow-alt-square-left s3_arrow_left"></i>
                        <i className="fad fa-arrow-alt-square-right s3_arrow_right"></i>
                      </>
                    ) : null}

                    <img
                      onMouseOver={() => setExplanation(3)}
                      src="./s3_guide_i3.png"
                      style={{ opacity: explanation === 3 ? 1 : 0.1 }}
                    ></img>
                  </Col>

                  <Col className={explanation === 4 ? "border_creme " : null}>
                    {explanation === 4 ? (
                      <>
                        <i className="fad fa-arrow-alt-square-left s3_arrow_left"></i>
                        <i className="fad fa-arrow-alt-square-right s3_arrow_right"></i>
                      </>
                    ) : null}

                    <img
                      onMouseOver={() => setExplanation(4)}
                      src="./s3_guide_i4.png"
                      style={{ opacity: explanation === 4 ? 1 : 0.1 }}
                    ></img>
                  </Col>
                </Row>
                <Row className="s3_row_explanation ft4">{switchExplanation(explanation)}</Row>
              </Col>
            </Row>
          </Col>
        
      </Row>
/*     </animated.div> */
  );
};
