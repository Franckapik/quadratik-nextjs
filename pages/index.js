import { Container } from "react-bootstrap";
import { useSpring, animated, useScroll } from "@react-spring/web";

const Main = () => {
  const { scrollYProgress } = useScroll();

  const [springs, api] = useSpring(() => ({
    from : {transform : 'rotate(0deg)'},
    to : {transform : 'rotate(45deg)'}
  }));

  const handleClick = () => {
    api.start({
      from: {
        opacity: 0,
      },
      to: {
        opacity: 100,
      },
    });
  };

  return (
    <Container style={{ height: "600vh" }} fluid>
      <animated.div
        style={{
          position: "fixed",
          opacity: 1,
          height: scrollYProgress.to((val) => val * 100 + "vh"),
          background: "#ff6d6d",
          borderRadius: 8,
        }}
      >
        {" "}
        Coucou
      </animated.div>
      <div style={{ background: "red", height: "100vh" }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
          <animated.div style={{ width: "33vw", height: "33vw", background: "blue", position:"sticky", top :"20px",...springs }}></animated.div>
        </div>
      </div>
      <div style={{ background: "blue", height: "100vh" }}></div>
      <div style={{ background: "green", height: "100vh" }}></div>
      <div style={{ background: "pink", height: "100vh" }}></div>
      <div style={{ background: "yellow", height: "100vh" }}></div>
      <div style={{ background: "purple", height: "100vh" }}></div>
    </Container>
  );
};

export default Main;
