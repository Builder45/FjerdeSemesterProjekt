import UserAddresses from "/components/user/UserAddresses";
import UserAddressForm from "/components/user/UserAddressForm";
import { getUserProfile } from "/utils/api-service";
import { createRequiredAuth } from "/utils/ssr";

/* 
  Server-side kode
*/
export async function getServerSideProps(context) {

  const ssr = await createRequiredAuth({ allowedRoles: ["User", "Admin"] })({ req: context.req });
  if (!ssr.props) return ssr;

  try {
    const response = await getUserProfile(ssr.props.user.accessToken);
    ssr.props.addresses = response.data.addresses;
  }
  catch (error) {
    console.log(error);
    return { 
      redirect: { destination: '/server-fejl', permanent: false } 
    };
  }

  return ssr;
}

/* 
  Client-side kode
*/
export default function UserUpdateAddressesPage({ addresses }) {

  //addresses = [{title:"Test",street:"Jordbærvej 12",postalCode:8732}];

  return (
    <>
      <UserAddresses addresses={addresses} />
      <UserAddressForm addresses={addresses}/>
    </>
  );
}