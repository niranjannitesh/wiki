import Head from "next/head"

import "../styles/globals.css"
import "../styles/markdown.css"
import Layout from "../components/common/Layout"

function WikikiApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Wikiki</title>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css"
        />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default WikikiApp
