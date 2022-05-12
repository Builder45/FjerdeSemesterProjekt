import { getProduct } from "../../utils/api-service";

/* 
  Server-side kode
*/
export async function getServerSideProps({ query }) {
  let product = null;
  try {
    const response = await getProduct(query.productId);
    if (response.data) {
      product = response.data;
    }
  }
  catch {}

  return {
    props: {
      product
    }
  }
}

/* 
  Client-side kode
*/
export default function ProductPage({ product }) {

  if (!product) {
    return <p>Der opstod en fejl...</p>
  }

  return (
    <div>
      <p>{product.name}</p>
      <p>{product.description}</p>
      <p>{product.price}</p>
    </div>
  );
}