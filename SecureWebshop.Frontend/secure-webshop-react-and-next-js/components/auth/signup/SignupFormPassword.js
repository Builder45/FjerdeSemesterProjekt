import Input from '../../ui/forms/Input';
import Button from '../../ui/Button';
import SignupForm from './SignupForm';
import classes from './SignupForm.module.css';
import { validatePassword, validatePasswordMatch } from '../../../utils/input-validation';
import useForm from '../../../hooks/useForm';
import useModal from '../../../hooks/useModal';
import Modal from '../../ui/modal/Modal';
import PasswordInfoModal from './PasswordInfoModal';

export default function SignupFormInformation({ onClickBack, onDataChange, onClickFinish }) {

  const { modalIsVisible, modalHandler, toggleModal } = useModal();

  const initialFormState = { password: "", repeatPassword: "" };
  const validations = [
    { id: "password", method: ({password}) => validatePassword(password) },
    { id: "repeatPassword", method: ({password, repeatPassword}) => validatePasswordMatch(password, repeatPassword) }
  ];
  const { input, isValid, errors, touched, changeHandler, blurHandler } = useForm(initialFormState, validations);

  const previousSignupHandler = event => {
    event.preventDefault();
    onClickBack();
  };

  const finishSignupHandler = event => {
    event.preventDefault();

    if (isValid) {
      onDataChange(input);
      onClickFinish();
    }
  }

  const passwordError = touched.password && errors.password ? errors.password : "";
  const repeatPasswordError = touched.repeatPassword && errors.repeatPassword ? errors.repeatPassword : "";

  return (
    <>
      <SignupForm title="Opret en ny bruger" description="Step 3 - Vælg et password">
        <p onClick={toggleModal} className={classes.passwordHelp}>Læs mere om krav til passwords</p>
        <div className={classes.inputs}>
          <Input id="password" type="password" label="Password" value={input.password} 
            onChange={changeHandler} onBlur={blurHandler} error={passwordError}
          />
          <Input id="repeatPassword" type="password" label="Gentag password" value={input.repeatPassword} 
            onChange={changeHandler} onBlur={blurHandler} error={repeatPasswordError}
          />
        </div>
        <div className={classes.actions}>
          <Button onClick={finishSignupHandler}>Opret ny bruger</Button>
          <Button onClick={previousSignupHandler}>Gå tilbage</Button>
        </div>
      </SignupForm>
      <PasswordInfoModal visible={modalIsVisible} onClick={modalHandler} btnText={"Forstået!"}/>
    </>
  );
}