import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { documentByFilename, documentByProductId } from "../dolibarrApi/fetch";
import { useNomenclature } from "../../hooks/useNomenclature";
import Link from "next/link";

export const CardProduct = ({ product, childCat, attributes }) => {
  const nomenclature = useNomenclature(product.valuesSelected, childCat.fk_parent, attributes);
  const [productImg, setProductImg] = useState();
  const [error, setError] = useState(false);


  useEffect(() => {
    if (nomenclature) {
      documentByFilename("Modeles/" + nomenclature.simple + ".png")
        .get()
        .then((response) => {
          console.log(response.data);
          setProductImg(response.data.content);
        })
        .catch((error) => {
          setError(true);
          console.log(error);
        });
    }
  }, [nomenclature]);

  return (
    <>
      <Col className="shop_card m-2 d-flex flex-column justify-content-center align-items-center border_creme_light text_dark">
        <Link href={{ pathname: "/shop/product", query: product.valuesSelected }}>
          <img src={`data:image/png;base64,${productImg}`} />
          <span className="shop_product_title ft2 ">{nomenclature.simple}</span>
          <span className="shop_product_collection ft6 text-uppercase text-nowrap ">{childCat.label}</span>
          <span className="shop_product_price ft4 text-uppercase text-nowrap ">{Math.round(product.price)} €</span>
        </Link>{" "}
      </Col>
    </>
  );
};
