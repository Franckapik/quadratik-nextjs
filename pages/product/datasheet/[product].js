import { useRef } from "react";
import { useFetchProduct } from "../../../hooks/useFetchProduct";
import { useComputeProduct } from "../../../hooks/useComputeProduct";
import { useRouter } from "next/router";
import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { usePicture } from "../../../hooks/usePicture";
import Image from "next/image";
import { LayoutHome } from "../../../components/LayoutHome";
import { PerformanceSpatial } from "../../../components/product/ParformanceSpatial";
import { PerformanceCharts } from "../../../components/product/PerformanceCharts";
import logoMarqueeImg from "../../../public/images/logo/logo_blanc.png";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Page, Text, View, Document, StyleSheet, Image as PDFImage } from "@react-pdf/renderer";

const PDFDownloadLink = dynamic(() => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink), { ssr: false });
const PDFViewer = dynamic(() => import("@react-pdf/renderer").then((mod) => mod.PDFViewer), { ssr: false });

const styles = StyleSheet.create({
  page: { backgroundColor: "#332d2a", color: "#f5f5f5", display: "flex", lineHeight: 1.1 },
  section: { margin: 10, padding: 10, flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "center", fontSize: 11 },
  logo: { width: 60, height: 60, marginBottom: 15 },
  row: { display: "flex", flexDirection: "row", width: "100%", height: "calc(38% - 20px)", border: "1px solid #f5f5f5", padding: 10 },
  col: { display: "flex", flexDirection: "column", width: "50%", border: "1px solid #f5f5f5", padding: 10, margin: 5 },
  title: { fontSize: 20, marginBottom: 10, fontWeight: "bold" },
  cropped: { objectFit: "cover", transform: "scale(1.3), translate(0,35%)", height: "100%", width: "100%" },
  fullRow: { display: "flex", flexDirection: "row", width: "100%", height: "calc(33.33% - 20px)", border: "1px solid #f5f5f5", padding: 10, margin: 5 },
  paragraph: { marginBottom: 10 },
  subtitle: { marginBottom: 25 },
});

