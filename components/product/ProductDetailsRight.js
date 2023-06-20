import { Button, Carousel, Col, Row } from "react-bootstrap";
import { PerformancesCard } from "../shared/PerformancesCard";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const ReactToPdf = dynamic(() => import("react-to-pdf"), { ssr: false });

export const ProductDetailsRight = ({ product, display, router }) => {
  console.log(router);
  return (
    <>
      <Col className="text_dark product_modele_desc d-flex flex-column ">
        <Row className="ft05">
          <span className="mb-4 p-0">{product.nomenclature.simple}</span>{" "}
        </Row>
        <Row className="d-inline">
          <Carousel activeIndex={display} controls={false} indicators={false} className="p-0">
            <Carousel.Item>
              <Row className="d-inline ">
                <span className="ps-0">REF : {product.nomenclature.structurel}</span>
                <p className="product_desc_modele mt-4 mb-5 p-0">{product.description.category_desc.replace("$PRODUCT", product.nomenclature.simple)}</p>
              </Row>
              <p className="product_desc_parent mt-5 mb-4 p-0"> {product.description.parent_description}</p>
              <Link href={{ pathname: "/product/datasheet/[product]", query: { childCat: router.query.childCat, vid: router.query.vid, dpid: router.query.dpid, product: product.nomenclature.simple } }}>
             <Button variant="secondary" className="mt-4 btn-outline-dark">Fiche technique</Button>
            </Link>
            </Carousel.Item>
            <Carousel.Item>
              <PerformancesCard product={product} />
            </Carousel.Item>
            <Carousel.Item>La géométrie du diffuseur ain que la distance entre le diffuseur et le point d'écoute influenceront la façon dont les sons sont répartis et rayonnés dans l'environnement.</Carousel.Item>
          </Carousel>
        </Row>
      </Col>
      <Row className="text_dark product_right_cart">
        <Col className="d-flex flex-column justify-content-center text-center align-items-center ft05">{product.prices.price + " €"}</Col>
        <Col className="d-flex justify-content-center text-center align-items-center">
          <Button variant="primary" type="submit" id="product_submit">
            - Ajouter au panier -
          </Button>
        </Col>
      </Row>
    </>
  );
};
