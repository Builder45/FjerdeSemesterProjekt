import ProductList from "/components/products/product-list/ProductList";
import { getProducts, getProductsByQuery } from "/utils/api-service";

/* 
  Server-side kode
*/
export async function getServerSideProps({ query }) {
  let products = [];
  try {
    if (query.search) {
      const response = await getProductsByQuery({ search: query.search });
      if (response.data) {
        products = response.data;
      }
    }
    else {
      const response = await getProducts();
      if (response.data) {
        products = response.data;
      }
    }
  }
  catch {}

  return {
    props: { products, query }
  };
}

/* 
  Client-side kode
*/
export default function HomePage({ products, query }) {
  return (
    <ProductList products={products} query={query}/>
  );
}