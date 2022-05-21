import axios from "axios";
import UpdateUserInfoForm from "../../components/user/UpdateUserInfoForm";
import { createRequiredAuth } from "../../utils/ssr";

/* 
  Server-side kode
*/
export async function getServerSideProps(context) {

  const ssr = await createRequiredAuth({ allowedRoles: ["User", "Admin"] })({ req: context.req });
  if (!ssr.props) return ssr;

  const response = await axios.get('http://localhost:5117/api/' + 'Users/GetProfile', {
    headers: {
      'Authorization': `Bearer ${ssr.props.user.accessToken}`
    }
  });
  ssr.props.userData = response.data;

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