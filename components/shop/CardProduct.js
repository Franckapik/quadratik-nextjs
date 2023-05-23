import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { documentByFilename, documentByProductId } from "../dolibarrApi/fetch";
import { useNomenclature } from "../../hooks/useNomenclature";
import Link from "next/link";

export const CardProduct = ({ variant, childCat, attributes }) => {
  const nomenclature = useNomenclature(variant.valuesSelected, childCat.fk_parent, attributes);
  const [productImg, setProductImg] = useState();
  const [error, setError] = useState(false);


  useEffect(() => {
    if (nomenclature) {
      documentByFilename("Modeles/Miniature/" + nomenclature.simple + ".png")
        .get()
        .then((response) => {
          setProductImg(response.data.content);
        })
        .catch((error) => {
          setError(true);
        });
    }
  }, [nomenclature]);

  return (
    <>
      <Col md={3} className="shop_card d-flex flex-column justify-content-center align-items-center border_creme_light text_dark">
        <Link href={{ pathname: "/shop/product", query: variant.valuesSelected }}>
          <img src={`data:image/png;base64,${productImg}`} />
          <span className="shop_product_title ft2 ">{nomenclature.simple}</span>
          <span className="shop_product_collection ft6 text-uppercase text-nowrap ">{childCat.label}</span>
          <span className="shop_product_price ft4 text-uppercase text-nowrap ">{Math.round(variant.price)} €</span>
        </Link>{" "}
      </Col>
    </>
  );
};
