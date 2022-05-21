import { SessionProvider } from 'next-auth/react';
import store from '../store/index';

import Layout from '../components/layout/Layout';
import '../styles/globals.css'

import { Provider } from 'react-redux';
import { useRouter } from 'next/router';

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <Layout>
          <Component key={router.asPath} {...pageProps} />
        </Layout>
      </Provider>
    </SessionProvider>
  );
}