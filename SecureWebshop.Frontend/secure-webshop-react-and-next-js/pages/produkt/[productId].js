import Product from "/components/products/product-page/Product";
import { getProduct } from "/utils/api-service";

/* 
  Server-side kode
*/
export async function getServerSideProps({ query }) {
  try {
    const response = await getProduct(query.productId);
    if (response.data.product !== null) {
      return {
        props: {
          product: response.data.product
        }
      };
    }
  }
  catch {}

  return {
    redirect: {
      destination: '/',
      permanent: false
    }
  }
}

/* 
  Client-side kode
*/
export default function ProductPage({ product }) {
  return (
    <Product product={product} />
  );
}