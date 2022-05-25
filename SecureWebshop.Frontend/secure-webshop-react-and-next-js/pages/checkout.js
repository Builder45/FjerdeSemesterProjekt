import Checkout from "../components/checkout/Checkout";
import Card from "../components/ui/containers/Card";
import { getUserProfile } from "../utils/api-service";
import { createRequiredAuth } from "../utils/ssr";

/* 
  Server-side kode
*/
export async function getServerSideProps(context) {

  const ssr = await createRequiredAuth({ allowedRoles: ["User", "Admin"] })({ req: context.req });
  if (!ssr.props) return ssr;

  try {
    const response = await getUserProfile(ssr.props.user.accessToken);
    ssr.props.userData = response.data;
  }
  catch (error) {
    return { 
      redirect: { destination: '/server-fejl', permanent: false } 
    };
  }

  return ssr;
}

/* 
  Client-side kode
*/
export default function UserUpdateAddressesPage({ userData }) {
  return (
    <Checkout userData={userData} />
  );
}