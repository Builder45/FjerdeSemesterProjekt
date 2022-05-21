import ProductDetails from "../../../components/products/product-page/ProductDetails";
import Card from "../../../components/ui/containers/Card";
import { getProduct } from "../../../utils/api-service";
import { createRequiredAuth } from "../../../utils/ssr";

/* 
  Server-side kode
*/
export async function getServerSideProps({ query, req }) {

  const ssr = await createRequiredAuth({ allowedRoles: ["Admin"] })({ req });
  if (ssr.redirect) return ssr;

  let product = null;
  try {
    const response = await getProduct(query.productId);
    if (response.data) {
      product = response.data;
    }
  }
  catch {}

  ssr.props.product = product;
  return ssr;

}

/* 
  Client-side kode
*/
export default function AdminEditProductPage({ product }) {
  return (
    <>
      <Card></Card>
      <Card>
        <p>Eksempelvisning</p>
        <ProductDetails product={product}/>
      </Card>
      
    </>
  )
}