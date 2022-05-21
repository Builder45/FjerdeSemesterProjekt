import axios from "axios";
import Card from "../../components/ui/containers/Card";
import LinkText from "../../components/ui/LinkText";
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
export default function UserProfilePage({ userData }) {
  return (
    <Card>
      <h1>{userData.firstName} {userData.lastName}</h1><br/>
      <div>
        <LinkText href="/bruger/rediger-oplysninger" text="Redigér mine oplysninger"/><br/>
        <LinkText href="/bruger/skift-password" text="Skift mit password"/><br/>
        <LinkText href="/bruger/adresser" text="Mine adresser"/>
      </div>
    </Card>
  );
}