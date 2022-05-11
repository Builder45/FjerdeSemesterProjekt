import useModal from '../../../hooks/useModal';
import Modal from '../../ui/modal/Modal';
import classes from './ProductList.module.css';
import ProductListItem from './ProductListItem';

export default function ProductList({ products = [] }) {

  const { modalIsVisible, toggleModal, modalHandler } = useModal();

  const showDetailsHandler = id => {
    console.log(id);
    toggleModal();
  }

  const mappedProducts = products.map(
    product => <ProductListItem key={product.id} product={product} onShowDetails={showDetailsHandler.bind(this, product.id)}/>
  );
  return (
    <>
      <section className={classes.outerContainer}>
        <div className={classes.gridContainer}>
          {products && mappedProducts}
          {products.length === 0 && <p>Ingen produkter</p>}
        </div>
      </section>
      <Modal visible={modalIsVisible} onClick={modalHandler}>Test</Modal>
    </>
  );
}