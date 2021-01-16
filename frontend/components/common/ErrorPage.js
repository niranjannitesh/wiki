import styled from "styled-components"
import { ErrorIcon } from "./Icon"

export default function ErrorPage() {
  return (
    <ErroPageWrapper>
      <IconWrapper>
        <ErrorIcon width="48px" height="48px" />
      </IconWrapper>
      <pre>Check the browser console.</pre>
    </ErroPageWrapper>
  )
}

const ErroPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;
`

const IconWrapper = styled.div`
  width: 60px;
  height: 60px;

  background-color: #f5f5f5;

  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
`
