import axios from "axios";
import { useEffect, useState } from "react";
import { Form } from 'react-bootstrap';
import { Controller } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { Button } from 'react-bootstrap';



const attributes = axios.create({
  baseURL: "https://shop.quadratik.fr/api/index.php/products/attributes",
  headers: {
    Accept: "application/json",
    DOLAPIKEY: "4BWD37pVYZ9quAL6m9zrzB2U96al4vdE",
  },
});

const Values = ({ valueId }) => {
  const [values, setValues] = useState([]);

  useEffect(() => {
    attributes.get("/" + valueId + "/values").then((response) => {
      setValues(response.data);
    });
  }, [valueId, setValues]);

  return (
    <>

      {
        values.map((a, i) => {
          const v = a.value.split(",")
          return (

            <option value={v[0]} >{v[1]}</option>)
        })
      }
    </>
  );
};




const Select_Options = ({ setProduct, product }) => {
  const [posts, setPosts] = useState([]);
  const [values, setValues] = useState([]);

  const onSubmit = async (data) => {
    /*  media !== "create" ? (data.media_id = db_media.media_id) : null;
 
     data.media_category_id = parseInt(data.media_category_id); //integer issue
     data.media_author_id = parseInt(data.media_author_id); //integer issue
 
     filesSelected
       ? (data.media_path = filesSelected[0].url)
       : (data.media_path = db_media.media_path || 0);
 
     filesSelected
       ? (data.media_photo = filesSelected[0].public_id)
       : (data.media_photo = db_media.media_photo || 0);
 
     await axios
       .post("/api/media/addMedia", data)
 
       .then((response) => {
         console.log(response);
 
         if (media === "create") {
           //add position in db_home_media_position
           const items = db_home.home_media_position.split(",");
           items.unshift(response.data.media_id);
           axios.post("/api/media/position", {
             items: items,
           });
         }
 
         router.push(
           "/admin/media?operation=ajouté&type=media&value=" +
             response.data.media_title
         );
       })
       .catch((error) => {
         console.log(error);
       }); */
  };

  useEffect(() => {


    attributes
      .get("?sortfield=t.ref&sortorder=ASC&limit=100")
      .then((response) => {
        setPosts(response.data);
      });
  }, []);



  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {

    },
  });

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      setProduct(value)

    });
    return () => subscription.unsubscribe();
  }, [watch, setProduct]);

  return (

    <Form onSubmit={handleSubmit(onSubmit)} onReset={reset}>

      {posts &&
        posts.map((a, i) => (

          <Form.Group className="mb-3" controlId="media_category_id_id">

            <Controller
              control={control}
              rules={{
                required: "Ce champ est manquant",
              }}
              name={a.ref}
              defaultValue={product[a.ref]}
              render={({ field }) => (
                <Form.Select
                  {...field}
                >

                  <Values valueId={a.id}></Values>
                </Form.Select>
              )}
            />

          </Form.Group>

        ))
      }

      <Button variant="outline-primary m-2" size="lg" type="submit">
        Ajouter au panier
      </Button>
    </Form>




  );
};

export default Select_Options;