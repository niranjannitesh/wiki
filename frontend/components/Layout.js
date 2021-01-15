import styled from 'styled-components'
import useSWR from 'swr'

import FullScreenLoader from '../components/FullScreenLoader'
import fetcher from '../lib/fetch'

function Layout({ children }) {
  return <>
    <BodyWrapper>
      <App>
        {children}
      </App>
    </BodyWrapper>
  </>
}

export default Layout

const App = ({ children }) => {
  const { data: files, error } = useSWR('/api/file', fetcher)

  if (error) return <div>failed to load</div>
  if (!files) return <FullScreenLoader />
  return children
}

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`
