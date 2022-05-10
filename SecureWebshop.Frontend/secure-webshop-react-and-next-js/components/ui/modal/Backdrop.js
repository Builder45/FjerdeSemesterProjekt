import classes from './Modal.module.css';

export default function Backdrop({ visible, onClick }) {
  if (visible) {
    return <div onClick={onClick} className={classes.backdrop}></div>
  }
  return null;
}