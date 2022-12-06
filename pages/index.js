import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "next/image";
import * as React from "react";
import SvgComponent from "../components/Waves";
import Link from "next/link";
import Layout from '../layouts/Layout';

const Home = () => (
  <Layout>
    <SvgComponent className="waves" />
    <Link href={"/quadralab/quadralab"}>
      <img className="logo_main" src="/logo.png" />
    </Link>
  </Layout>
);

export default Home;
