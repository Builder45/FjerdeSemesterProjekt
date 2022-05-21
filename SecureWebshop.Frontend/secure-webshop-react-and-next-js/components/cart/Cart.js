import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../store';
import Modal from '../ui/modal/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';

export default function Cart({ onToggle, visible }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const cartQuantity = useSelector(state => state.cart.totalQuantity);

  const addToCartHandler = item => {
    dispatch(cartActions.addItem({
      id: item.id,
      name: item.name,
      price: item.price
    }));
  };

  const removeFromCartHandler = id => {
    dispatch(cartActions.removeItem(id));
  };

  const cartItemElements = cartItems.map(item => 
    <CartItem key={item.id} item={item} 
      onAdd={addToCartHandler.bind(null, item)} 
      onRemove={removeFromCartHandler.bind(null, item.id)}
      onCartToggle={onToggle}
    />
  );

  return (
    <Modal visible={visible} className={classes.modal} onClick={onToggle}>
      <ul className={classes.cart}>
        {cartItemElements}
      </ul>
    </Modal>
  );
}