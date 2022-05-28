import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions, uiActions } from "../../store";
import { createOrder } from "../../utils/api-service";
import Button from "../ui/Button";
import Card from "../ui/containers/Card";
import Input from "../ui/forms/Input";
import SelectInput from "../ui/forms/SelectInput";
import LinkText from "../ui/text/LinkText";

import classes from './Checkout.module.css';

export default function Checkout({ userData }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const cart = useSelector(state => state.cart);

  const { email, phoneNumber, firstName, lastName, addresses } = userData;
  const [ chosenAddress, setChosenAddress ] = useState(addresses.length > 0 ? addresses[0].title : "");

  const selectHandler = event => {
    setChosenAddress(event.target.value);
  };

  const submitHandler = event => {
    event.preventDefault();

    console.log(chosenAddress);
    if (chosenAddress) {
      const order = {
        addressTitle: chosenAddress,
        items: cart.items
      }
      createOrder(order).then(response => {
        dispatch(cartActions.reset());
        if (response) {
          router.replace('/checkout/betaling?orderId=' + response.data.orderId);
        }
        else {
          router.replace('/checkout/ordre-fejl');
        }
      });
    }
    else {
      dispatch(uiActions.setNotification("Du mangler at tilføje en adresse"));
    }
  }

  const addressOptions = addresses.map(address => 
    <option key={address.title} value={address.title}>
      {address.street}, {address.postalCode}
    </option>
  );

  return (
    <Card className={classes.checkout}>
      <h1 className={classes.title}>Gennemfør din ordre</h1>
      <form onSubmit={submitHandler} className={classes.form}>
        <Input label='Navn' type='text' disabled={true} value={`${firstName} ${lastName}`}/>
        <Input label='Email' type='text' disabled={true} value={email}/>
        <Input label='Telefon' type='text' disabled={true} value={phoneNumber}/>
        <SelectInput label='Vælg adresse' onChange={selectHandler} value={chosenAddress}>{addressOptions}</SelectInput>
        <LinkText href='/bruger/adresser?callback=checkout' text={addresses.length > 0 ? 'Redigér adresser' : 'Tilføj en adresse'}/>
        <Button>Gå til betaling</Button>
      </form>
    </Card>
  );
}