import classes from './ProductDetails.module.css';
import StarRating from '../../ui/rating/StarRating.js';
import Button from '../../ui/Button';

export default function ProductDetails({ product = {} }) {
  const { name, description, price, imageUrl, rating, totalReviews } = product;

  return (
    <div className={classes.productDetails}>
      <div className={classes.image}>
        <img src={imageUrl} />
      </div>
      <div className={classes.details}>
        <h2>{name}</h2>
        <p className={classes.description}>{description}</p>
        <div className={classes.rating}>
          <StarRating rating={rating} size={26}/>
          <p>({rating} - {totalReviews} anmeldelser)</p>
        </div>
        <p className={classes.price}>{price} kr</p>
        <Button className={classes.addItemButton}>Tilføj til kurven</Button>
      </div>
    </div>
  );
}