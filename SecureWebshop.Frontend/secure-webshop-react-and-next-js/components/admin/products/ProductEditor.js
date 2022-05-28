import useForm from "../../../hooks/useForm";
import ProductDetails from "../../products/product-page/ProductDetails";
import Card from "../../ui/containers/Card";
import ProductForm from "./ProductForm";

import classes from './ProductEditor.module.css';
import Product from "../../products/product-page/Product";

export default function ProductEditor({ product = {} }) {
  const { id, name, description, price, priceReduction, imageUrl } = product;
  const initialFormState = { 
    id, name, description, price, priceReduction, imageUrl, rating: 2.5, totalReviews: 100
  };
  const { input, changeHandler } = useForm(initialFormState, []);

  return (
    <>
      <Card className={classes.card}>
        <ProductForm product={input} onChange={changeHandler}/>
      </Card>
      <p className={classes.exampleText}>Eksempelvisning</p>
      <section className={classes.container}>
        <ProductDetails product={input} />
      </section>
    </>
  );
}