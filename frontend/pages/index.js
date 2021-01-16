import styled from "styled-components";
import Logo from "../components/common/Logo";
import QuickMenu from "../components/common/QuickMenu";

export default function Home() {
  return <PageWrapper>
    <LogoWrapper>
      <Logo width="48px" height="48px" />
    </LogoWrapper>
    <QuickMenu />
  </PageWrapper>
}


const PageWrapper = styled.div`
  flex:1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  position: relative;
`

const LogoWrapper = styled.div`

  position: absolute;
  top: 24px;
  left: 24px;

  width: 60px;
  height: 60px;

  background-color: #f5f5f5;

  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
`
