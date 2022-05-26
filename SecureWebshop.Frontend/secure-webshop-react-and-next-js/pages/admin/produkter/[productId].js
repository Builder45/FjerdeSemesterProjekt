import ProductEditor from "../../../components/admin/products/ProductEditor";
import ProductForm from "../../../components/admin/products/ProductForm";
import ProductDetails from "/components/products/product-page/ProductDetails";
import Card from "/components/ui/containers/Card";
import { getProduct } from "/utils/api-service";
import { createRequiredAuth } from "/utils/ssr";

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
      product = response.data.product;
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
    <ProductEditor product={product} />
  )
}