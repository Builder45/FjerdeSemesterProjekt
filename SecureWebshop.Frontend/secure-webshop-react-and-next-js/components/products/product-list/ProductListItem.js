import classes from './ProductListItem.module.css';

export default function ProductListItem({ product, onShowDetails }) {
  const { name, price, thumbnailUrl, rating, totalReviews } = product;

  return (
    <div className={classes.product}>
      <div className={classes.productHeader}>
        <h3>{name}</h3>
        <a onClick={onShowDetails}>Læs mere...</a>
      </div>
      <div className={classes.productThumbnail}>
        <img src={thumbnailUrl} alt=" " onClick={onShowDetails}/>
      </div>
      <div className={classes.productFooter}>
        <p>{price} kr.</p>
        <img src="" alt=""/>
      </div>
    </div>
  );
}