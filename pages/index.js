import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { useEffect, useRef, useState } from "react";
import { Burger } from "../components/Burger";
import { IndexPage } from "../components/home/IndexPage";
import { S0_Landing } from "../components/home/S0_Landing";
import { S1_Product } from "../components/home/S1_Product";
import { S2_Customers } from "../components/home/S2_Customers";
import { S3_DIY } from "../components/home/S3_DIY";
import { S4_Business } from "../components/home/S4_Business";
import { S5_Contact } from "../components/home/S5_Contact";
import { S2_Canvas } from '../components/home/S2_Canvas';

const Home = () => {
  const [scroll, setScroll] = useState(0);
  const [mobile, setMobile] = useState(true);
  const [vh, setVh] = useState(0);
  const [vw, setVw] = useState(0);
  const parallax = useRef(null);

  useEffect(() => {
    const getScroll = (e) => {
      setScroll(e.target.scrollTop);
    };
    const container = parallax.current.container.current;
    container.addEventListener("scroll", getScroll);

    return () => {
      container.removeEventListener("scroll", getScroll);
    };
  }, []);
  
  useEffect(() => {
    setVh(parallax.current.space);
    setVw(parallax.current.container.current.offsetWidth);
  }, []);

  return (
    <div>
      {scroll > vh ? <Burger></Burger> : null}
      {scroll > vh ? <IndexPage scroll={scroll} vh={vh}></IndexPage> : null}
      <Parallax pages={vw < 400 ? 8 : 13} ref={parallax}>
        <ParallaxLayer offset={0} speed={0}>
          <S0_Landing />
        </ParallaxLayer>
        <ParallaxLayer offset={1} speed={0} sticky={{ start: 1, end: 2 }}>
          <S1_Product vh={vh} scroll={scroll} />
        </ParallaxLayer>
        <ParallaxLayer offset={3} speed={0}>
        <S2_Customers vh={vh} scroll={scroll} />
        </ParallaxLayer>
        <ParallaxLayer offset={4} speed={0} sticky={{ start: 4, end: 6 }}>
        <S2_Canvas vh={vh} scroll={scroll} />
        </ParallaxLayer>
        <ParallaxLayer offset={7} speed={0}>
          <S3_DIY />
        </ParallaxLayer>
        <ParallaxLayer offset={8} speed={0}>
          <S4_Business />
        </ParallaxLayer>
        <ParallaxLayer offset={11} speed={0}>
          <S5_Contact />
        </ParallaxLayer>
      </Parallax>
    </div>
  );
};

export default Home;
