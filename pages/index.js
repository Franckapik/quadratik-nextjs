import Link from "next/link";
import * as React from "react";
import SvgComponent from "../components/Waves";
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
