import axios from "axios";


const variantPost = (parentId) =>  axios.create({
    baseURL: `https://shop.quadratik.fr/api/index.php/products/${parentId}/variants`,
    headers: {
      Accept: "application/json",
      DOLAPIKEY: "7VsbrNpR2wLvcX5XUJ933qYsy33Vx64Q",
    },
  });


  export {variantPost}