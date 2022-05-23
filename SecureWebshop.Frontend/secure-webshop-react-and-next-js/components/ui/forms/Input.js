import classes from './Input.module.css';

export default function Input({ onChange, onBlur, label = "", id = "", type = "text", value, error, disabled = false }) {

  let inputElement = <input disabled={disabled} onChange={onChange} onBlur={onBlur} type={type} id={id} value={value} />;

  if (type === "textarea") {
    inputElement = <textarea onChange={onChange} onBlur={onBlur} type={type} id={id} value={value} />
  }

  return (
    <div className={`${classes.control} ${error && classes.error}`}>
      <label htmlFor={id}>{label}</label>
      {inputElement}
      {error && <p>{error}</p>}
    </div>
  );
}