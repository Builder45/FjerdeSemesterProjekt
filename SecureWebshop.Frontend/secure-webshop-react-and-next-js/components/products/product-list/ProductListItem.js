import StarRating from '../../ui/rating/StarRating';
import classes from './ProductListItem.module.css';

export default function ProductListItem({ product, onShowDetails, onAddToCart }) {
  const { name, price, thumbnailUrl, rating } = product;

  return (
    <div className={classes.product}>
      <button className={classes.addItem} onClick={onAddToCart}>+</button>
      <div className={classes.thumbnail} onClick={onShowDetails}>
        <img src={thumbnailUrl} alt=" "/>
      </div>
      <div className={classes.info}>
        <div className={classes.infoRating}>
          <StarRating rating={rating} size={20}/>
        </div>
        <h3 className={classes.infoName} onClick={onShowDetails}>{name}</h3>
        <p className={classes.infoPrice}>{price.toFixed(2).replace('.', ',')} kr</p>
      </div>
    </div>
  );
}