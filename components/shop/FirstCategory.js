import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { objectsInCategory, variantFetchByParentId } from "../../components/dolibarrApi/fetch";
import { useInView } from "@react-spring/web";
import { SubCategory } from "./SubCategory";

export const FirstCategory = ({ categories, firstCat, attributes, setViewedCategory }) => {
  const [defaultProduct, setDefaultProduct] = useState(false);
  const [variants, setVariants] = useState(false);
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      setViewedCategory(firstCat.id);
    }
  }, [inView]);

  useEffect(() => {
    objectsInCategory(firstCat.id)
      .get()
      .then((response) => {
        setDefaultProduct(response.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [firstCat]);

  useEffect(() => {
    if (defaultProduct) {
      variantFetchByParentId(defaultProduct.id)
        .get()
        .then((response) => {
          setVariants(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [defaultProduct]);

  return (
    <Row ref={ref} id={firstCat.id}>
      {firstCat.label + firstCat.id}

      {categories
        .filter((cat) => cat.fk_parent == firstCat.id)
        .map((SubCat, i) => {
          return (
            <>
              <SubCategory subcategory={SubCat} variants={variants} attributes={attributes} />
            </>
          );
        })}
    </Row>
  );
};
