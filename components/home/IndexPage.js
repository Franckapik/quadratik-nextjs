import { useSpring, animated } from "@react-spring/web";

export const IndexPage = ({ scroll, vh }) => {

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
    if (value >= 8.5*vh) {
      return (
        <div className="page_index">
          005<div className="trait"></div>Entrer en contact
        </div>
      );
    } else if (value >= 7.5*vh) {
      return (
        <div className="page_index">
          004<div className="trait"></div>Construire sur des valeurs
        </div>
      );
    } else if (value >= 6.5*vh) {
      return (
        <div className="page_index">
          003<div className="trait"></div>Favoriser la diversité
        </div>
      );
    } else if (value >= 2.5*vh) {
      return (
        <div className="page_index">
          002<div className="trait"></div>Etre professionnel
        </div>
      );
    } else if (value >= vh) {
      return (
        <div className="page_index">
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
