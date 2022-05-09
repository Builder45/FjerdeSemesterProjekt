import Input from '../../ui/forms/Input';
import SignupForm from './SignupForm';
import classes from './SignupForm.module.css';

export default function SignupFormInformation({ onClickBack }) {
  const previousSignupHandler = event => {
    event.preventDefault();

    // Validation

    onClickBack();
  };
  return (
    <SignupForm title="Opret en ny bruger" description="Step 3 - Vælg et password">
      <div className={classes.inputs}>
        <Input id="password" type="password" label="Password"/>
        <Input id="repeatPassword" type="password" label="Gentag password"/>
      </div>
      <div className={classes.actions}>
        <button>Opret ny bruger</button>
        <button onClick={previousSignupHandler}>Gå tilbage</button>
      </div>
    </SignupForm>
  );
}