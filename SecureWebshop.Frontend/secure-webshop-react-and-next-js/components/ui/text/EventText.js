import classes from './LinkText.module.css';

export default function EventText({ onClick, text = "text prop missing!" }) {
  return (
    <a onClick={onClick} className={classes.link}>{text}</a>
  );
}