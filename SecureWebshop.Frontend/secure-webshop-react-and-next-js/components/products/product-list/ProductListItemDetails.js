import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../../store';
import Button from '../../ui/Button';
import classes from './ProductListItemDetails.module.css';

export default function ProductListItemDetails({ product }) {
  const { id, name, description, price, imageUrl, rating, totalReviews } = product;
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(cartActions.addItem({
      id,
      name,
      price
    }));
  };

  return (
    <div className={classes.details}>
      <div className={classes.header}>
        <h2>{name}</h2>
      </div>
      <div className={classes.main}>
        <img src={imageUrl} alt=" "/>
      </div>
      <div className={classes.footer}>
        <p>{description}</p>
        <Button onClick={addToCartHandler}>Tilføj til kurven</Button>
        <Link href={`/produkt/${id}`}>Link til fuld side</Link>
      </div>
    </div>
  );
}