import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { Suspense, useEffect, useRef, useState } from "react";
import { LayoutHome } from "../components/LayoutHome";

import { VerticalSideIndex } from "../components/home/VerticalSideIndex";
import { useScroll } from "../hooks/useScroll";
import dynamic from "next/dynamic";
const S1_Product = dynamic(() => import("../components/home/S1_Product"), {
  suspense: true,
  ssr:false
});
const S0_Landing = dynamic(() => import("../components/home/S0_Landing"), {
  suspense: true,
  ssr:false

});
const S2_Canvas = dynamic(() => import("../components/home/S2_Canvas"), {
  suspense: true,
  ssr:false

});
const S2_Customers = dynamic(() => import("../components/home/S2_Customers"), {
  suspense: true,
  ssr:false

});
const S3_DIY = dynamic(() => import("../components/home/S3_DIY"), {
  suspense: true,
  ssr:false

});
const S4_Business = dynamic(() => import("../components/home/S4_Business"), {
  suspense: true,
  ssr:false

});
const S5_Contact = dynamic(() => import("../components/home/S5_Contact"), {
  suspense: true,
  ssr:false

});

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
          <Suspense fallback={<div>...</div>}>
            <S0_Landing />
          </Suspense>
        </ParallaxLayer>
        <ParallaxLayer offset={1} sticky={{ start: 1, end: 2 }}>
          <Suspense fallback={<div>...</div>}>
            <S1_Product />
          </Suspense>
        </ParallaxLayer>
        <ParallaxLayer offset={3}>
          <Suspense fallback={<div>...</div>}>
            <S2_Customers />
          </Suspense>
        </ParallaxLayer>
        <ParallaxLayer offset={4}>{showCanvas ? <S2_Canvas /> : null}</ParallaxLayer>
        <ParallaxLayer offset={5}>
          <Suspense fallback={<div>...</div>}>
            <S3_DIY />
          </Suspense>
        </ParallaxLayer>
        <ParallaxLayer offset={6}>
          <Suspense fallback={<div>...</div>}>
            <S4_Business />
          </Suspense>
        </ParallaxLayer>
        <ParallaxLayer offset={7}>
          <Suspense fallback={<div>...</div>}>
            <S5_Contact />
          </Suspense>
        </ParallaxLayer>
      </Parallax>
    </>
  );
};

export default Home;