const MyDocument = ({ product, sidePicture, facePicture, dimensions, router }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <PDFImage style={styles.logo} src={logoMarqueeImg.src} alt="Miniature du logo de l'entreprise Quadratik" />
        <Text style={styles.title}>Fiche Technique - {product.nomenclature?.simple}</Text>
        <Row style={styles.row}>
          <Col style={styles.col}>
            <PDFImage style={styles.cropped} src={`data:image/png;base64,${facePicture}`} alt="Miniature du logo de l'entreprise Quadratik" />
          </Col>
          <Col style={styles.col}>
            {product && (
              <>
                <Text style={styles.paragraph}>{product.description.category_desc.replace("$PRODUCT", product.nomenclature?.simple)}</Text>
                <Text style={styles.paragraph}>{product.description.parent_description}</Text>
                <Text style={styles.paragraph}>
              {dimensions.w} cm x {dimensions.l} cm x {dimensions.P} cm
            </Text>
              </>
            )}
          </Col>
        </Row>
        <Row style={styles.row}>
          <Col style={styles.col}>

            {dimensions.D === "D2" || dimensions.D === "D1" ? (
              <>
                <Text style={styles.subtitle}>
                  Diffuseur QRD {dimensions.D === "D1" ? "1D" : "2D"} basé sur le nombre premier {dimensions.N} avec diffusion sonore hémisphérique
                </Text>
                <Text style={styles.paragraph}>Aire du diffuseur : {dimensions.area / 10000} m2</Text>
                <Text style={styles.paragraph}>Volume du diffuseur : {dimensions.volume / 1000000} m3</Text>
                <Text style={styles.paragraph}>Fréquence de conception : {dimensions.fmin} Hz</Text>
                <Text style={styles.paragraph}>Fréquence de coupure supérieure : {dimensions.fmax} Hz</Text>
                <Text style={styles.paragraph}>Diffusion des basses fréquences jusqu'à {dimensions.fmin / 2} Hz</Text>
                <Text style={styles.paragraph}>Nombre de puits/cellules : {dimensions.report.length}</Text>
                <Text style={styles.paragraph}>Epaisseur des parois : {dimensions.E} mm</Text>
                <Text style={styles.paragraph}>Largeur d'une cellule : {dimensions.c.toFixed(2)} cm</Text>
                <Text style={styles.paragraph}>Nombre de hauteur de cellules différentes : {dimensions.amax}</Text>
                <Text style={styles.paragraph}>Poids (peuplier) : {dimensions.weightPoplar} kg</Text>
              </>
            ) : (
              <>
                <Text style={styles.paragraph}>Absorption à partir de {product.frequencies.fmin} Hz</Text>
                <Text style={styles.paragraph}>Absorption totale à partir de {product.frequencies.fmax} Hz</Text>
                <Text style={styles.paragraph}>Aire de l'absorbeur : {dimensions.area / 10000} m2</Text>
                <Text style={styles.paragraph}>Volume de l'absorbeur : {dimensions.volume / 1000000} m3</Text>
                <Text style={styles.paragraph}>Cadre en bois : Bois contreplaque peuplier epaisseur 4mm (Populus spp) de couleur claire.</Text>
                <Text style={styles.paragraph}>Couleur du tissu : {dimensions.F}</Text>
                <Text style={styles.paragraph}>Tissu acoustique : tissu traditionnel tissé uni pour intérieurs commerciaux aux normes BS 476 section 7 classe 1. 100% Polyoléfine.</Text>
              </>
            )}
          </Col>
          <Col style={styles.col}>
            {" "}
            <PDFImage style={styles.cropped} src={`data:image/png;base64,${sidePicture}`} alt="Miniature du logo de l'entreprise Quadratik" />
          </Col>
        </Row>
      </View>
    </Page>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Row style={styles.fullRow}>
          <Text style={styles.paragraph}>Catégorie du modèle : {product.description.parent_label}</Text>
          <Text style={styles.paragraph}>Url : https://www.quadratik.fr{router.asPath.replace("datasheet/", "")}</Text>
          <Text style={styles.paragraph}>Inflammabilité: Conception inflammable d’après DIN 4102 B1, difficilement inflammable, classement M1 , FMVSS 302, UL 94 V0 + HF1</Text>
          <Text style={styles.paragraph}>Installation : Système d'accrochage sur les quatres côtés</Text>
          <Text style={styles.paragraph}>Origine des matériaux: 100% France</Text>
        </Row>
        <Row style={styles.fullRow}>
          <Text>PerformanceCharts</Text>
        </Row>
        <Row style={styles.fullRow}>
          <Text>Area</Text>
        </Row>
      </View>
    </Page>
  </Document>
);

