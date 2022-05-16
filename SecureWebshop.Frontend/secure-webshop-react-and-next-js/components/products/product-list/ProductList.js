import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../../store';
import classes from './ProductList.module.css';
import ProductListItem from './ProductListItem';

export default function ProductList({ products = [] }) {

  const router = useRouter();
  const dispatch = useDispatch();

  const showDetailsHandler = id => {
    router.push(`/produkt/${id}`);
  }

  const addToCartHandler = product => {
    dispatch(cartActions.addItem({
      id: product.id,
      name: product.name,
      price: product.price
    }));
  }

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
    <section className={classes.outerContainer}>
      <div className={classes.gridContainer}>
        {products && mappedProducts}
        {products.length === 0 && <p>Ingen produkter</p>}
      </div>
    </section>
  );
}