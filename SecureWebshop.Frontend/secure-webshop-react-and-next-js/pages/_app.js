import { SessionProvider, useSession } from 'next-auth/react';

import Layout from '../components/layout/Layout';
import '../styles/globals.css'

export default function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

// function Auth({ authOptions, children }) {
//   const { data: session, status } = useSession();
//   const sessionFound = !!session;
//   const router = useRouter();

//   useEffect(() => {
//     if (status === 'loading') return;
//     if (!sessionFound) {
//       router.push('/login');
//     }
//   }, [status, sessionFound]);

//   if (sessionFound) {
//     if (session.user.role === authOptions.role) {
//       return children;
//     }
//     else {
//       router.push('/unauthorized');
//     }
//   }

//   // Session bliver hentet ned / Ingen bruger fundet endnu
//   return <Loading />
// }