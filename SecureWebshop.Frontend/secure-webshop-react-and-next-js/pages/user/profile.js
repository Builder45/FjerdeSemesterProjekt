import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";

function UserProfilePage({ session, token }) {
  console.log(token);
  return <div>{session.userId}</div>;
}

export async function getServerSideProps(context) {
  const session = await getSession({req: context.req});
  const token = await getToken( {req: context.req} );

  // Hvis brugeren ikke er authenticated
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  return {
    props: {
      session,
      token
    }
  }
}

export default UserProfilePage;