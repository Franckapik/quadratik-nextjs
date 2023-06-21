import dynamic from "next/dynamic";
import Link from "next/link";
import { Button, Carousel, Col, Row } from "react-bootstrap";
import { PerformancesCard } from "../shared/PerformancesCard";

const ReactToPdf = dynamic(() => import("react-to-pdf"), { ssr: false });

export const ProductDetailsRight = ({ product, display, router }) => {
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
              <Row>
                <Col>
    
                  <Link href={{ pathname: "/product/datasheet/[product]", query: { childCat: router.query.childCat, vid: router.query.vid, dpid: router.query.dpid, product: product.nomenclature.simple } }}>
                    <Button variant="secondary" className="mt-4 btn-outline-dark">
                    <i className="fad fa-file-chart-line fa-2x"></i> <span className="text-nowrap">Fiche technique</span>
                    </Button>
                  </Link>
                </Col>
                <Col>
                  <Button variant="secondary" className="mt-4 btn-outline-dark" href="http://shop.quadratik.fr/document.php?hashp=PZXa9Q88VJc2I56quyG62bzm8twPx0LI">
                  <i class="fad fa-leaf-heart fa-2x"></i> Ecoresponsabilité
                  </Button>
                </Col>
              </Row>
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
            <span className="d-none d-md-inline">
              {" "}
              - Ajouter <i className="fad fa-cart-arrow-down"></i> -
            </span>
            <span className="d-inline d-md-none">
              {" "}
              <i className="fad fa-cart-arrow-down fa-2x"></i>{" "}
            </span>
          </Button>
        </Col>
      </Row>
    </>
  );
};
