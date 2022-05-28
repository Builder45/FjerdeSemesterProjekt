import Payment from "/components/checkout/Payment";
import { createRequiredAuth } from "/utils/ssr";

/* 
  Server-side kode
*/
export async function getServerSideProps(context) {

  const ssr = await createRequiredAuth({ allowedRoles: ["User", "Admin"], callback: 'checkout' })({ req: context.req });
  if (!ssr.props) return ssr;


  if (context.query.orderId) {
    ssr.props.orderId = context.query.orderId;
  }
  else {
    return { 
      redirect: { destination: '/server-fejl', permanent: false } 
    };
  }

  return ssr;
}

/* 
  Client-side kode
*/
export default function CheckoutPage({ orderId }) {
  return (
    <Payment orderId={orderId} />
  );
}