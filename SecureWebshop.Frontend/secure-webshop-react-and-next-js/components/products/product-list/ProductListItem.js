import StarRating from '../../ui/rating/StarRating';
import PriceTag from '../product-page/PriceTag';
import classes from './ProductListItem.module.css';

export default function ProductListItem({ product, onShowDetails, onAddToCart }) {
  const { name, price, priceReduction, imageUrl, rating } = product;

  return (
    <div className={classes.product}>
      <button className={classes.addItem} onClick={onAddToCart}>+</button>
      <div className={classes.thumbnail} onClick={onShowDetails}>
        <img src={imageUrl} alt=" "/>
      </div>
      <div className={classes.info}>
        <div className={classes.infoRating}>
          <StarRating rating={rating} size={20}/>
        </div>
        <h3 className={classes.infoName} onClick={onShowDetails}>{name}</h3>
        
        <div className={classes.infoPrice}>
          <PriceTag price={price} priceReduction={priceReduction} />
        </div>
      </div>
    </div>
  );
}