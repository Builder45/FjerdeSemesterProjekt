import { useDispatch, useSelector } from "react-redux";
import Button from "../ui/Button";
import classes from './CartButton.module.css';

export default function CartButton({ onToggle }) {
  const dispatch = useDispatch();
  const totalQuantity = useSelector(state => state.cart.totalQuantity);

  const toggleCartHandler = () => {
    onToggle();
  };

  return (
    <Button onClick={toggleCartHandler} className={classes.button}>
      <span>Min kurv</span>
      <span className={classes.quantity}>{totalQuantity}</span>
    </Button>
  );
}