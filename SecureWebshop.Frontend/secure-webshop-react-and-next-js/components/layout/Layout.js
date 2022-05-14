import { useSelector } from 'react-redux';
import useModal from '../../hooks/useModal';
import Cart from '../cart/Cart';
import MainNavbar from './MainNavbar';

export default function Layout({ children }) {

  const { modalIsVisible, modalHandler } = useModal();

  return (
    <>
      <MainNavbar onToggleCart={modalHandler}/>
      <main>{children}</main>
      <Cart onToggle={modalHandler} visible={modalIsVisible}/>
    </>
  );
}