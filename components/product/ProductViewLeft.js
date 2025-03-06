import { useState } from "react";
import { Carousel, Col, Row } from "react-bootstrap";
import ProductCanvas from "./ProductCanvas";
import { PerformanceCharts } from "./PerformanceCharts";
import { PerformanceSpatial } from "./PerformanceSpatial";
import { usePicture } from "../../hooks/usePicture";
import { Loader } from "../Loader";
import Image from "next/image";

export const ProductViewLeft = ({ product, display, setDisplay }) => {
  const { facePicture: facePicture, sidePicture: sidePicture, isSuccess: pictureSucceed, isError: pictureError } = usePicture(product.nomenclature.simple, false); //true for miniature
  const [index, setIndex] = useState(0);
  const circular = (i) => ((i % 3) + 3) % 3;
  const view = ["Modele", "Performances", "Spacialisation"];

  return (
    <Col >
      <Col className="p-0 d-flex d-md-none text-creme justify-content-center align-items-center">
        <Row className="w-100 justify-content-center text-center" onClick={() => setDisplay(circular(display - 1))}>
          <i className="fad fa-chevron-up d-none d-md-inline"></i>
          <i className="fad fa-chevron-left d-md-none"></i>
        </Row>
        <Row className="s2_customer_title_container d-flex justify-content-center align-items-center ft05 text-center ">{view[circular(display)]}</Row>
        <Row className="w-100 justify-content-center align-items-center text-center" onClick={() => setDisplay(circular(display + 1))}>
          <i className="fad fa-chevron-down d-none d-md-inline"></i>
          <i className="fad fa-chevron-right d-md-none"></i>
        </Row>
      </Col>
      <Carousel indicators={false} activeIndex={display} controls={false}>
        {pictureSucceed ? (
          <Carousel.Item>
            <Carousel indicators={false} activeIndex={index} controls={false}>
              <Carousel.Item>
                <Image style={{objectFit: "contain"}}  width={720} height={1080} className="d-block product_carousel_img m-auto" src={`data:image/png;base64,${facePicture}`} alt="Aperçu de face d'un modèle Quadratik" />
                <Carousel.Caption>
                  <h3>{product.nomenclature.simple}</h3>
                 {  product.dimensions.fmin &&  <p>{product.dimensions.fmin} Hz - {product.dimensions.fmax} Hz</p>}
                 { product && product.frequencies?.fmin && <p>Absorption totale à {product.frequencies.fmax} Hz</p>}
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <Image style={{objectFit: "contain"}} width={720} height={1080}  className="d-block product_carousel_img m-auto" src={`data:image/png;base64,${sidePicture}`} alt="Aperçu de coté d'un modèle Quadratik" />
                <Carousel.Caption>
                  <h3>Dimensions du modèle</h3>
                  <p>
                    {product.dimensions.W} cm x {product.dimensions.L * product.dimensions.W} cm x {product.dimensions.P} cm
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item className="product_canvas_container">
                <ProductCanvas product={product}></ProductCanvas>
                <Carousel.Caption>
                  <h3>Vue 3D</h3>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
            <div className="carousel-indicators">
              <Image style={{objectFit: "contain"}} width={90} height={135} onClick={() => setIndex(0)} className={`d-block product_thumbnail m-2 `} src={`data:image/png;base64,${facePicture}`} alt="Image miniature du modèle de face" />
              <Image style={{objectFit: "contain"}} width={90} height={135} onClick={() => setIndex(1)} className={`d-block product_thumbnail m-2 `} src={`data:image/png;base64,${sidePicture}`} alt="Image miniature du modèle de coté" />
              <div onClick={() => setIndex(2)} className={`d-block product_thumbnail m-2 `}>
                <i className="fal fa-cube fa-3x mt-4"></i> 3D
              </div>
            </div>
          </Carousel.Item>
        ) : null}

        <Carousel.Item>
          <div className="m-4">  <PerformanceCharts product={product} /></div>
        
        </Carousel.Item>
        <Carousel.Item>
       {product.dimensions.F === undefined &&  <div className="m-4"><PerformanceSpatial nom={product.nomenclature.performance} /></div>}
        </Carousel.Item>
      </Carousel>
<Loader text={!pictureError ? <><i className="fas fa-spinner fa-spin"></i> Chargement du modèle</>  : "Modèle non disponible"} open={!pictureSucceed} />

    </Col>
  );
};
