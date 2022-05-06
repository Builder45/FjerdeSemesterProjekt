import { signIn } from 'next-auth/react';
import { useRef } from 'react';
import classes from './LoginForm.module.css';

function LoginForm() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const loginHandler = async event => {
    event.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    // validation

    const result = await signIn('credentials', {
      redirect: false,
      email: enteredEmail, 
      password: enteredPassword
    });

    console.log(result);
  };
  return (
    <section className={classes.auth}>
      <h1>Login</h1>
      <form onSubmit={loginHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' ref={emailRef} required />
        </div>
        <div className={classes.control}>
        <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' ref={passwordRef} required />
        </div>
        <div className={classes.actions}>
          <button>Login</button>
        </div>
      </form>
    </section>
  );
}

export default LoginForm;