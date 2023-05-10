import axios from "axios";


const attributesFetchById = (id) => axios.create({
    baseURL: `https://shop.quadratik.fr/api/index.php/products/attributes/${id}/values`,
    headers: {
      Accept: "application/json",
      DOLAPIKEY: "7VsbrNpR2wLvcX5XUJ933qYsy33Vx64Q",
    },
  });

const objectsInCategory = (id) => axios.create({
    baseURL: `https://shop.quadratik.fr/api/index.php/categories/${id}/objects?type=product`,
    headers: {
      Accept: "application/json",
      DOLAPIKEY: "7VsbrNpR2wLvcX5XUJ933qYsy33Vx64Q",
    },
  });

const listCategories = () => axios.create({
    baseURL: `https://shop.quadratik.fr/api/index.php/categories`,
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
  const variantFetchByParentId = (id) => axios.create({
    baseURL: `https://shop.quadratik.fr/api/index.php/products/${id}/variants`,
    headers: {
      Accept: "application/json",
      DOLAPIKEY: "7VsbrNpR2wLvcX5XUJ933qYsy33Vx64Q",
    },
  });
  const documentByProductId = (id) => axios.create({
    baseURL: `https://shop.quadratik.fr/api/index.php/documents?modulepart=product&id=${id}`,
    headers: {
      Accept: "application/json",
      DOLAPIKEY: "7VsbrNpR2wLvcX5XUJ933qYsy33Vx64Q",
    },
  });
  const performancesByProductId = (id) => axios.create({
    baseURL: `https://shop.quadratik.fr/api/index.php/documents?modulepart=ecm&id=${id}`,
    headers: {
      Accept: "application/json",
      DOLAPIKEY: "7VsbrNpR2wLvcX5XUJ933qYsy33Vx64Q",
    },
  });
  const documentByFilename = (filename) => axios.create({
    baseURL: `https://shop.quadratik.fr/api/index.php/documents/download?modulepart=ecm&&original_file=${filename}`,
    headers: {
      Accept: "application/json",
      DOLAPIKEY: "7VsbrNpR2wLvcX5XUJ933qYsy33Vx64Q",
    },
  });

  export {attributesAllFetch, productFetchById, attributesFetchById, listCategories, objectsInCategory, documentByProductId, variantFetchByParentId, documentByFilename, performancesByProductId}