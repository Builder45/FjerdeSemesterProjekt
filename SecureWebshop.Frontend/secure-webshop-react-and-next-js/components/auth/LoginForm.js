import { signIn } from 'next-auth/react';
import { useState } from 'react';
import useForm from '../../hooks/useForm';
import useModal from '../../hooks/useModal';
import { validateEmail, validateText } from '../../utils/input-validation';
import Button from '../ui/Button';
import Input from '../ui/forms/Input';
import LinkText from '../ui/LinkText';
import LoadingSpinner from '../ui/LoadingSpinner';
import Modal from '../ui/modal/Modal';
import classes from './LoginForm.module.css';

function LoginForm() {
  const [ isProcessing, setIsProcessing ] = useState(false);
  const { modalIsVisible, toggleModal, modalHandler } = useModal();

  const initialFormState = { email: "" , password: "" };
  const validations = [
    { id: "email", method: ({email}) => validateEmail(email) },
    { id: "password", method: ({password}) => validateText(password, 1, 100) }
  ];

  const { input, isValid, errors, touched, changeHandler, blurHandler } = useForm(initialFormState, validations);

  if (isProcessing) return <LoadingSpinner/>

  const loginHandler = async event => {
    event.preventDefault();

    if (isValid) {
      setIsProcessing(true);
      const result = await signIn('credentials', {
        redirect: false,
        email: input.email, 
        password: input.password
      });

      if (result.error) {
        setIsProcessing(false);
        toggleModal();
      }
    }
  };

  const emailError = touched.email && errors.email ? errors.email : "";
  const passwordError = touched.password && errors.password ? errors.password : "";

  return (
    <section className={classes.auth}>
      <h1>Login</h1>
      <form onSubmit={loginHandler}>
        <div className={classes.inputs}>
          <Input id="email" type="email" label="Email" value={input.email} onChange={changeHandler} onBlur={blurHandler} error={emailError}/>
          <Input id="password" type="password" label="Password" value={input.password} onChange={changeHandler} onBlur={blurHandler} error={passwordError}/>
        </div>
        <div className={classes.actions}>
          <Button disabled={!isValid}>Login</Button>
          <LinkText href='/user/signup' text='Vil du oprette en ny bruger?'/>
        </div>
      </form>
      <Modal visible={modalIsVisible} btnText={"Prøv igen"} onClick={modalHandler}>Den indtastede email eller password er ikke gyldig!</Modal>
    </section>
  );
}

export default LoginForm;