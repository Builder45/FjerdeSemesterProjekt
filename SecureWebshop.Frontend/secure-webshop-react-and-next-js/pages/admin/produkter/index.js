import { getProductsFull } from "/utils/api-service";
import ProductsTable from "/components/admin/products/ProductsTable";
import Card from "/components/ui/containers/Card";
import { createRequiredAuth } from "/utils/ssr";

/* 
  Server-side kode
*/
export async function getServerSideProps(context) {

  const ssr = await createRequiredAuth({ allowedRoles: ["Admin"] })({ req: context.req });
  if (ssr.redirect) return ssr;

  let products = [];
  try {
    const response = await getProductsFull(ssr.props.user.accessToken);
    if (response.data) {
      products = response.data.products;
    }
  }
  catch {}

  ssr.props.products = products;
  return ssr;
}

/* 
  Client-side kode
*/
export default function AdminProductsPage({ products = [] }) {
  return (
    <Card>
      <ProductsTable products={products} />
    </Card>
  );
}