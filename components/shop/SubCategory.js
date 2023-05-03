import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { objectsInCategory } from "../dolibarrApi/fetch";
import { CardProduct } from "./CardProduct";

export const SubCategory = ({ subcategory, variants, attributes }) => {
  const [listProducts, setListProducts] = useState(false);

  //get attributes from variants and make valueSelected object
  useEffect(() => {
    if (variants.length) {
      objectsInCategory(subcategory.id)
        .get()
        .then((response) => {
          if (response.data.length) {
            const pwithAttributes = Object.values(response.data).map((a, i) => {
              const g = Object.values(variants).filter((val) => val.fk_product_child === a.id)[0];
              const valuesSelected = g.attributes.reduce((acc, cur) => {
                let a_ref = Object.values(attributes).filter((val) => val.a_id === cur.id)[0].a_ref;
                return { ...acc, [a_ref]: cur.fk_prod_attr_val };
              }, {});
              return { ...a, ...g, valuesSelected: { ...valuesSelected } };
            });
            setListProducts(pwithAttributes);
          }
        })
        .catch((error) => {
          console.log(error);
          /*  setError(error); */ //waiting for work on absorbeurs
        });
    }
  }, [subcategory, variants]);

  return (
    <Row className="pb-5 bg_darker shop_subcategory ">
      <Row className="ft05 justify-content-start mb-4 ps-4 pt-4 pb-4  ft2">{subcategory.label.split("-")[1]}</Row>
      <Row className="justify-content-center">{subcategory.description}</Row>
      <Row className="">
        {listProducts.length
          ? listProducts.map((a, i) => {
            return <CardProduct product={a} subcategory={subcategory} attributes={attributes}></CardProduct>;
          })
          : null}
      </Row>
    </Row>
  );
};
