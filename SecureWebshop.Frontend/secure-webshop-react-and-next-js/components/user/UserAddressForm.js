import axios from "axios";
import { useEffect, useState } from "react";
import useForm from "../../hooks/useForm";
import { getCityByPostalCode } from "../../utils/api-service";
import { validatePostalCode, validateText } from "../../utils/input-validation";
import Button from "../ui/Button";
import Card from "../ui/containers/Card";
import Input from "../ui/forms/Input";
import LinkText from "../ui/LinkText";

import classes from './Form.module.css';

export default function UserAddressForm() {
  const [ city, setCity ] = useState("");
  const initialFormState = { 
    title: "",
    street: "",
    postalCode: ""
  };
  const validations = [
    { id: "title", method: ({title}) => validateText(title, 1, 30) },
    { id: "street", method: ({street}) => validateText(street, 1, 100) },
    { id: "postalCode", method: ({postalCode}) => validatePostalCode(postalCode) }
  ];
  const { input, isValid, errors, touched, changeHandler, blurHandler } = useForm(initialFormState, validations);

  useEffect(() => {
    setCity("");
    if (!input.postalCode || isNaN(input.postalCode)) return;

    const timer = setTimeout(async () => {
      await getCityByPostalCode(input.postalCode).then(response => {
        setCity(response);
      });
    }, 1000);

    return () => {
      clearTimeout(timer);
    };

  }, [input.postalCode]);

  const titleError = touched.title && errors.title ? errors.title : "";
  const streetError = touched.street && errors.street ? errors.street : "";
  const postalCodeError = touched.postalCode && errors.postalCode ? errors.postalCode : "";

  return (
    <Card className={classes.form}>
      <h2>Tilføj ny addresse</h2>
      <form>
        <div className={classes.inputs}>
          <Input id="title" type="text" label="Titel" value={input.title} onChange={changeHandler} onBlur={blurHandler} error={titleError}/>
          <Input id="street" type="text" label="Vej" value={input.street} onChange={changeHandler} onBlur={blurHandler} error={streetError}/>
          <Input id="postalCode" type="text" label="Postnummer" value={input.postalCode} onChange={changeHandler} onBlur={blurHandler} error={postalCodeError}/>
          <Input disabled={true} id="city" type="text" label="By" value={city} />
        </div>
        <div className={classes.actions}>
          <Button disabled={!isValid || !city} >Opdater oplysninger</Button>
        </div>
        <LinkText href="/bruger" text="Gå tilbage"/>
      </form>
    </Card>
  );
}