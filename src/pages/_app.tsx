import type { AppProps } from 'next/app';
import { AppProvider } from '@/context/AppContext';
import '@/styles/globals.css';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>IdeaDepth - Decision Analysis Web App</title>
        <meta name="description" content="Before you make a big decision—think deeper. Get structured reasoning for career, startup, education, and life choices." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Head>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </>
  );
}
