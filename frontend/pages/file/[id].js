import useSWR from "swr"
import { useRouter } from "next/router"
import FullScreenLoader from "../../components/common/FullScreenLoader"
import fetcher from "../../lib/fetch"
import ErrorPage from "../../components/common/ErrorPage"
import styled from "styled-components"
import MarkdownView from "../../components/MarkdownView"
import Command from "../../components/common/Command"

export default function FilePage({ id }) {
  const { data: file, error } = useSWR("/api/file/" + id, fetcher)

  if (!file && !error) return <FullScreenLoader />
  if (error) return <ErrorPage />

  return (
    <PageWrapper>
      <Sidebar>
        <Command />
      </Sidebar>
      <DocumentWrapper>
        <MarkdownView file={file} />
      </DocumentWrapper>
    </PageWrapper>
  )
}

export const getServerSideProps = ({ query: { id } }) => {
  return {
    props: {
      id,
    },
  }
}

const PageWrapper = styled.div`
  width: 100%;
  max-width: 1234px;
  margin: 0 auto;
  background-color: #fefefe;

  flex: 1;
  display: flex;
`

const Sidebar = styled.div`
  width: 30%;
  max-width: 320px;

  padding: 40px 32px;
`

const DocumentWrapper = styled.div`
  flex: 1;
  width: 100%;

  background-color: #fff;
  border-left: 1px solid #eaeaea;

  padding: 40px 24px;
`
