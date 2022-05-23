import { useState } from 'react';
import { useDispatch } from 'react-redux';
import useForm from '../../../hooks/useForm';
import { uiActions } from '../../../store';
import { emailExists } from '../../../utils/api-service';
import { validateEmail } from '../../../utils/input-validation';
import Button from '../../ui/Button';
import Input from '../../ui/forms/Input';
import LinkText from '../../ui/LinkText';
import LoadingSpinner from '../../ui/LoadingSpinner';
import SignupForm from './SignupForm';
import classes from './SignupForm.module.css';

export default function SignupFormEmail({ onClickContinue, signupData, onDataChange }) {
  const [ isProcessing, setIsProcessing ] = useState(false);
  const dispatch = useDispatch();

  const initialFormState = { email: signupData.email ? signupData.email : "" };
  const validations = [
    { id: "email", method: ({email}) => validateEmail(email) }
  ];

  const { input, isValid, errors, touched, changeHandler, blurHandler } = useForm(initialFormState, validations);

  if (isProcessing) return <LoadingSpinner/>;

  const continueSignupHandler = async event => {
    event.preventDefault();
    if (isValid) {
      setIsProcessing(true);

      try {
        const { data } = await emailExists(input.email);

        if (!data || data.emailExists) {
          setIsProcessing(false);
          dispatch(uiActions.setNotification("Der eksisterer allerede en bruger med denne email!"));
        }
        else {
          onClickContinue();
          onDataChange(input);
        }
      }
      catch {}
    }
  };

  const emailError = touched.email && errors.email ? errors.email : "";

  return (
    <>
      <SignupForm title="Opret en ny bruger" description="Step 1 - Vælg en email">
        <div className={classes.inputs}>
          <Input id="email" type="email" label="Email" value={input.email} onChange={changeHandler} onBlur={blurHandler} error={emailError}/>
        </div>
        <div className={classes.actions}>
          <Button disabled={!isValid} onClick={continueSignupHandler}>Fortsæt</Button>
          <LinkText href='/auth/login' text='Har du allerede en bruger?'/>
        </div>
      </SignupForm>
    </>
  );
}