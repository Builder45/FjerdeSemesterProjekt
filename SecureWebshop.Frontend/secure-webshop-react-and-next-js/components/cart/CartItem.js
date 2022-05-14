import classes from './CartItem.module.css';

export default function CartItem({ item, onAdd, onRemove }) {

  const { name, quantity } = item;
  const total = `${item.total.toFixed(2)} kr`;

  return (
    <li className={classes.cartItem}>
      <div>
        <h3>{name}</h3>
        <div className={classes.info}>
          <span className={classes.total}>{total}</span>
          <span className={classes.quantity}>x {quantity}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={onRemove}>-</button>
        <button onClick={onAdd}>+</button>
      </div>
    </li>
  );
}