import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useSpring, animated, config, easings } from "@react-spring/web";


const useAnimatedPath = ({ toggle, delay, onRest, duration }) => {
  const [length, setLength] = useState(null);
  const animatedStyle = useSpring({
    strokeDashoffset: toggle ? 0 : length,
    strokeDasharray: length,
    delay,
    onRest: onRest,
    config: {
      easing: easings.easeInOutCubic,
      duration: duration,
      ...config.slow,
    },
  });

  return {
    style: animatedStyle,
    ref: (ref) => {
      if (ref) {
        setLength(ref.getTotalLength());
      }
    },
  };
};

const AnimatedLogo = ({ toggle }) => {
  const animatedProps = useAnimatedPath({ toggle, delay: 0, duration: 1000 });

  return (
    <>
      <animated.rect width="27.1" height="27.078" ry="0" x="65.876" y="65.858" {...animatedProps} />
      <animated.rect width="27.1" height="27.078" ry="0" x="65.876" y="65.858" {...animatedProps} />
      <animated.rect width="27.1" height="27.078" x="107.02" y="65.858" ry="0" {...animatedProps} />
      <animated.rect width="27.1" height="27.078" x="107.024" y="107.064" ry="0" {...animatedProps} />
      <animated.rect width="27.1" height="27.078" x="65.88" y="107.064" ry="0" {...animatedProps} />
    </>
  );
};
const AnimatedLogo2 = ({ toggle, setLoading }) => {
  const animatedProps = useAnimatedPath({ toggle, delay: 800, onRest: () => setLoading(true), duration: 1000 });

  return (
    <>
      <animated.rect
        width="27.1"
        height="27.078"
        x="-34.124"
        y="107.28"
        ry="0"
        transform="rotate(-45)"
        {...animatedProps} />
      <animated.rect
        width="27.1"
        height="27.078"
        x="7.021"
        y="107.28"
        ry="0"
        transform="rotate(-45)"
        {...animatedProps} />
      <animated.rect
        width="27.1"
        height="27.078"
        x="7.024"
        y="148.485"
        ry="0"
        transform="rotate(-45)"
        {...animatedProps} />
      <animated.rect
        width="27.1"
        height="27.078"
        x="-34.12"
        y="148.485"
        ry="0"
        transform="rotate(-45)"
        {...animatedProps} />{" "}
    </>
  );
};

const AnimatedSquare = ({ toggle }) => {
  const animatedProps = useAnimatedPath({ toggle, delay: 0, duration: 3000 });

  return <animated.rect x="0" y="0" fill="none" width="100%" height="100%" {...animatedProps} />;
};

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
    <Row id="s0_landing" className="justify-content-between m-0">
      {loaded ? (
        <Row className="header d-none d-md-flex justify-content-end text-uppercase m-0 p-0">
          <Col md={1}>Boutique</Col>
          <Col md={1}>Contact</Col>
          <Col md={1} className="d-none d-md-flex"></Col>
        </Row>
      ) : null}
      <Col xs={1} className="d-none d-md-block m-0 p-0 ">
        {" "}
        {loaded ? <animated.div style={goRight} className="border_creme cadre_home_gauche"></animated.div> : null}
      </Col>
      <Col xs={10} sm={8} md={5} className="d-flex flex-wrap justify-content-center align-items-center">
        <Row className="logo_cadre ">
          <svg xmlns="http://www.w3.org/2000/svg" stroke="#D0C3B4" stroke-width="2">
            <AnimatedSquare toggle={loaded} />
          </svg>
        </Row>
        <Col className="logo_row d-flex flex-column justify-content-center align-items-center text-center">
          <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
            <g transform="" fill="none" stroke="#D0C3B4" stroke-width="1" stroke-linecap="square">
              <AnimatedLogo toggle={toggle} />
              <AnimatedLogo2 toggle={toggle} setLoading={setLoading} />
            </g>
          </svg>
          <p className="text-nowrap text-uppercase brand_name m-0">Quadratik</p>
          <p className="text-nowrap m-0 brand_subtitle ">ACOUSTIQUE & ARTISANAT</p>
        </Col>
      </Col>
      <Col xs={1} className="d-none d-md-block p-0">
        {loaded ? <animated.div style={goLeft} className="border_creme cadre_home_droit "></animated.div> : null}
      </Col>
    </Row>
  );
};
