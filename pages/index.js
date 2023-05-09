import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { useEffect, useRef, useState } from "react";
import { Burger } from "../components/Burger";
import { S0_Landing } from "../components/home/S0_Landing";
import { S1_Product } from "../components/home/S1_Product";
import { S2_Canvas } from "../components/home/S2_Canvas";
import { S2_Customers } from "../components/home/S2_Customers";
import { S3_DIY } from "../components/home/S3_DIY";
import { S4_Business } from "../components/home/S4_Business";
import { S5_Contact } from "../components/home/S5_Contact";
import { VerticalSideIndex } from "../components/home/VerticalSideIndex";
import { useBearStore } from "../hooks/store";
import { Offcanvas } from "react-bootstrap";

const Home = () => {
  const parallax = useRef(null);
  const [showCanvas, setShowCanvas] = useState(false);

  useEffect(() => {
    const getScroll = (e) => {
      if (e.target.scrollTop > parallax.current.space * 3 && e.target.scrollTop < parallax.current.space * 5) {
        setShowCanvas(true);
      } else {
        setShowCanvas(false);
      }
      useBearStore.setState({ scroll: e.target.scrollTop });
    };
    const container = parallax.current.container.current;
    container.addEventListener("scroll", getScroll);

    return () => {
      container.removeEventListener("scroll", getScroll);
    };
  });

  useEffect(() => {
    useBearStore.setState({ width: parallax.current.container.current.offsetWidth });
    useBearStore.setState({ height: parallax.current.space });
  }, []);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  return (
    <>      <Offcanvas show={show} onHide={handleClose}>
    <Offcanvas.Header closeButton>
      <Offcanvas.Title>Offcanvas</Offcanvas.Title>
    </Offcanvas.Header>
    <Offcanvas.Body>Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.</Offcanvas.Body>
  </Offcanvas>
      <Burger></Burger> <VerticalSideIndex></VerticalSideIndex>
      <Parallax pages={8} ref={parallax}>
        <ParallaxLayer offset={0}>
          <div onClick={toggleShow}><S0_Landing /></div>
        </ParallaxLayer>
        <ParallaxLayer offset={1} sticky={{ start: 1, end: 2 }}>
          <S1_Product />
        </ParallaxLayer>
        <ParallaxLayer offset={3}>
          <S2_Customers />
        </ParallaxLayer>
        <ParallaxLayer offset={4}>{showCanvas ? <S2_Canvas /> : null}</ParallaxLayer>
        <ParallaxLayer offset={5}>
          <S3_DIY />
        </ParallaxLayer>
        <ParallaxLayer offset={6}>
          <S4_Business />
        </ParallaxLayer>
        <ParallaxLayer offset={7}>
          <S5_Contact />
        </ParallaxLayer>
      </Parallax>
    </>
  );
};

export default Home;
