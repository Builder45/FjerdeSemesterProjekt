import useAuth from '../../../hooks/useAuth';
import ProductReviewItem from './ProductReviewItem';
import classes from './ProductReviews.module.css';
import ReviewForm from './ReviewForm';

export default function ProductReviews({ reviews = [], productId }) {

  const { isAuthenticated } = useAuth();

  let reviewElements;
  if (reviews && reviews.length > 0) {
    reviewElements = reviews.map(
      review => <ProductReviewItem key={review.author} review={review}/>
    );
  }
  else {
    reviewElements = <p className={classes.noReviews}>Dette produkt har ikke nogen anmeldelser endnu.</p>
  }

  return (
    <div className={classes.reviews}>
      <h3 id="anmeldelser">Produktanmeldelser</h3>
      <hr className={classes.hr}/>
      {reviewElements}
      {isAuthenticated && <ReviewForm productId={productId}/>}
    </div>
  );
}