import { SessionProvider } from 'next-auth/react';
import { useState } from 'react';
import RefreshTokenHandler from '../components/RefreshTokenHandler';

import Layout from '../components/layout/Layout';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const [ interval, setInterval ] = useState(0);

  return (
    <SessionProvider session={pageProps.session} refetchInterval={interval}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <RefreshTokenHandler setInterval={setInterval} />
    </SessionProvider>
  );
}

export default MyApp
