import Link from 'next/link';
import classes from './ProductListItemDetails.module.css';

export default function ProductListItemDetails({ product }) {
  const { id, name, description, price, imageUrl, rating, totalReviews } = product;

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
        <Link href={`/produkt/${id}`}>Link til fuld side</Link>
      </div>
    </div>
  );
}