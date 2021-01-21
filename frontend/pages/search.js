import styled from "styled-components"
import useSWR from "swr"
import ErrorPage from "../components/common/ErrorPage"
import FullScreenLoader from "../components/common/FullScreenLoader"
import fetcher from "../lib/fetch"
import md from "../lib/md"
import Logo from "../components/common/Logo"
import { useUI } from "../components/context/UIContext"
import { useFile } from "../components/context/FileContext"
import NextLink from "next/link"

export default function Search({ q: search }) {
  const { data: results, error } = useSWR("/api/search?q=" + search, fetcher)
  const { openQuickOpenModal } = useUI()

  search = decodeURI(search)
  if (error) return <ErrorPage />
  if (!results) return <FullScreenLoader />

  return (
    <Page>
      <ResultsWrapper>
        <CommandButton title="⌘K" onClick={() => openQuickOpenModal()}>
          <Logo width="36px" height="36px" />
        </CommandButton>
        <SearchQuery>
          Search results for <strong>{search}</strong>
        </SearchQuery>
        {results.map((result, index) => {
          return <Result key={index} result={result} search={search} />
        })}
      </ResultsWrapper>
    </Page>
  )
}

function Result({ result, search }) {
  const { files } = useFile()
  const file = files.find((x) => x.relative_path == result.file_path)

  return (
    <NextLink href={`/file/${file.id}`}>
      <ResultWrapper>
        <div
          dangerouslySetInnerHTML={{
            __html: md
              .render(result.line_contents)
              .replace(
                search,
                `<strong style="color: #3f51b5;">${search}</strong>`
              ),
          }}
        ></div>
        <pre>
          {result.file_path}:{result.line_no}
        </pre>
      </ResultWrapper>
    </NextLink>
  )
}

const Page = styled.div`
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
`

const ResultsWrapper = styled.div`
  margin-top: 40px;
`

const SearchQuery = styled.p`
  font-size: 18px;
  margin-bottom: 20px;
`

const ResultWrapper = styled.article`
  border-radius: 8px;
  padding: 12px 16px;
  margin-top: 12px;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;

  & *:first-child {
    margin-top: 0;
  }

  h1,
  h2,
  h3,
  h4 {
    font-size: 18px;
    margin: 0;
  }

  & * + * {
    margin-top: 1em;
  }
`

const CommandButton = styled.button`
  width: 50px;
  height: 50px;

  background-color: #f5f5f5;
  border: none;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;

  position: absolute;
  top: 24px;
  left: 24px;

  :focus {
    outline: none;
  }
`

export const getServerSideProps = ({ query: { q } }) => {
  if (!q) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }
  return {
    props: {
      q: q,
    },
  }
}
