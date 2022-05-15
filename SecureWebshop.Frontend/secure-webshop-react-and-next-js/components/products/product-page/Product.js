import classes from './Product.module.css';
import ProductReviews from './ProductReviews';
import StarRating from '../../ui/rating/StarRating.js';
import ProductDetails from './ProductDetails';

export default function Product({ product = {} }) {
  const { reviews } = product;

  return (
    <section className={classes.product}>
      <ProductDetails product={product} />
      <ProductReviews reviews={reviews} />
    </section>
  );
}