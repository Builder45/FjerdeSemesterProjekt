import ProductsTable from "../../../components/admin/products/ProductsTable";
import Card from "../../../components/ui/containers/Card";
import { getProducts } from "../../../utils/api-service";
import { createRequiredAuth } from "../../../utils/ssr";

/* 
  Server-side kode
*/
export async function getServerSideProps(context) {

  const ssr = await createRequiredAuth({ allowedRoles: ["Admin"] })({ req: context.req });
  if (ssr.redirect) return ssr;

  let products = [];
  try {
    const response = await getProducts();
    if (response.data) {
      products = response.data;
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