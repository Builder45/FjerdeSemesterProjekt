import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useModal from '../../hooks/useModal';
import { fetchCartData, saveCartData } from '../../store/cart-actions';
import Cart from '../cart/Cart';
import MainNavbar from './MainNavbar';

let initialLoad = true;

export default function Layout({ children }) {

  const { modalIsVisible, modalHandler } = useModal();

  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (initialLoad) {
      initialLoad = false;
      return;
    }

    if (cart.changed) {
      dispatch(saveCartData(cart));
    }
  }, [cart, dispatch]);

  return (
    <>
      <MainNavbar onToggleCart={modalHandler}/>
      <main>{children}</main>
      <Cart onToggle={modalHandler} visible={modalIsVisible}/>
    </>
  );
}