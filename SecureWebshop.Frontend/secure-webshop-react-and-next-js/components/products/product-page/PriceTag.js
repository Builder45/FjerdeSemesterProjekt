import classes from './PriceTag.module.css';

export default function PriceTag ({ price, priceReduction }) {

  const actualPrice = price * (100 - priceReduction) / 100;

  if (priceReduction == 0) {
    return (
      <div className={classes.priceContainer}>
        <p className={classes.price}>{price.toFixed(2).replace('.', ',')} kr</p>
      </div>
    );
  }

  return (
    <div className={classes.priceContainer}>
      <p className={classes.price}>{actualPrice.toFixed(2).replace('.', ',')} kr</p>
      <p className={classes.outdatedPrice}>{price.toFixed(2).replace('.', ',')} kr</p>
    </div>
  );
}