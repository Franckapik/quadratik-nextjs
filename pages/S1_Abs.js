import { Row } from "react-bootstrap";

export const S1_Abs = () => {
  const bg_s2 = "./absorbeur.png";
  return (
    <Row
      id="s1_product_abs"
      className="justify-content-end m-0 "
      style={{
        backgroundImage: `url(${bg_s2})`,
        backgroundPosition: "goRight",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
      }}
    ></Row>
  );
};
