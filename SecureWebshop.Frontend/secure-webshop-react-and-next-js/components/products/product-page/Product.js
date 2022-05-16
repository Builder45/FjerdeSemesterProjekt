import classes from './Product.module.css';
import ProductReviews from './ProductReviews';
import ProductDetails from './ProductDetails';

export default function Product({ product = {} }) {
  const { reviews } = product;

  return (
    <>
      <section className={classes.container}>
        <ProductDetails product={product} />
      </section>
      <section className={classes.container}>
        <ProductReviews reviews={reviews} productId={product.id} />
      </section>
    </>
  );
}