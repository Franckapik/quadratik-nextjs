import { Button, Col, Row } from "react-bootstrap";
import LazyLoad from "react-lazy-load";

export const S3_DIY = () => {
  {
    /*const [flipped, set] = useState(false)
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  })
 
    <div className={container} onClick={() => set(state => !state)}>
      <a.div
        className={"bg-red"}
        style={{ opacity: opacity.to(o => 1 - o), transform }}
      />
       <a.div
        className={`${c} ${front}`}
        style={{
          opacity,
          transform,
          rotateX: '180deg',
        }}
      />
      </div>*/
  }

  return (
    <LazyLoad threshold={0.2}>
      <Row id="s3_diy" className="m-0 d-flex align-items-center justify-content-center">
        <Col md={10} className="d-flex flex_column s3_diy_bg p-0 m-0 border_creme">
          <Row className="s3_diy_bg_content w-100 justify-content-center align-items-center p-4">
            <Col xl={6} className="d-flex flex-column h-100 ">
              <Row className="pt-5 ">
                <Button variant="primary" className="button_home w-50 m-auto">
                  Dessiner un diffuseur
                </Button>
              </Row>
              <Row className="pt-5"></Row>
            </Col>
            <Col xl={6} className="s3_diy_guide_text d-flex flex-column h-100 p-5 ">
              <Row className="s3_diy_guide_row">Comment fonctionne un diffuseur ? </Row>
              <Row className="justify-content-evenly pt-4 w-100">
                <Col xl={2} className="text-center">
                  <img src="./s3_guide_i1.png"></img>
                </Col>
                {/*  <Col xl={10}>
              Une onde sonore qui arrive sur un diffuseur entre en contact avec des cellules de différentes
              profondeurs, induisant des rebonds dans de multiples directions.
            </Col>{" "}
          </Row>
          <Row>*/}
                <Col xl={2} className="text-center">
                  <img className="" src="./s3_guide_i2.png"></img>
                </Col>
                {/*  <Col xl={10}>
              Plus la profondeur de ces cellules est importante, plus le diffuseur sera efficace avec les basses
              fréquences.
            </Col>{" "}
          </Row>
          <Row>*/}
                <Col xl={2} className="text-center">
                  <img src="./s3_guide_i3.png"></img>
                </Col>
                {/*  <Col xl={10}>Plus les cellules sont étroites, plus le diffuseur sera efficace dans les aigus.</Col>{" "}
          </Row>
          <Row> */}
                <Col xl={2} className="text-center">
                  <img src="./s3_guide_i4.png"></img>
                </Col>
                {/*  <Col xl={10}>
              Plus le nombre de cellules est élevé, plus le nombre de rebonds est important et plus le phénomène de
              diffusion est effectif.import { useSpring } from '@react-spring/web';

            </Col>{" "} */}
              </Row>
              <Row className="pt-5">
                <Col xl={10} className="m-auto">
                  Une onde sonore qui arrive sur un diffuseur entre en contact avec des cellules de différentes
                  profondeurs, induisant des rebonds dans de multiples directions.
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </LazyLoad>
  );
};
