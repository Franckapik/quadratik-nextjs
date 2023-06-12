import { animated, useInView } from "@react-spring/web";
import { Spin as Hamburger } from "hamburger-react";

export const Burger = ({onClick, toggled}) => {
  const [ref, springs] = useInView(
    () => ({
      from: {
        opacity: 0,
      },
      to: {
        opacity: 1,
      },
    }),
    {}
  );

  return (
    <>
      <animated.div ref={ref} style={springs} className="burger" onClick={onClick}>
        <Hamburger label="Quadratik_Menu" direction="right" toggled={toggled}  color="#FFFFFF" />
      </animated.div>
    </>
  );
};
