import { createRequiredAuth } from "/utils/ssr";
import UpdateUserPasswordForm from "/components/user/UpdateUserPasswordForm";

/* 
  Server-side kode
*/
export async function getServerSideProps(context) {
  const ssr = await createRequiredAuth({ allowedRoles: ["User", "Admin"] })({ req: context.req });
  return ssr;
}

/* 
  Client-side kode
*/
export default function UserUpdatePasswordPage() {
  return (
    <UpdateUserPasswordForm />
  );
}