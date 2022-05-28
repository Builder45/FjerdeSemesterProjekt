import AdminMenu from "../../components/admin/AdminMenu";
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
export default function AdminIndexPage() {
  return (
    <AdminMenu />
  )
}