import useForm from "/hooks/useForm";
import { validatePhoneNumber, validateText } from "/utils/input-validation";
import Button from "../ui/Button";
import Card from "../ui/containers/Card";
import Input from "../ui/forms/Input";

import classes from './Form.module.css';
import { updateUserInfo } from "../../utils/api-service";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store";
import { useState } from "react";
import LoadingSpinner from "../ui/LoadingSpinner";
import { useRouter } from "next/router";
import LinkText from "../ui/text/LinkText";

const ERROR_MESSAGE = "Fejl: Dine oplysninger blev ikke opdateret!";
const SUCCESS_MESSAGE = "Succes! Dine oplysninger er blevet ændret!";

export default function UpdateUserInfoForm({ initialData }) {
  const [ isProcessing, setIsProcessing ] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

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
  const isChanged = Object.keys(touched).length > 0;

  if (isProcessing) return <LoadingSpinner />;

  const updateInformationHandler = event => {
    event.preventDefault();

    if (isValid) {
      setIsProcessing(true);
      updateUserInfo(input)
        .then(response => {
          setIsProcessing(false);
          if (!response) {
            dispatch(uiActions.setNotification(ERROR_MESSAGE));
          }
          else {
            dispatch(uiActions.setNotification(SUCCESS_MESSAGE));
            router.replace('/bruger');
          }
        });
      
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
          <Button disabled={!isValid || !isChanged} onClick={updateInformationHandler}>Opdater oplysninger</Button>
        </div>
        <LinkText href="/bruger" text="Gå tilbage"/>
      </form>
    </Card>
  );
}