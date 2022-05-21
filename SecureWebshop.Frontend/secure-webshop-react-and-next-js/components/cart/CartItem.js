import { useRouter } from 'next/router';
import classes from './CartItem.module.css';

export default function CartItem({ item, onAdd, onRemove, onCartToggle }) {

  const router = useRouter();
  const { name, quantity } = item;
  const total = `${item.total.toFixed(2)} kr`;

  const itemRedirectHandler = () => {
    router.push('/produkt/' + item.id);
    onCartToggle();
  }

  return (
    <li className={classes.cartItem}>
      <div>
        <h3 onClick={itemRedirectHandler}>{name}</h3>
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