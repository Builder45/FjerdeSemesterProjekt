import { getUserProfile } from "/utils/api-service";
import UpdateUserInfoForm from "/components/user/UpdateUserInfoForm";
import { createRequiredAuth } from "/utils/ssr";

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
export default function UserUpdateInformationPage({ userData }) {
  return (
    <UpdateUserInfoForm initialData={userData} />
  );
}