const Datasheet = () => {
  const ref = useRef();
  const router = useRouter();
  const { allAttributes, defaultProduct, category, productAttributes, isAllSuccess, allValues, isVariant } = useFetchProduct(router.query.vid, router.query.dpid, router.query.childCat);
  const { product, isSuccess: productSuccess } = useComputeProduct(allAttributes, productAttributes, allValues, category, defaultProduct, isAllSuccess, router.query.vid, isVariant);
  const dimensions = product.dimensions;
  const { facePicture: facePicture, sidePicture: sidePicture, isSuccess: pictureSucceed, isError: pictureError } = usePicture(product?.nomenclature?.simple, false); //true for miniature
  return (
    <Row className="bg_white ft4 justify-content-center">
      {/* <LayoutHome
        datasheet={
          <>
            <PDFDownloadLink document={<MyDocument product={product} />} fileName={product?.nomenclature?.simple + "_fiche_technique.pdf"}>
              {({ loading }) => (loading ? "Loading document..." : <Button className="m-2">Télécharger la fiche technique</Button>)}
            </PDFDownloadLink>
          </>
        }
        home
        shop
        fixed
        dark
      /> */}
      {productSuccess && (
        <Row className="layout_space datasheet w-90 border_dark_top">
          <PDFViewer width="100%" height="600">
            <MyDocument product={product} facePicture={facePicture} sidePicture={sidePicture} dimensions={dimensions} router={router} />
          </PDFViewer>
          <div className="p-0 m-0" ref={ref}>
            <Row className="bg_dark">
              <div className="text-center">
                <Image width={100} height={100} src={logoMarqueeImg} alt="Miniature du logo de l'entreprise Quadratik" className="mb-4" />
              </div>
              <p className="justify-content-center ft1 text-center p-3">Fiche Technique - {product.nomenclature?.simple}</p>
            </Row>
            <Card className="d-flex flex-row m-4 align-items-center bg_creme_light">
              <Col md={3}>{pictureSucceed && <Image style={{ objectFit: "cover" }} width={720} height={1080} className="d-block m-auto w-90" src={`data:image/png;base64,${facePicture}`} alt="Aperçu de face d'un modèle Quadratik" />}</Col>
              <Col>
                <ListGroup>
                  <ListGroup.Item> {product.description.category_desc.replace("$PRODUCT", product.nomenclature?.simple)} </ListGroup.Item>
                  <ListGroup.Item> {product.description.parent_description} </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>
                      {" "}
                      Dimensions du modèle (l x L x P) :
                      <span>
                        {dimensions.w} cm x {dimensions.l} cm x {dimensions.P} cm
                      </span>
                    </strong>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={3}>{pictureSucceed && <Image style={{ objectFit: "cover" }} width={720} height={1080} className="d-block m-auto w-90" src={`data:image/png;base64,${sidePicture}`} alt="Aperçu de face d'un modèle Quadratik" />} </Col>
            </Card>
            <Card className="d-flex flex-row m-4 align-items-center bg_grey">
              <Col>
                {(product.dimensions.D === "D2" || product.dimensions.D === "D1") && (
                  <Row>
                    <Col>
                      <ListGroup>
                        <ListGroup.Item>
                          <i className="fad fa-dot-circle" /> Diffuseur QRD {dimensions.D === "D1" ? "1D" : "2D"} basé sur le nombre premier {dimensions.N} avec diffusion sonore hémisphérique
                        </ListGroup.Item>

                        <ListGroup.Item>
                          <i className="fad fa-dot-circle" /> <strong>Aire du diffuseur :</strong> <span>{dimensions.area / 10000} m2</span>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <i className="fad fa-dot-circle" /> <strong>Volume du diffuseur :</strong> <span>{dimensions.volume / 1000000} m3</span>
                        </ListGroup.Item>

                        <ListGroup.Item>
                          <i className="fad fa-dot-circle" /> <strong>Fréquence de conception :</strong> <span>{dimensions.fmin} Hz</span>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <i className="fad fa-dot-circle" /> <strong>Fréquence de coupure supérieure :</strong> <span>{dimensions.fmax} Hz</span>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <i className="fad fa-dot-circle" /> <strong>Effet de diffusion</strong> des basses fréquences jusqu'à <span>{dimensions.fmin / 2} Hz</span>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <i className="fad fa-dot-circle" /> <strong>Nombre de puits/cellules :</strong> <span>{dimensions.report.length}</span>
                        </ListGroup.Item>
                      </ListGroup>
                    </Col>
                    <Col>
                      {" "}
                      <ListGroup className=" d-flex justify-content-start">
                        <ListGroup.Item>
                          <i className="fad fa-dot-circle" /> <strong>Epaisseur des parois :</strong> <span>{dimensions.E} mm</span>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <i className="fad fa-dot-circle" /> <strong>Largeur d'une cellule :</strong> <span>{dimensions.c.toFixed(2)} cm</span>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <i className="fad fa-dot-circle" /> <strong>Décalage de cellules en vertical :</strong> <span>{dimensions.V}</span>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <i className="fad fa-dot-circle" /> <strong>Décalage de cellules en horizontal :</strong> <span>{dimensions.H}</span>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <i className="fad fa-dot-circle" /> <strong>Nombre de hauteur de cellules différentes :</strong> <span>{dimensions.amax}</span>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <i className="fad fa-dot-circle" /> <strong>Poids (pour le choix du bois Peuplier) :</strong> <span>{dimensions.weightPoplar} kg</span>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <i className="fad fa-dot-circle" /> <strong>Nombre de hauteur de cellules différentes :</strong> <span>{dimensions.amax}</span>
                        </ListGroup.Item>
                      </ListGroup>
                    </Col>
                  </Row>
                )}
                {dimensions.D !== "D2" && dimensions.D !== "D1" && dimensions.F !== undefined && (
                  <Row>
                    <ListGroup>
                      <ListGroup.Item>
                        <i className="fad fa-dot-circle" /> <strong>Absorption à partir de </strong> <span>{product.frequencies.fmin} Hz</span>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <i className="fad fa-dot-circle" /> <strong>Absorption totale à partir de </strong> <span>{product.frequencies.fmax} Hz</span>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <i className="fad fa-dot-circle" /> <strong>Aire de l'absorbeur :</strong> <span>{dimensions.area / 10000} m2</span>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <i className="fad fa-dot-circle" /> <strong>Volume de l'absorbeur :</strong> <span>{dimensions.volume / 1000000} m3</span>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <i className="fad fa-dot-circle" /> <strong>Cadre en bois :</strong> <span> Bois contreplaque peuplier epaisseur 4mm (Populus spp) de couleur claire.</span>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <i className="fad fa-dot-circle" /> <strong>Couleur du tissu :</strong> <span> {dimensions.F}</span>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <i className="fad fa-dot-circle" /> <strong>Tissu acoustique :</strong> <span>tissu traditionnel tissé uni pour intérieurs commerciaux aux normes BS 476 section 7 classe 1. 100% Polyoléfine.</span>{" "}
                      </ListGroup.Item>
                    </ListGroup>
                  </Row>
                )}
              </Col>
              {dimensions.F === undefined && (
                <Col md={4} className="d-flex flex-column align-items-center">
                  <div className="h-100 w-100">
                    <PerformanceSpatial nom={product.nomenclature.performance} />
                  </div>
                </Col>
              )}
            </Card>
            <Card className="d-flex flex-row m-4 align-items-center bg_creme_light">
              <Col md={4} className="d-flex flex-column align-items-center">
                <div className="h-100 w-100">
                  <PerformanceCharts product={product} />
                </div>
              </Col>
              <Col>
                <ListGroup>
                  <ListGroup.Item>
                    {" "}
                    <i className="fad fa-dot-circle" /> <strong>Catégorie du modèle :</strong> {product.description.parent_label}{" "}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    {" "}
                    <i className="fad fa-dot-circle" /> <strong>Url :</strong> <Link href={"https://www.quadratik.fr" + router.asPath.replace("datasheet/", "")}>{"https://www.quadratik.fr" + router.asPath.replace("datasheet/", "")}</Link>
                  </ListGroup.Item>
                  <ListGroup>
                    <ListGroup.Item>
                      {" "}
                      <i className="fad fa-dot-circle" /> <strong>Inflammabilité:</strong> Conception inflammable d’après DIN 4102 B1, difficilement inflammable, classement M1 , FMVSS 302, UL 94 V0 + HF1
                    </ListGroup.Item>
                    <ListGroup.Item>
                      {" "}
                      <i className="fad fa-dot-circle" /> <strong>Installation :</strong> Système d'accrochage sur les quatres côtés{" "}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      {" "}
                      <i className="fad fa-dot-circle" /> <strong>Origine des matériaux:</strong> 100% France
                    </ListGroup.Item>
                  </ListGroup>
                </ListGroup>
              </Col>
            </Card>
          </div>
        </Row>
      )}
    </Row>
  );
};

export default Datasheet;
