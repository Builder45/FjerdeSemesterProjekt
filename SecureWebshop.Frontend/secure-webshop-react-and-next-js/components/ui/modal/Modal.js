import Button from '../Button';
import ReactPortal from '../portal/ReactPortal';
import Backdrop from './Backdrop';
import classes from './Modal.module.css';

export default function Modal({ children, visible, btnText, onClick }) {

  const dynamicStyle = {
    transform: visible ? 'translateY(0)' : 'translateY(-100vh)',
    opacity: visible ? 1 : 0
  };

  return (
    <ReactPortal destinationId={"__next"}>
      <Backdrop visible={visible} onClick={onClick}/>
      <div className={classes.modal} style={dynamicStyle}>
        {children}
        <Button className={classes.modalButton} onClick={onClick}>{btnText}</Button>
      </div>
    </ReactPortal>
  );
}