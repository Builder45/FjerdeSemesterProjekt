import { cartActions } from "./index";

export const fetchCartData = () => {
  return dispatch => {
    const cartData = localStorage.getItem('cartData');
    if (cartData !== null) {
      const parsedCartData = JSON.parse(cartData);
      dispatch(cartActions.loadCart({
        items: parsedCartData.items,
        totalQuantity: parsedCartData.totalQuantity
      }));
    }
  };
};

export const saveCartData = cart => {
  return dispatch => {
    localStorage.setItem('cartData', JSON.stringify(cart));
    //dispatch(cartActions.setChangedFalse());
  }
}