import useForm from '/hooks/useForm';
import { validatePhoneNumber, validateText } from '/utils/input-validation';
import Input from '../../ui/forms/Input';
import Button from '../../ui/Button';
import SignupForm from './SignupForm';
import classes from './SignupForm.module.css';

const validations = [
  { id: "firstName", method: ({firstName}) => validateText(firstName, 1, 50) },
  { id: "lastName", method: ({lastName}) => validateText(lastName, 1, 100) },
  { id: "phoneNumber", method: ({phoneNumber}) => validatePhoneNumber(phoneNumber) }
];

export default function SignupFormInformation({ onClickContinue, onClickBack, onDataChange, signupData }) {

  const initialFormState = { 
    firstName: signupData.firstName ? signupData.firstName : "",
    lastName: signupData.lastName ? signupData.lastName : "",
    phoneNumber: signupData.phoneNumber ? signupData.phoneNumber : ""
  };
  const { input, isValid, errors, touched, changeHandler, blurHandler } = useForm(initialFormState, validations);

  const continueSignupHandler = event => {
    event.preventDefault();
    if (isValid) {
      onClickContinue();
      onDataChange(input);
    }
  };

  const previousSignupHandler = event => {
    event.preventDefault();
    onDataChange(input);
    onClickBack();
  };

  const firstNameError = touched.firstName && errors.firstName ? errors.firstName : "";
  const lastNameError = touched.lastName && errors.lastName ? errors.lastName : "";
  const phoneNumberError = touched.phoneNumber && errors.phoneNumber ? errors.phoneNumber : "";

  return (
    <SignupForm title="Opret en ny bruger" description="Step 2 - Grundlæggende oplysninger">
      <div className={classes.inputs}>
        <Input id="firstName" type="text" label="Fornavn" value={input.firstName} onChange={changeHandler} onBlur={blurHandler} error={firstNameError}/>
        <Input id="lastName" type="text" label="Efternavn" value={input.lastName} onChange={changeHandler} onBlur={blurHandler} error={lastNameError}/>
        <Input id="phoneNumber" type="tel" label="Telefon" value={input.phoneNumber} onChange={changeHandler} onBlur={blurHandler} error={phoneNumberError}/>
      </div>
      <div className={classes.actions}>
        <Button disabled={!isValid} onClick={continueSignupHandler}>Fortsæt</Button>
        <Button onClick={previousSignupHandler}>Gå tilbage</Button>
      </div>
    </SignupForm>
  );
}