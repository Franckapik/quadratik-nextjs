import { queryTypes, useQueryState } from "next-usequerystate";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { Layout } from "../../components/Layout";
import { objectsInCategory } from "../../components/dolibarrApi/fetch";
import { DiffusorView2D } from "../../components/quadralab/DiffusorView2D";
import { ModalReport2D } from "../../components/quadralab/ModalReport2D";
import ProductCanvas from "../../components/quadralab/ProductCanvas";
import QuadralabOptions from "../../components/quadralab/QuadralabOptions";
import { useProductStore } from "../../hooks/store";
import { useAttributes } from "../../hooks/useAttributes";


const QuadralabPerformances = ({ nomenclature, fmin, fmax, cwidth, weightPoplar, report2D, area, volume }) => (
  <Col className="flex flex-column quadralab_hud_col quadralab_params quadralab_game_border bg_darker ps-4 pe-4">
    <p className="text-center w-100 mt-4 mb-4 p-3">
      <i className="fad fa-stream"></i> REF : {nomenclature?.structurel}
    </p>
    <PerformanceWidget icon="fad fa-bolt" value={`${fmin} Hz - ${fmax} Hz`} color="red" performance={((fmax - fmin) * 100) / 10000} tooltip={"La plage de fréquence traitée"} /> {/* 10k audio frequency */}
    <PerformanceWidget icon="fad fa-weight" value={`${weightPoplar} kg // ${report2D?.lengthWells?.toFixed(0)} cm`} color="red" performance={(weightPoplar * 100) / 30} tooltip={"Le poids du diffuseur estimé si construit en peuplier. La longueur totale des hauteurs de puits du diffuseur"} />
    <PerformanceWidget icon="fad fa-sort-size-down" value={`${(cwidth * 10).toFixed(0)} mm`} color="red" performance={100 - (cwidth * 10 * 100) / 90} tooltip={"La taille des cellules. Plus elle est petite, plus les aigus sont traités"} />
    <PerformanceWidget icon="fad fa-box-open" value={`${area} m2 // ${volume} m3`} color="red" performance={(volume * 100) / 0.144} tooltip={"L'aire traitée par le diffuseur et le volume (boite) qu'il occupe"} /> {/* 120 * 60 * 20cm */}
  </Col>
);

const PerformanceWidget = ({ icon, value, color, performance, tooltip }) => {
  return (
    <OverlayTrigger key={"left"} placement={"left"} overlay={<Tooltip id={`tooltip-${value}`}>{tooltip}</Tooltip>}>
      <Row className="quadralab_performance_widget">
        <div className="flex quadralab_round quadralab_game_border bg_dark ">
          <i className={icon}></i>
        </div>
        <div className="flex quadralab_line quadralab_game_border ">
          <div className="h-100" style={{ width: `${performance}%`, maxWidth: "100%", backgroundColor: color }}></div>
        </div>
        <p className="quadralab_perf_value text-end ft7">{value}</p>
      </Row>
    </OverlayTrigger>
  );
};

