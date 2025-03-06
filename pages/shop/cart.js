import React from "react";
import { Row } from "react-bootstrap";
import { LayoutHome } from "../../components/LayoutHome";

const Cart = () => {
  return (
    <>
      <LayoutHome shop home fixed dark /> <Row className="layout_space"><p className="p-5">En raison d'une liste d'attente trop importante, les commandes ne sont actuellement prises uniquement par téléphone.</p><p className="p-5"> Merci de votre compréhension</p></Row>
    </>
  );
};

export default Cart;
