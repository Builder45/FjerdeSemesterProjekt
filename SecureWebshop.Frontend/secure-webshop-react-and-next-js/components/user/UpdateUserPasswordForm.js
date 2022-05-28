import useForm from "/hooks/useForm";
import Button from "../ui/Button";
import Card from "../ui/containers/Card";
import Input from "../ui/forms/Input";

import classes from './Form.module.css';
import { updateUserPassword } from "../../utils/api-service";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store";
import { useState } from "react";
import LoadingSpinner from "../ui/LoadingSpinner";
import { validatePassword, validatePasswordMatch } from "../../utils/input-validation";
import { useRouter } from "next/router";
import LinkText from "../ui/text/LinkText";

const ERROR_MESSAGE = "Fejl: Dit password blev ikke opdateret!";
const SUCCESS_MESSAGE = "Succes! Dit password er blevet ændret!";

export default function UpdateUserPasswordForm() {
  const [ isProcessing, setIsProcessing ] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const initialFormState = { password: "", repeatPassword: "" };
  const validations = [
    { id: "password", method: ({password}) => validatePassword(password) },
    { id: "repeatPassword", method: ({password, repeatPassword}) => validatePasswordMatch(password, repeatPassword) }
  ];
  const { input, isValid, errors, touched, changeHandler, blurHandler } = useForm(initialFormState, validations);

  if (isProcessing) return <LoadingSpinner />;

  const updateInformationHandler = event => {
    event.preventDefault();

    if (isValid) {
      setIsProcessing(true);
      updateUserPassword(input.password)
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

  const passwordError = touched.password && errors.password ? errors.password : "";
  const repeatPasswordError = touched.repeatPassword && errors.repeatPassword ? errors.repeatPassword : "";

  return (
    <Card className={classes.form}>
      <h2>Skift password</h2>
      <form>
        <div className={classes.inputs}>
        <Input id="password" type="password" label="Password" value={input.password} 
            onChange={changeHandler} onBlur={blurHandler} error={passwordError}
          />
          <Input id="repeatPassword" type="password" label="Gentag password" value={input.repeatPassword} 
            onChange={changeHandler} onBlur={blurHandler} error={repeatPasswordError}
          />
        </div>
        <div className={classes.actions}>
          <Button disabled={!isValid} onClick={updateInformationHandler}>Opdater oplysninger</Button>
        </div>
        <LinkText href="/bruger" text="Gå tilbage"/>
      </form>
    </Card>
  );
}