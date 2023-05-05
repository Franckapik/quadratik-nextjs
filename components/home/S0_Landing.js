import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { useSpring, animated } from "@react-spring/web";
import { AnimatedLogo } from "./landing_logo/AnimatedLogo";
import { AnimatedLogo2 } from "./landing_logo/AnimatedLogo2";
import { AnimatedSquare } from "./landing_logo/AnimatedSquare";
import { Layout } from "../Layout";

export const S0_Landing = () => {
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    setToggle(true);
  }, []);

  const [loaded, setLoading] = useState(false);

  const [goRight, apiGoRight] = useSpring(() => ({
    from: { x: 0 },
  }));
  const [goLeft, apiGoLeft] = useSpring(() => ({
    from: { x: 0 },
  }));

  useEffect(() => {
    if (loaded) {
      apiGoRight.start({
        from: { x: 0 },
        to: { x: 200 },
      });

      apiGoLeft.start({
        from: { x: 0 },
        to: { x: -200 },
      });
    }
  }, [loaded]);

  return (
    <Layout header={loaded}>
      <Row id="s0_landing" className="section">
        <div className="d-none d-md-block m-0 p-0 ">{loaded ? <animated.div style={goRight} className="border_creme s0_cadre_home_gauche"></animated.div> : null}</div>
        <div className="d-flex flex-wrap justify-content-center align-items-center">
          <div className="s0_animated_square text-center">
            <svg xmlns="http://www.w3.org/2000/svg" stroke="#D0C3B4" strokeWidth="1" className="s0_svg_square">
              <AnimatedSquare toggle={loaded} />
            </svg>
            <div className="s0_logo bg-red">
              <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
                <g transform="" fill="none" stroke="#D0C3B4" strokeWidth="1" strokeLinecap="square">
                  <AnimatedLogo toggle={toggle} />
                  <AnimatedLogo2 toggle={toggle} setLoading={setLoading} />
                </g>
              </svg>
            </div>
            <div className="s0_brand_name">
              <div className="text-nowrap text-uppercase s0_quadratik_text w-100 ft0">Quadratik</div>
              <div className="text-nowrap text-uppercase s0_brand_subtitle w-100 ft4">Acoustique & Artisanat</div>
            </div>
          </div>
        </div>
        <div className="d-none d-md-block p-0">{loaded ? <animated.div style={goLeft} className="border_creme s0_cadre_home_droit "></animated.div> : null}</div>
      </Row>
    </Layout>
  );
};
