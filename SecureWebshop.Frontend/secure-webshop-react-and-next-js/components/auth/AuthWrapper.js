import { getToken } from "next-auth/jwt";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

function AuthWrapper({ authOptions, children }) {
  const { data: session, status } = useSession();
  const sessionFound = !!session;
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    if (!sessionFound) {
      router.push('/login');
    }
  }, [status, sessionFound]);

  if (sessionFound && authOptions.role) {
    if (session.user.role === authOptions.role) {
      return children;
    }
    else {
      router.push('/unauthorized');
    }
  }

  if (sessionFound) {
    return children;
  }

  // Session bliver hentet ned / Ingen bruger fundet endnu
  return authOptions.loading ? authOptions.loading : <div>Loading...</div>
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  
  // Hvis brugeren ikke er authenticated
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  const token = await getToken({ req: context.req });

  return {
    props: { session, userRole: token.role ? token.role : 'User' }
  }
}

export default AuthWrapper;