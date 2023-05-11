import { useInView } from "@react-spring/web";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useProductStore } from "../../hooks/store";
import { useFetchCategories } from "../../hooks/useFetchCategories";
import { useFetchProduct } from "../../hooks/useFetchProduct";
import { useFetchVariant } from "../../hooks/useFetchVariants";
import { ChildCategorie } from "./ChildCategorie";


export const ParentCategorie = ({ firstCat, attributes, setViewedCategory }) => {
  const [ref, inView] = useInView();
  const childCategories = useFetchCategories((cat) => cat.fk_parent == firstCat.id);
  const parentProduct = useFetchProduct(firstCat, 0);
  const variants = useFetchVariant(parentProduct);

  useEffect(() => {
    if (inView) {
      setViewedCategory(firstCat.id);
      useProductStore.setState({ tag: firstCat.id });
    }
  }, [inView]);

  return (
    <>
      <Col md={3} ref={ref} id={firstCat.id} className="shop_card d-flex flex-column justify-content-center align-items-center border_creme_light">
        <div className="bg_creme_light shop_categorie text-dark p-5">
          <Row className="shop_categorie_logo">
            {" "}
            <img src="/logo/logo.svg" alt="Image du logo Quadratik dans la boutique" className="d-flex mt-4 mx-auto" />
          </Row>
          <p className="ft05 mt-5 text-center">{firstCat.label}</p>
          <div className="ft4 mt-5 text-justify" dangerouslySetInnerHTML={{ __html: firstCat.description }}></div>
        </div>
      </Col>

      {childCategories.map((childCat) => {
        return <ChildCategorie childCat={childCat} attributes={attributes} variants={variants} />;
      })}

    </>
  );
};
