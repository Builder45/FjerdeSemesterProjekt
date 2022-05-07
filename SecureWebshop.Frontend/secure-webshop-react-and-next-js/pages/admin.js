import Loading from "../components/ui/Loading";
import { createRequiredAuth } from "../utils/ssr";

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
function AdminPage() {
  return (
    <p>Secret admin page!</p>
  )
}

export default AdminPage;