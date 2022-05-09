import classes from './Input.module.css';

export default function Input({ onChange, onBlur, label = "", id = "", type = "text", value, error }) {

  return (
    <div className={`${classes.control} ${error && classes.error}`}>
      <label htmlFor={id}>{label}</label>
      <input onChange={onChange} onBlur={onBlur} type={type} id={id} value={value} />
      {error && <p>{error}</p>}
    </div>
  );
}