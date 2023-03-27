import { useEffect, useRef, useState } from "react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { Burger } from "../components/Burger";
import { S5_Contact } from "../components/home/S5_Contact";
import { S4_Business } from "../components/home/S4_Business";
import { S3_DIY } from "../components/home/S3_DIY";
import { S2_RealPreview } from "../components/home/S2_RealPreview";
import { S2_ProStudio } from "../components/home/S2_ProStudio";
import { S2_HomeStudio } from "../components/home/S2_HomeStudio";
import { S2_Customers } from "../components/home/S2_Customers";
import { S1_Abs } from "../components/home/S1_Abs";
import { S1_Dif } from "../components/home/S1_Dif";
import { S1_Square } from "../components/home/S1_Square";
import { S1_Product } from "../components/home/S1_Product";
import { S0_Landing } from "../components/home/S0_Landing";
import { IndexPage } from "../components/home/IndexPage";

const Home = () => {
  const [scroll, setScroll] = useState(0);
  const [vh, setVh] = useState(0);
  const parallax = useRef(null);

  useEffect(() => {
    const getScroll = (e) => {
      setScroll(e.target.scrollTop);
    };
    setVh(parallax.current.space - 20);
    const container = parallax.current.container.current;
    container.addEventListener("scroll", getScroll);

    return () => {
      container.removeEventListener("scroll", getScroll);
    };
  }, []);

  return (
    <div>
      {scroll > vh ? <Burger></Burger> : null}
      {scroll > vh ? <IndexPage scroll={scroll}></IndexPage> : null}
      <Parallax pages={8} ref={parallax}>
        <ParallaxLayer offset={0} speed={0}>
          <S0_Landing />
        </ParallaxLayer>
        <ParallaxLayer offset={1} speed={0} sticky={{ start: 1, end: 2 }}>
          <S1_Product vh={vh} scroll={scroll}  />
        </ParallaxLayer>
        <ParallaxLayer offset={1} speed={2.8} sticky={{ start: 1, end: 2 }}>
          <S1_Square />
        </ParallaxLayer>
{/*         <ParallaxLayer offset={2} speed={0.5}>
          <S1_Abs />
        </ParallaxLayer> */}
{/*         <ParallaxLayer offset={3} speed={0} sticky={{ start: 3, end: 4.7 }}>
          <S2_Customers />
        </ParallaxLayer> */}
        <ParallaxLayer offset={3} speed={0} sticky={{ start: 3, end: 4 }}>
          <S2_HomeStudio scroll={scroll} />
        </ParallaxLayer>
{/*         <ParallaxLayer offset={4} speed={0}>
          <S2_ProStudio />
        </ParallaxLayer> */}
{/*         <ParallaxLayer offset={4.8} speed={0}>
          <S2_RealPreview />
        </ParallaxLayer> */}
        <ParallaxLayer offset={5} speed={0} /* sticky={{ start: 5.8, end: 6.4 }} */>
          <S3_DIY />
        </ParallaxLayer>
        <ParallaxLayer offset={6} speed={0}>
          <S4_Business />
        </ParallaxLayer>
        <ParallaxLayer offset={7} speed={0}>
          <S5_Contact />
        </ParallaxLayer>
      </Parallax>
    </div>
  );
};

export default Home;
