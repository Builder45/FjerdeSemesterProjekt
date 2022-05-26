import classes from './ProductDetails.module.css';
import StarRating from '../../ui/rating/StarRating.js';
import Button from '../../ui/Button';
import LinkText from '../../ui/LinkText';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../../store';
import PriceTag from './PriceTag';

export default function ProductDetails({ product = {} }) {
  const { id, name, description, price, priceReduction, imageUrl, rating, totalReviews } = product;

  const dispatch = useDispatch();

  const addItemHandler = item => {
    dispatch(cartActions.addItem({
      id, name, price
    }));
  }

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
          {totalReviews > 0 && <p>{rating.toFixed(1)} ({totalReviews})</p>}
          {!totalReviews && <p>Ingen anmeldelser</p>}
          {/* <LinkText href={`/produkt/${id}#anmeldelser`} text="Skriv en anmeldelse"/> */}
        </div>
        <div className={classes.price}>
          <PriceTag price={price} priceReduction={priceReduction}/>
        </div>
        <Button className={classes.addItemButton} onClick={addItemHandler}>Tilføj til kurven</Button>
      </div>
    </div>
  );
}