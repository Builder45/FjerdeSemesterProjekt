import useForm from '../../../hooks/useForm';
import { validateEmail } from '../../../utils/input-validation';
import Input from '../../ui/forms/Input';
import SignupForm from './SignupForm';
import classes from './SignupForm.module.css';

export default function SignupFormEmail({ onClickContinue, signupData, onDataChange }) {
  const initialFormState = { 
    email: signupData.email ? signupData.email : "" 
  };
  const validations = [
    { id: "email", method: ({email}) => validateEmail(email) }
  ];
  const { input, isValid, errors, touched, changeHandler, blurHandler } = useForm(initialFormState, validations);

  const continueSignupHandler = event => {
    event.preventDefault();
    if (isValid) {
      onClickContinue();
      onDataChange(input);
    }
  };

  const emailError = touched.email && errors.email ? errors.email : "";

  return (
    <SignupForm title="Opret en ny bruger" description="Step 1 - Vælg en email">
      <div className={classes.inputs}>
        <Input id="email" type="email" label="Email" value={input.email} onChange={changeHandler} onBlur={blurHandler} error={emailError}/>
      </div>
      <div className={classes.actions}>
        <button disabled={!isValid} onClick={continueSignupHandler}>Fortsæt</button>
      </div>
    </SignupForm>
  );
}