import { SessionProvider, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Children } from 'react';

import Layout from '../components/layout/Layout';
import Loading from '../components/ui/Loading';
import '../styles/globals.css'

export default function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        {Component.authOptions 
          ? <Auth authOptions={Component.authOptions}><Component {...pageProps} /></Auth>
          : <Component {...pageProps} />
        }
      </Layout>
    </SessionProvider>
  );
}

function Auth({ authOptions, children }) {
  const { data: session, status } = useSession();
  const sessionFound = !!session;
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    if (!sessionFound) {
      router.push('/login');
    }
  }, [status, sessionFound]);

  if (sessionFound) {
    if (session.user.role === authOptions.role) {
      return children;
    }
    else {
      router.push('/unauthorized');
    }
  }

  // Session bliver hentet ned / Ingen bruger fundet endnu
  return <Loading />
}