import { useSpring, animated } from "@react-spring/web";

export const IndexPage = ({ scroll }) => {

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
    if (value >= 7000) {
      return (
        <div className="page_index">
          005<div className="trait"></div>Entrer en contact
        </div>
      );
    } else if (value >= 6000) {
      return (
        <div className="page_index">
          004<div className="trait"></div>Construire sur des valeurs
        </div>
      );
    } else if (value >= 5200) {
      return (
        <div className="page_index">
          003<div className="trait"></div>Favoriser la diversité
        </div>
      );
    } else if (value >= 2500) {
      return (
        <div className="page_index">
          002<div className="trait"></div>Etre professionnel
        </div>
      );
    } else if (value >= 500) {
      return (
        <div className="page_index">
          001<div className="trait"></div>Les solutions acoustiques
        </div>
      );
    }
  };

  return (
    <animated.div style={props}>
      {switchPage(scroll)}
      {/* {scroll} */}
    </animated.div>
  );
};
