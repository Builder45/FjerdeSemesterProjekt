import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../ui/Button";
import classes from './CartButton.module.css';



export default function CartButton({ onToggle }) {
  const totalQuantity = useSelector(state => state.cart.totalQuantity);
  const [ quantityChanged, setQuantityChanged ] = useState(false);

  useEffect(() => {
    if (totalQuantity === 0) return;

    setQuantityChanged(true);
    setTimeout(() => {
      setQuantityChanged(false);
    }, 400);
  }, [totalQuantity]);


  const toggleCartHandler = () => {
    onToggle();
  };

  return (
    <Button onClick={toggleCartHandler} className={`${classes.button} ${quantityChanged && classes.buttonEffect}`}>
      <span>Min kurv</span>
      <span className={classes.quantity}>{totalQuantity}</span>
    </Button>
  );
}