import { createRequiredAuth } from "/utils/ssr";

/* 
  Server-side kode
*/
export async function getServerSideProps(context) {

  const ssr = await createRequiredAuth({ allowedRoles: ["Admin"] })({ req: context.req });
  return ssr;

}

/* 
  Client-side kode
*/
export default function AdminNewProductPage() {
  return (
    <p>Opret nyt produkt!</p>
  )
}