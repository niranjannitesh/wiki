import Head from 'next/head'

import '../styles/globals.css'
import Layout from '../components/Layout'

function WikikiApp({ Component, pageProps }) {
  return <>
    <Head>
      <title>Wikiki</title>
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <link rel="icon" href="/favicon.png" type="image/png" />
    </Head>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </>
}

export default WikikiApp
