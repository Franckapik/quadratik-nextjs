import axios from "axios";


const attributesFetchById = (id) => axios.create({
    baseURL: `https://shop.quadratik.fr/api/index.php/products/attributes/${id}/values`,
    headers: {
      Accept: "application/json",
      DOLAPIKEY: "7VsbrNpR2wLvcX5XUJ933qYsy33Vx64Q",
    },
  });
const attributesAllFetch = () => axios.create({
    baseURL: `https://shop.quadratik.fr/api/index.php/products/attributes?sortfield=t.ref&sortorder=ASC&limit=100`,
    headers: {
      Accept: "application/json",
      DOLAPIKEY: "7VsbrNpR2wLvcX5XUJ933qYsy33Vx64Q",
    },
  });
  const productFetchById = (id) => axios.create({
    baseURL: `https://shop.quadratik.fr/api/index.php/products/${id}?includeparentid=true`,
    headers: {
      Accept: "application/json",
      DOLAPIKEY: "7VsbrNpR2wLvcX5XUJ933qYsy33Vx64Q",
    },
  });

  export {attributesAllFetch, productFetchById, attributesFetchById}