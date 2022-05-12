import { useState, useEffect } from 'react';
import useModal from '../../../hooks/useModal';
import { getProduct } from '../../../utils/api-service';
import Modal from '../../ui/modal/Modal';
import classes from './ProductList.module.css';
import ProductListItem from './ProductListItem';
import ProductListItemDetails from './ProductListItemDetails';

export default function ProductList({ products = [] }) {

  const { modalIsVisible, toggleModal, modalHandler } = useModal();
  const [ selectedProductId, setSelectedProductId ] = useState(null);
  const [ product, setProduct ] = useState(null);

  const showDetailsHandler = id => {
    setSelectedProductId(id);
    toggleModal();
  }

  useEffect(() => {
    if (selectedProductId !== null) {
      getProduct(selectedProductId)
        .then(response => {
          setProduct(response.data);
        })
        .catch(error => {
          setProduct(null);
        });
    }
  }, [selectedProductId]);

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
      <Modal className={classes.modal} visible={modalIsVisible} onClick={modalHandler}>
        {product ? <ProductListItemDetails product={product} /> : "Fejl. Kunne ikke hente produkt."}
      </Modal>
    </>
  );
}