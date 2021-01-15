import styled from "styled-components";
import QuickMenu from "../components/QuickMenu";

export default function Home() {
  return <PageWrapper>
    <QuickMenu />
  </PageWrapper>
}


const PageWrapper = styled.div`
  flex:1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
