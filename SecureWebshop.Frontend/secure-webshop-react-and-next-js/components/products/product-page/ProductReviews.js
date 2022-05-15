import classes from './ProductReviews.module.css';

export default function ProductReviews({ reviews = [] }) {

  const reviewElements = reviews.map(
    review => <p key={review.author}>{review.author}</p>
  );

  return (
    <div className={classes.reviews}>
      <h3>Anmeldelser</h3>
      {reviewElements}
    </div>
  );
}