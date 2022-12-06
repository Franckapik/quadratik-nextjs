import axios from "axios";


const attributesFetch = axios.create({
    baseURL: "https://shop.quadratik.fr/api/index.php/products/attributes",
    headers: {
      Accept: "application/json",
      DOLAPIKEY: "4BWD37pVYZ9quAL6m9zrzB2U96al4vdE",
    },
  });
  const productsFetch = axios.create({
    baseURL: "https://shop.quadratik.fr/api/index.php/products",
    headers: {
      Accept: "application/json",
      DOLAPIKEY: "4BWD37pVYZ9quAL6m9zrzB2U96al4vdE",
    },
  });

  export {attributesFetch, productsFetch}