import { useState } from "react";
import { Carousel, Row } from "react-bootstrap"
import ProductCanvas from "./ProductCanvas";
import { PerformanceCharts } from "./PerformanceCharts";
import { PerformanceSpatial } from "./ParformanceSpatial";

export const ProductView = ({product, display}) => {
  
    const [index, setIndex] = useState(0);
    return(
        <Row className="justify-content-center">
        <Carousel indicators={false} activeIndex={display} controls={false}>
          {product.image ? (
            <Carousel.Item>
              <Carousel indicators={false} activeIndex={index} controls={false}>
                <Carousel.Item>
                  <img className="d-block product_carousel_img m-auto" src={`data:image/png;base64,${product.image.facePicture}`} alt="Front preview of the model" />
                  <Carousel.Caption>
                    <h3>{product.nomenclature.simple}</h3>
                    <p>Plage de fréquences 1024 Hz - 3542 Hz</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img className="d-block product_carousel_img m-auto" src={`data:image/png;base64,${product.image.sidePicture}`} alt="Side Picture preview of the model" />
                  <Carousel.Caption>
                    <h3>Dimensions du modèle</h3>
                    <p>
                      {product.dimensions.W} cm x {product.dimensions.L * product.dimensions.W} cm x {product.dimensions.E} cm{" "}
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
                <img onClick={() => setIndex(0)} className={`d-block product_thumbnail m-2 ${index === 0 ? "border_creme" : ""}`} src={`data:image/png;base64,${product.image.facePicture}`} alt="Image miniature du modèle de face" />
                <img onClick={() => setIndex(1)} className={`d-block product_thumbnail m-2 ${index === 1 ? "border_creme" : ""}`} src={`data:image/png;base64,${product.image.sidePicture}`} alt="Image miniature du modèle de coté" />
                <div onClick={() => setIndex(2)} className={`d-block product_thumbnail m-2 ${index === 2 ? "border_creme" : ""}`}>
                  <i className="fal fa-cube fa-4x mt-4"></i>
                </div>
              </div>
            </Carousel.Item>
          ) : (
            "Aperçu non disponible"
          )}
          <Carousel.Item>
            <PerformanceCharts nomenclature={product.nomenclature} />
          </Carousel.Item>
          <Carousel.Item>
            <PerformanceSpatial nomenclature={product.nomenclature} />
          </Carousel.Item>
          <Carousel.Item className="product_canvas_container">
            <ProductCanvas product={product}></ProductCanvas>
          </Carousel.Item>
        </Carousel>
      </Row>
    )
}