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
  }));

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
    <animated.div style={springs} ref={ref}>
      <Row id="s3_diy" className="m-0 d-flex align-items-center justify-content-center w-100">
        <Col md={1}></Col>
        <Col md={11} className="d-flex flex_column h-100 justify-content-center align-items-center">
          <Col md={11}>
            {" "}
            <Row className="s3_diy_bg s3_diy_bg_content  w-100 justify-content-center align-items-center p-4 m-0">
              <Col xl={6} className="d-flex flex-column h-100 ps-4 p-0 ">
                <Row className="pt-5 ">
                  <Button variant="primary" className="button_home m-auto">
                  <i className="fad fa-draw-square"></i>Dessiner votre diffuseur
                  </Button>
                </Row>
              </Col>
              <Col xl={6} className="s3_diy_guide_text d-flex flex-column pe-4 p-0  ">
                <Row className="values_text_title text-center p-4 ps-5 ">
                  <p className="p-0">Comment fonctionne un diffuseur ?</p>
                </Row>
                <Row className="ps-5 p-4 w-100 text-center s3_row_icons">
                  <Col xl={3} className={explanation === 1 ? "border_creme " : null}>
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

                  <Col xl={3} className={explanation === 2 ? "border_creme " : null}>
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

                  <Col xl={3} className={explanation === 3 ? "border_creme " : null}>
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

                  <Col xl={3} className={explanation === 4 ? "border_creme " : null}>
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
                <Row className="ps-5 p-4 s3_row_explanation">{switchExplanation(explanation)}</Row>
              </Col>
            </Row>
          </Col>
        </Col>
      </Row>
    </animated.div>
  );
};
