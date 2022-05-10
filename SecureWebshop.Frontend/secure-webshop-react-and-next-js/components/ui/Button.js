import classes from './Button.module.css';

export default function Button({ children, onClick, className, disabled = false }) {

  const buttonClasses = `${classes.button} ${className}`;
  
  return (
    <button disabled={disabled} className={buttonClasses} onClick={onClick}>
      {children}
    </button>
  );
}