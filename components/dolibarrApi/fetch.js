import axios from "axios";

const attributesFetchById = (id) =>
  axios.create({
    baseURL: `https://shop.quadratik.fr/api/index.php/products/attributes/${id}/values`,
    headers: {
      Accept: "application/json",
      DOLAPIKEY: "7VsbrNpR2wLvcX5XUJ933qYsy33Vx64Q",
    },
  });
export const valuesFetchByAttributesId = (id) =>
  axios
    .create({
      baseURL: `https://shop.quadratik.fr/api/index.php/products/attributes/${id}/values`,
      headers: {
        Accept: "application/json",
        DOLAPIKEY: "7VsbrNpR2wLvcX5XUJ933qYsy33Vx64Q",
      },
    })
    .get()
    .then((response) => response.data)
    .catch((error) => Promise.reject(error));

const objectsInCategory = (id, onlyId) =>
  axios
    .create({
      baseURL: `https://shop.quadratik.fr/api/index.php/categories/${id}/objects?type=product${onlyId ? "&onlyids=1" : ""}`,
      headers: {
        Accept: "application/json",
        DOLAPIKEY: "7VsbrNpR2wLvcX5XUJ933qYsy33Vx64Q",
      },
    })
    .get()
    .then((response) => response.data)
    .catch((error) => Promise.reject(error));

const listCategories = (filter) =>
  axios
    .create({
      baseURL: `https://shop.quadratik.fr/api/index.php/categories`,
      headers: {
        Accept: "application/json",
        DOLAPIKEY: "7VsbrNpR2wLvcX5XUJ933qYsy33Vx64Q",
      },
    })
    .get()
    .then((response) => {
      const compare = (a, b) => {
        if (a.label < b.label) {
          return -1;
        }
        if (a.label > b.label) {
          return 1;
        }
        return 0;
      };

      return response.data
        .sort(compare)
        .filter(filter)
        .map((cat) => ({ ...cat, ["label"]: cat.label.replace(/[0-9]{3}\s-\s*/gm, "") }));
    })
    .catch((error) => Promise.reject(error));

const attributesAllFetch = () =>
  axios.create({
    baseURL: `https://shop.quadratik.fr/api/index.php/products/attributes?sortfield=t.ref&sortorder=ASC&limit=100`,
    headers: {
      Accept: "application/json",
      DOLAPIKEY: "7VsbrNpR2wLvcX5XUJ933qYsy33Vx64Q",
    },
  });
const productFetchById = (id) =>
  axios.create({
    baseURL: `https://shop.quadratik.fr/api/index.php/products/${id}?includeparentid=true`,
    headers: {
      Accept: "application/json",
      DOLAPIKEY: "7VsbrNpR2wLvcX5XUJ933qYsy33Vx64Q",
    },
  })    .get()
  .then((response) => response.data)
  .catch((error) => Promise.reject(error));

  
const variantFetchByParentId = (id) =>
  axios
    .create({
      baseURL: `https://shop.quadratik.fr/api/index.php/products/${id}/variants`,
      headers: {
        Accept: "application/json",
        DOLAPIKEY: "7VsbrNpR2wLvcX5XUJ933qYsy33Vx64Q",
      },
    })
    .get()
    .then((response) => response.data)
    .catch((error) => Promise.reject(error));
const documentByProductId = (id) =>
  axios.create({
    baseURL: `https://shop.quadratik.fr/api/index.php/documents?modulepart=product&id=${id}`,
    headers: {
      Accept: "application/json",
      DOLAPIKEY: "7VsbrNpR2wLvcX5XUJ933qYsy33Vx64Q",
    },
  });
const performancesByProductId = (id) =>
  axios.create({
    baseURL: `https://shop.quadratik.fr/api/index.php/documents?modulepart=ecm&id=${id}`,
    headers: {
      Accept: "application/json",
      DOLAPIKEY: "7VsbrNpR2wLvcX5XUJ933qYsy33Vx64Q",
    },
  });
const documentByFilename = (filename) =>
  axios
    .create({
      baseURL: `https://shop.quadratik.fr/api/index.php/documents/download?modulepart=ecm&&original_file=${filename}`,
      headers: {
        Accept: "application/json",
        DOLAPIKEY: "7VsbrNpR2wLvcX5XUJ933qYsy33Vx64Q",
      },
    })
    .get()
    .then((response) => response.data.content)
    .catch((error) => Promise.reject(error));

export { attributesAllFetch, productFetchById, attributesFetchById, listCategories, objectsInCategory, documentByProductId, variantFetchByParentId, documentByFilename, performancesByProductId };
