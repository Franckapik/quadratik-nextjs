import { useSpring, animated } from "@react-spring/web";
import { useBearStore } from "../../hooks/store";

export const VerticalSideIndex = () => {

  const scroll = useBearStore((state) => state.scroll)
  const height = useBearStore((state) => state.height)

  const [props, api] = useSpring(
    () => ({
      from: { opacity: 0 },
      to: { opacity: 1 },
      config :  {
        duration : 2000
      }
    }),
    []
  )

  const switchPage = (value) => {
    if (value >= 6.5*height) {
      return (
        <div className="s0_page_index">
          006<div className="trait"></div>Entrer en contact
        </div>
      );
    } else if (value >= 5.5*height) {
      return (
        <div className="s0_page_index">
          005<div className="trait"></div>Construire sur des valeurs
        </div>
      );
    } else if (value >= 4.5*height) {
      return (
        <div className="s0_page_index">
          004<div className="trait"></div>Le sur-mesure
        </div>
      );
    } else if (value >= 3.5*height) {
      return (
        <div className="s0_page_index">
          003<div className="trait"></div>Favoriser la diversité
        </div>
      );
    } else if (value >= 2.5*height) {
      return (
        <div className="s0_page_index">
          002<div className="trait"></div>Etre professionnel
        </div>
      );
    } else if (value >= height) {
      return (
        <div className="s0_page_index">
          001<div className="trait"></div>Les solutions acoustiques
        </div>
      );
    }
  };

  return (
    <animated.div style={props} className="d-none d-md-flex">
      {switchPage(scroll)}
    </animated.div>
  );
};
