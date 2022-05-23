import { useState } from "react";
import ProductList from "/components/products/product-list/ProductList";
import LoadingSpinner from "/components/ui/LoadingSpinner";
import { getProducts, getProductsByQuery } from "/utils/api-service";

/* 
  Server-side kode
*/
export async function getServerSideProps({ query }) {
  let initProducts = [];
  try {
    if (query.search) {
      const response = await getProductsByQuery({ search: query.search });
      if (response.data) {
        initProducts = response.data;
      }
    }
    else {
      const response = await getProducts();
      if (response.data) {
        initProducts = response.data;
      }
    }
  }
  catch {}

  return {
    props: {
      initProducts,
      query
    }
  }
}

/* 
  Client-side kode
*/
export default function HomePage({ initProducts, query }) {
  const [ products, setProducts ] = useState(initProducts);

  if (products === null) return <p className="center">Kunne ikke hente produkter ned...</p>
  if (products.length === 0 && query?.search) return <p className="center">Søgningen gav ingen resultater.</p>
  if (products.length === 0) return <LoadingSpinner />

  return (
    <section>
      <ProductList products={products}/>
    </section>
  )
}