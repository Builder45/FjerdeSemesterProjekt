import StarRating from '../../ui/rating/StarRating';
import classes from './ProductListItem.module.css';

export default function ProductListItem({ product, onShowDetails }) {
  const { name, price, thumbnailUrl, rating, totalReviews } = product;

  return (
    <div className={classes.product} onClick={onShowDetails}>
      <div className={classes.thumbnail}>
        <img src={thumbnailUrl} alt=" "/>
      </div>
      <div className={classes.info}>
        <div className={classes.infoRating}>
          <StarRating rating={rating} size={20}/>
        </div>
        <h3 className={classes.infoName}>{name}</h3>
        <p className={classes.infoPrice}>{price.toFixed(2).replace('.', ',')} kr</p>
      </div>
    </div>
  );
}