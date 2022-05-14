import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useModal from '../../../hooks/useModal';
import { cartActions } from '../../../store';
import { getProduct } from '../../../utils/api-service';
import Modal from '../../ui/modal/Modal';
import classes from './ProductList.module.css';
import ProductListItem from './ProductListItem';
import ProductListItemDetails from './ProductListItemDetails';

export default function ProductList({ products = [] }) {

  const dispatch = useDispatch();
  const { modalIsVisible, toggleModal, modalHandler } = useModal();
  const [ selectedProductId, setSelectedProductId ] = useState(null);
  const [ product, setProduct ] = useState(null);

  const showDetailsHandler = id => {
    setSelectedProductId(id);
    toggleModal();
  }

  const addToCartHandler = product => {
    dispatch(cartActions.addItem({
      id: product.id,
      name: product.name,
      price: product.price
    }));
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
    product => 
      <ProductListItem 
        key={product.id} 
        product={product} 
        onShowDetails={showDetailsHandler.bind(this, product.id)} 
        onAddToCart={addToCartHandler.bind(this, product)}
      />
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