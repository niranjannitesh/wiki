import Logo from "./Logo"
import styled from "styled-components"

export default function FullScreenLoader() {
  return (
    <PageWrapper>
      <LogoWrapper>
        <Logo width="48px" height="48px" />
      </LogoWrapper>
      <ProgressBar />
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
  width: 60px;
  height: 60px;

  background-color: #f5f5f5;

  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
`

const ProgressBar = () => (
  <ProgressBarWrapper role="progressbar" aria-label="Loading..." />
)

const ProgressBarWrapper = styled.div`
  margin-top: 18px;
  height: 2px;
  width: 140px;
  background: #E4E4E4;
  overflow: hidden;
  position: relative;

  :before {
    transform-origin: 0 0;
    display: block;
    position: absolute;
    content: "";
    width: 100%;
    height: 2px;
    background-color: #222222;
    animation: 2s linear 0s infinite progress-scale;
  }

  @keyframes progress-scale {
    0% {
      transform: scaleX(0) translate(-100%);
    }
    30% {
      transform: scaleX(0.2) translate(15%);
    }
    50% {
      transform: scaleX(0.4) translate(50%);
    }
    70% {
      transform: scaleX(1) translate(70%);
    }
    100% {
      transform: scaleX(0.8) translate(150%);
    }
  }
`
