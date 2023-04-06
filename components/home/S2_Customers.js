import { Button, Col, Row } from "react-bootstrap";


export const S2_Customers = ({ scroll, vh, mobile }) => {


  return (
    <Row id="s2_customers " className="section p-0 m-0 justify-content-md-start justify-content-md-start">
      <Col md={1} className="text-end p-0 d-none d-md-flex ">

      </Col>
      

      <Col md={10} className="d-flex flex-column-reverse flex-md-column mt-2 justify-content-evenly s2_customers_photo">
        <Row className=" align-items-between justify-content-center ">
          <Col md={4} className="d-none d-md-flex text-center justify-content-start p-0">
            <img src="/customers/customer1.png" alt="Image du studio Disco casino" />
          </Col>
          <Col className=" d-flex flex-column justify-content-evenly align-items-center ">
            <Row className="text-center">
              <span className="ft05 text-uppercase p-2">Professionnel</span>
              <span className="ft2 p-2">quelles que soient les dimensions de votre espace</span>
            </Row>
            <Row className="d-none d-md-flex">
              <Button variant="primary" className="m-2">
                <i className="fad fa-projector"></i>Découvrir les réalisations
              </Button>
            </Row>
          </Col>
          <Col  md={4} className="text-center justify-content-end d-none d-md-flex p-0">
            <img src="/customers/customer2.png" alt="Image du studio Disco casino" />
          </Col>
        </Row>
        <Row className="d-flex justify-content-start hor_flex flex-nowrap ">
          <Col className="text-start d-md-none  ">
            <img src="/customers/customer1.png" alt="Image du studio Disco casino" />
          </Col>
          <Col className="text-start d-md-none  ">
            <img src="/customers/customer2.png" alt="Image du studio Disco casino" />
          </Col>
          <Col className="text-start d-none d-md-flex ">
            <img src="/customers/customer3.png" alt="Image du studio Disco casino" />
          </Col>
          <Col className="">
            <img src="/customers/customer4.png" alt="Image du studio Disco casino" />
          </Col>
          <Col className="  ">
            <img src="/customers/customer5.png" alt="Image du studio Disco casino" />
          </Col>
          <Col className="  ">
            <img src="/customers/customer6.png" alt="Image du studio Disco casino" />
          </Col>
          <Col className="justify-content-end  d-none d-md-flex ">
            <img src="/customers/customer7.png" alt="Image du studio Disco casino" />
          </Col>
          <Col className="text-start d-md-none d-flex flex-column justify-content-center align-items-center s2_col_plus border_creme ">
         <i className="fad fa-plus-square"></i>
        <p className="ft1 mt-3 ">Découvrir les réalisations</p>
          </Col>
        </Row>     
      </Col>
    </Row>
  );
};
