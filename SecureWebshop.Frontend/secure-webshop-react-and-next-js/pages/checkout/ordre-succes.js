import CheckoutStatus from "/components/checkout/CheckoutStatus";
import { createRequiredAuth } from "/utils/ssr";

/* 
  Server-side kode
*/
export async function getServerSideProps(context) {

  const ssr = await createRequiredAuth({ allowedRoles: ["User", "Admin"], callback: 'checkout' })({ req: context.req });
  return ssr;

}

/* 
  Client-side kode
*/
export default function CheckoutOrderSuccessPage() {
  return (
    <CheckoutStatus success={true} />
  );
}