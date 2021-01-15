import '../styles/globals.css'
import Head from 'next/head'
import styled from 'styled-components'

function WikikiApp({ Component, pageProps }) {
  return <>
    <Head>
      <title>Wikiki</title>
    </Head>
    <AppWrapper>
      <Component {...pageProps} />
    </AppWrapper>
  </>
}

export default WikikiApp

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`
