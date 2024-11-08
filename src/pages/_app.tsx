import '@/styles/globals.css';
import { AppProps } from 'next/app';
import styled from 'styled-components';
import { Roboto } from 'next/font/google';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Routes } from '@/constants';
import { AuthContextProvider } from '@/hooks';

const roboto = Roboto({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
});

const Container = styled.div`
  display: flex;
`;

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === '/_error') router.push(Routes.Login);
  }, [router]);

  return (
    <main className={roboto.className}>
      <Head>
        <title>Inn - Hospedagens</title>
      </Head>
      <Container>
        <AuthContextProvider>
          <Component {...pageProps} />
        </AuthContextProvider>
      </Container>
    </main>
  );
}
