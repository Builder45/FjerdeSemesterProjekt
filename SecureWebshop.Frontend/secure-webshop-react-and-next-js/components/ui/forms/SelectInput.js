import classes from './Input.module.css';

export default function SelectInput({ children, onChange, onBlur, label = "", id = "", value, error, disabled = false }) {

  return (
    <div className={`${classes.control} ${error && classes.error}`}>
      <label htmlFor={id}>{label}</label>
      <select disabled={disabled} onChange={onChange} onBlur={onBlur} id={id} value={value} >
        {children}
      </select>
      {error && <p>{error}</p>}
    </div>
  );
}