import axios from 'axios';
import { useState } from 'react';
import useForm from '../../../hooks/useForm';
import useModal from '../../../hooks/useModal';
import { validateEmail } from '../../../utils/input-validation';
import Button from '../../ui/Button';
import Input from '../../ui/forms/Input';
import LinkText from '../../ui/LinkText';
import LoadingSpinner from '../../ui/LoadingSpinner';
import Modal from '../../ui/modal/Modal';
import SignupForm from './SignupForm';
import classes from './SignupForm.module.css';

export default function SignupFormEmail({ onClickContinue, signupData, onDataChange }) {
  const [ isProcessing, setIsProcessing ] = useState(false);
  const { modalIsVisible, toggleModal, modalHandler } = useModal();

  const initialFormState = { email: signupData.email ? signupData.email : "" };
  const validations = [
    { id: "email", method: ({email}) => validateEmail(email) }
  ];

  const { input, isValid, errors, touched, changeHandler, blurHandler } = useForm(initialFormState, validations);

  if (isProcessing) return <LoadingSpinner/>;

  const continueSignupHandler = async event => {
    event.preventDefault();
    if (isValid) {
      // Http request (email exist?)
      setIsProcessing(true);
      const { data } = await axios.get('http://localhost:5117/api/' + 'Auth/EmailExists/' + input.email);
      if (!data || data.emailExists) {
        setIsProcessing(false);
        toggleModal();
      }
      else {
        onClickContinue();
        onDataChange(input);
      }
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
          <LinkText href='/login' text='Har du allerede en bruger?'/>
        </div>
      </SignupForm>
      <Modal visible={modalIsVisible} btnText={"Prøv igen"} onClick={modalHandler}>Der eksisterer allerede en bruger med denne email!</Modal>
    </>
  );
}