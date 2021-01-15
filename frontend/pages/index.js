import Head from 'next/head'
import Logo from '../components/Logo'
import styled from 'styled-components'

export default function Home() {
  return (
    <PageWrapper>
      <LogoWrapper>
        <Logo width="60px" height="60px" />
      </LogoWrapper>
    </PageWrapper>
  )
}

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;
`

const LogoWrapper = styled.div`
  width: 72px;
  height: 72px;

  background-color: #F5F5F5;

  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
`
