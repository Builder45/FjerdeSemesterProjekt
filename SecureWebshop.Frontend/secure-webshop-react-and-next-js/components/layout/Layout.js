import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useModal from '../../hooks/useModal';
import { uiActions } from '../../store';
import { fetchCartData, saveCartData } from '../../store/cart-actions';
import Cart from '../cart/Cart';
import Modal from '../ui/modal/Modal';
import MainNavbar from './MainNavbar';

let initialLoad = true;

export default function Layout({ children }) {

  const { modalIsVisible, modalHandler } = useModal();

  const cart = useSelector(state => state.cart);
  const ui = useSelector(state => state.ui);
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

  const notificationHandler = () => {
    dispatch(uiActions.toggleNotification(false));
  };

  return (
    <>
      <MainNavbar onToggleCart={modalHandler}/>
      <main>{children}</main>
      <Cart onToggle={modalHandler} visible={modalIsVisible}/>
      <Modal onClick={notificationHandler} visible={ui.visible} btnText="Ok">
        <p>{ui.notification}</p>
      </Modal>
    </>
  );
}