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
import { LayoutHome } from "../components/LayoutHome";
import { useScroll } from "../hooks/useScroll";

const Home = () => {
  const parallax = useRef(null);
  const [showCanvas, setShowCanvas] = useState(false);
  const [scroll, height, width] = useScroll(parallax);
  useEffect(() => {
    if (scroll > height * 3 && scroll < height * 5) {
      setShowCanvas(true);
    } else {
      setShowCanvas(false);
    }
  }, [height, scroll]);

  return (
    <>
      <LayoutHome header contact={height > 800 ? scroll < height * 2 : true} shop={height > 748 ? scroll < height * 2 : true} />
      <VerticalSideIndex></VerticalSideIndex>
      <Parallax pages={8} ref={parallax}>
        <ParallaxLayer offset={0}>
          <S0_Landing />
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
