import Card from "../ui/containers/Card";
import Input from "../ui/forms/Input";
import SelectInput from "../ui/forms/SelectInput";
import LinkText from "../ui/LinkText";

import classes from './Checkout.module.css';

export default function Checkout({ userData }) {

  const { email, phoneNumber, firstName, lastName, addresses } = userData;

  const addressOptions = addresses.map(address => 
    <option key={address.title} value={address.title}>
      {address.street}, {address.postalCode}
    </option>
  );

  return (
    <Card>
      <h1 className={classes.title}>Gennemfør din ordre</h1>
      <form className={classes.form}>
        <Input label='Navn' type='text' disabled={true} value={`${firstName} ${lastName}`}/>
        <Input label='Email' type='text' disabled={true} value={email}/>
        <Input label='Telefon' type='text' disabled={true} value={phoneNumber}/>
        <SelectInput label='Vælg adresse'>{addressOptions}</SelectInput>
        <LinkText href='/bruger/adresser?callback=checkout' text='Redigér adresser'/>
      </form>
    </Card>
  );
}