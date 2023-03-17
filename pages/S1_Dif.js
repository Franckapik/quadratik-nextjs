import { Row } from "react-bootstrap";

export const S1_Dif = () => {
  const bg_s1 = "./diffuseur4.png";

  return (
    <Row
      id="s1_product_dif"
      className="justify-content-end m-0 "
      style={{
        backgroundImage: `url(${bg_s1})`,
        backgroundPosition: "goRight",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
      }}
    ></Row>
  );
};
