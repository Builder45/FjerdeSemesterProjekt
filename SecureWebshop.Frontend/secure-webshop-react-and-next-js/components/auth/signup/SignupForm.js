import classes from './SignupForm.module.css';

export default function SignupForm({ children, title, description }) {
  return (
    <section className={classes.auth}>
      <h1>{title}</h1>
      <p>{description}</p>
      <form>
        {children}
      </form>
    </section>
  );
}