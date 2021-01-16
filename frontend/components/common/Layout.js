import styled from "styled-components"

import FullScreenLoader from "./FullScreenLoader"
import { UIProvider } from "../context/UIContext"
import { FileProvider, useFile } from "../context/FileContext"
import ErrorPage from "./ErrorPage"

function Layout({ children }) {
  return (
    <UIProvider>
      <FileProvider>
        <BodyWrapper>
          <App>{children}</App>
        </BodyWrapper>
      </FileProvider>
    </UIProvider>
  )
}

export default Layout

const App = ({ children }) => {
  const { files, error } = useFile()

  if (error) return <ErrorPage />
  if (!files && !error) return <FullScreenLoader />
  return children
}

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`
