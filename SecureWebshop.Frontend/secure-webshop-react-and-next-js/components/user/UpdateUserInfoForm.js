import useForm from "../../hooks/useForm";
import { validatePhoneNumber, validateText } from "../../utils/input-validation";
import Button from "../ui/Button";
import Card from "../ui/containers/Card";
import Input from "../ui/forms/Input";

import classes from './Form.module.css';

export default function UpdateUserInfoForm({ initialData }) {

  const initialFormState = { 
    firstName: initialData.firstName,
    lastName: initialData.lastName,
    phoneNumber: `${initialData.phoneNumber}`
  };
  const validations = [
    { id: "firstName", method: ({firstName}) => validateText(firstName, 1, 50) },
    { id: "lastName", method: ({lastName}) => validateText(lastName, 1, 100) },
    { id: "phoneNumber", method: ({phoneNumber}) => validatePhoneNumber(phoneNumber) }
  ];
  const { input, isValid, errors, touched, changeHandler, blurHandler } = useForm(initialFormState, validations);

  const updateInformationHandler = event => {
    event.preventDefault();

    if (isValid) {

    }
  };

  const firstNameError = touched.firstName && errors.firstName ? errors.firstName : "";
  const lastNameError = touched.lastName && errors.lastName ? errors.lastName : "";
  const phoneNumberError = touched.phoneNumber && errors.phoneNumber ? errors.phoneNumber : "";

  return (
    <Card className={classes.form}>
      <h2>Redigér oplysninger</h2>
      <form>
        <div className={classes.inputs}>
          <Input id="firstName" type="text" label="Fornavn" value={input.firstName} onChange={changeHandler} onBlur={blurHandler} error={firstNameError}/>
          <Input id="lastName" type="text" label="Efternavn" value={input.lastName} onChange={changeHandler} onBlur={blurHandler} error={lastNameError}/>
          <Input id="phoneNumber" type="tel" label="Telefon" value={input.phoneNumber} onChange={changeHandler} onBlur={blurHandler} error={phoneNumberError}/>
        </div>
        <div className={classes.actions}>
          <Button disabled={!isValid} onClick={updateInformationHandler}>Opdater oplysninger</Button>
        </div>
      </form>
    </Card>
  );
}