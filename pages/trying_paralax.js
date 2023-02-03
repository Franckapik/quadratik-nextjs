import { Container } from "react-bootstrap";
import { useSpring, animated, useScroll } from "@react-spring/web";
import { Parallax, ParallaxLayer, IParallax } from '@react-spring/parallax'


const Main = () => {
    const alignCenter = { display: 'flex', alignItems: 'center' }
    return (
      <div>
        <div/>
  
        <Parallax pages={5}>
          <ParallaxLayer offset={0} speed={0.5} style={{ ...alignCenter, justifyContent: 'center' }}>
            <p >Scroll down</p>
          </ParallaxLayer>
  
          <ParallaxLayer sticky={{ start: 1, end: 3 }} style={{ ...alignCenter, justifyContent: 'flex-start' }}>
            <div >
              <p>I'm a sticky layer</p>
            </div>
          </ParallaxLayer>
  
          <ParallaxLayer offset={1.5} speed={1.5} style={{ ...alignCenter, justifyContent: 'flex-end' }}>
            <div >
              <p>I'm not</p>
            </div>
          </ParallaxLayer>
  
          <ParallaxLayer offset={2.5} speed={1.5} style={{ ...alignCenter, justifyContent: 'flex-end' }}>
            <div >
              <p>Neither am I</p>
            </div>
          </ParallaxLayer>
        </Parallax>
      </div>
    )
  
};

export default Main;
