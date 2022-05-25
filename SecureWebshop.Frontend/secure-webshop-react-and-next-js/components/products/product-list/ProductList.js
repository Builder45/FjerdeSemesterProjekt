import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../../store';
import classes from './ProductList.module.css';
import ProductListItem from './ProductListItem';

export default function ProductList({ products = [], query }) {

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

  let noProductsMessage;
  if (products.length === 0) {
    noProductsMessage = query?.search
    ? "Søgningen gav ingen resultater"
    : "Fejl: der blev ikke hentet nogen produkter ned"
  }

  return (
    <section className={classes.outerContainer}>
      {noProductsMessage && <h2 className={classes.noProducts}>{noProductsMessage}</h2>}
      <div className={classes.gridContainer}>
        {mappedProducts}
      </div>
    </section>
  );
}