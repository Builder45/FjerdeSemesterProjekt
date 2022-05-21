import Modal from '../../ui/modal/Modal';
import classes from './PasswordInfoModal.module.css';

export default function PasswordInfoModal({ visible, onClick, btnText }) {
  return (
    <Modal visible={visible} onClick={onClick} btnText={btnText}>
      <h3>Passwords skal være mindst 10 tegn lange.</h3>
      <p>Du skal bruge mindst tre ting fra listen:</p>
      <div className={classes.list}>
        <p>Store bogstaver</p>
        <p>Små bogstaver</p>
        <p>Specielle tegn</p>
        <p>Tal</p>
      </div>
    </Modal>
  );
}