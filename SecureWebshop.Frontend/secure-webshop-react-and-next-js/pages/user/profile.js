import axios from "axios";
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
  ssr.props.initialData = response.data;

  return ssr;

}

/* 
  Client-side kode
*/
function UserProfilePage({ initialData }) {
  return <div><p>Welcome {initialData.firstName + " " + initialData.lastName}!</p></div>;
}

export default UserProfilePage;