const Quadralab = () => {
  //Data
  const [attributes, fetching, error] = useAttributes();

  const [defaultProduct, setDefaultProduct] = useState({});
  const [loading, setLoading] = useState(false);

  //Modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //get default product from tag category
  const [tag, setCategories] = useQueryState("TAG", queryTypes.integer.withDefault(1));
  useProductStore.setState({ tag: tag }); //global state
  const methods = useForm();

  const report2D = useProductStore((state) => state.report2D);
  const sizes = useProductStore((state) => state.sizes);
  const cwidth = useProductStore((state) => state.cwidth);
  const area = (sizes.longueur * sizes.largeur) / 1000;
  const volume = ((area * sizes.profondeur) / 1000).toFixed(5);
  const woodArea = (sizes.longueur * sizes.profondeur * (report2D.Type + 1) + sizes.largeur * sizes.profondeur * (report2D.Type + 1) + report2D.Cells * cwidth * cwidth) / 1000; //cm2
  const woodVolume = (woodArea * report2D.Thickness) / 1000; //m3
  const weightPoplar = (woodVolume * 530).toFixed(2); //kg pour le peuplier;
  const price = useProductStore.getState().price;
  const nomenclature = useProductStore.getState().nomenclature;
  const fmin = useProductStore((state) => state.fmin);
  const fmax = useProductStore((state) => state.fmax);
  const valuesSelected = useProductStore((state) => state.valuesSelected);

  const [dimensionView, setDimensionView] = useState(true);

  const onSubmit = (data) => console.log(data);

  useEffect(() => {
    objectsInCategory(tag)
      .get()
      .then((response) => {
        var attributes = JSON.parse(response.data[0].note_private);
        setDefaultProduct({ ...response.data[0], attributes: attributes });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [tag]);

  return (
    <>
      {!error ? (
        <Row className="quadralab_main_row justify-content-center align-items-center">
          <Layout header>
            <FormProvider {...methods}>
              <Form onSubmit={methods.handleSubmit(onSubmit)}>
                {!fetching ? <QuadralabOptions attributes={attributes} defaultProduct={defaultProduct} setLoading={setLoading} /> : "Chargement des options du produit"}

                {!loading ? (
                  <>
                    <Col style={{ visibility: !dimensionView ? "hidden" : "visible" }} className="d-flex flex-column justify-content-evenly ps-5 pe-5 quadralab_canvas_container">
                      <ProductCanvas></ProductCanvas>
                    </Col>
                    <Col style={{ visibility: dimensionView ? "hidden" : "visible" }} className="d-flex flex-column justify-content-center align-items-center quadralab_2d_view">
                      <DiffusorView2D sizes={sizes} area={area} volume={volume} fmin={fmin} woodArea={woodArea} woodVolume={woodVolume} />
                    </Col>
                  </>
                ) : (
                  "Chargement du modèle"
                )}

                <Row className="w-100 justify-content-center align-items-center quadralab_title ">
                  <Row className="text-center">
                    <Link href={{ pathname: "/shop/product", query: valuesSelected }}>
                      <p className="ft4 mb-1">
                        <i className="fad fa-store m-2"></i> Modèle similaire disponible : {nomenclature?.simple} ({price} €)
                      </p>
                    </Link>
                  </Row>

                  <Row className="justify-content-center align-items-center mt-4">
                    <Form.Check type={"switch"} id="dimension-switch" label={"3D / 2D"} onChange={(e) => setDimensionView(!dimensionView)} />
                    <Form.Check type={"switch"} id="ratio-switch" label={"Hauteur / Ratio"} onChange={(e) => useProductStore.setState({ ratio: e.target.checked })} />
                    <Form.Check type={"switch"} id="highlight-switch" label={"Surbrillance"} onChange={(e) => useProductStore.setState({ highlights: e.target.checked })} />
                  </Row>
                </Row>

                <Row className="quadralab_devis_button text-center w-100 justify-content-center ">
                  <Button variant="ternary" className="mt-4" onClick={handleShow}>
                    Plans de fabrication
                  </Button>
                  <Button variant="primary" type="submit" className=" mt-4">
                    Demander un devis
                  </Button>
                </Row>
                <ModalReport2D sizes={sizes} area={area} volume={volume} fmin={fmin} woodArea={woodArea} woodVolume={woodVolume} report2D={report2D} show={show} setShow={setShow} handleClose={handleClose} />
                <QuadralabPerformances nomenclature={nomenclature} fmin={fmin} fmax={fmax} cwidth={cwidth} weightPoplar={weightPoplar} report2D={report2D} area={area} volume={volume} sizes={sizes} woodArea={woodArea} woodVolume={woodVolume} />
              </Form>
            </FormProvider>
          </Layout>
        </Row>
      ) : (
        "Le produit ne semble pas exister en boutique" + error.message //layout page d'erreur a  faire
      )}
    </>
  );
};

export default Quadralab;
