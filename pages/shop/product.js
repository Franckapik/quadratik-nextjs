import {
  CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title,
  Tooltip
} from 'chart.js';
import { queryTypes, useQueryState } from "next-usequerystate";
import React, { useState } from "react";
import {
  Button, Col, Row
} from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Line } from 'react-chartjs-2';
import Select_Options from "../../components/product/SelectOptions";
import Layout from "../../layouts/Layout";
import dataCsv from '../../public/performances/CSV/D2N7P15W50.csv';
import Shop3D from '../../components/Shop3D'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

console.log(dataCsv);
  


const labels = dataCsv.map((a,i) => (a["Frequency [Hz]"]));
const difCoef = dataCsv.map((a,i) => (parseFloat(a["Diffusion Coefficient"].replace(/,/g, '.'))));
const scatCoef = dataCsv.map((a,i) => (parseFloat(a["Scattering Coefficient"].replace(/,/g, '.'))));

const data = {
  labels: labels,
  datasets: [{
    label: 'Diffusion',
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: difCoef,
  },
 {
    label: 'Scattering',
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'blue',
    data: scatCoef,
  },


]
};


const Product = ({ p_selected }) => {
  const [width, setWidth] = useQueryState(
    "width",
    queryTypes.integer.withDefault(50)
  );
  const [length, setLength] = useQueryState(
    "length",
    queryTypes.integer.withDefault(50)
  );
  const [depth, setDepth] = useQueryState(
    "depth",
    queryTypes.integer.withDefault(10)
  );
  const [prime, setPrime] = useQueryState(
    "prime",
    queryTypes.integer.withDefault(7)
  );
  const [ratio, setRatio] = useQueryState(
    "ratio",
    queryTypes.boolean.withDefault(false)
  );
  const [invert, setInvert] = useQueryState(
    "invert",
    queryTypes.integer.withDefault(false)
  );
  const [vert, setVert] = useQueryState(
    "vert",
    queryTypes.integer.withDefault(-3)
  );
  const [hor, setHor] = useQueryState(
    "hor",
    queryTypes.integer.withDefault(-3)
  );
  const [amax, setAmax] = useState(4);
  const [cwidth, setCwidth] = useState(31);
  const [thickness, setThickness] = useState(3);

  const fmin = Math.round((((344 / 2 / depth / 10) * amax) / prime) * 1000);
  const fmax = Math.round(344 / 2 / (cwidth / 100));

  /*   useEffect(() => {
    setWidth(p_selected.width);
    setLength(p_selected.length);
    setDepth(p_selected.depth);
    setPrime(p_selected.prime_nb);
    setThickness(p_selected.thickness);
  }, [p_selected]); */

  return (
    <>
    <Layout>
      <Row>
        <Col sm={4} className="attributes_col">
          <Select_Options></Select_Options>
          Prix
          <div className="d-grid gap-2 m-3 mt-5">
          <Button variant="outline-primary m-2" size="lg">Ajouter au panier</Button>{' '}
          <Button variant="outline-secondary m-2" size="lg">Configurer</Button>{' '}
    </div>
          
        </Col>
        <Col sm={7} className="preview_col">
        
          <Row className="preview_row">
          <Line  data={data} />

            <div className="canvas_container">
               <Shop3D
                style={{ position: "absolute" }}
                width={width}
                length={length}
                prime={prime}
                depth={depth}
                ratio={ratio}
                hor={hor}
                vert={vert}
                invert={invert}
                amax={amax}
                setAmax={setAmax}
                cwidth={cwidth}
                setCwidth={setCwidth}
                thickness={thickness}
                setThickness={setThickness}
              ></Shop3D> 
            </div>
          </Row>
        </Col>
      </Row>
    </Layout>
    <div className="shop_menu"> <Navbar expand="lg" >
    <Container>
    
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#home">Diffuseurs</Nav.Link>
          <Nav.Link href="#link">Absorbeurs</Nav.Link>
          <Nav.Link href="#link">Reflecteurs</Nav.Link>
          <Nav.Link href="#link">Accessoires</Nav.Link>
          
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar></div>

 </>
  );
};

export default Product;
