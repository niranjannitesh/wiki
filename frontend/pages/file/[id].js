import useSWR from "swr"
import FullScreenLoader from "../../components/common/FullScreenLoader"
import fetcher from "../../lib/fetch"
import ErrorPage from "../../components/common/ErrorPage"
import styled from "styled-components"
import MarkdownView from "../../components/MarkdownView"
import md from "../../lib/md"
import Logo from "../../components/common/Logo"
import { useUI } from "../../components/context/UIContext"

function getHeadings(html) {
  const el = document.createElement(`div`)
  el.innerHTML = html
  const all_headings = el.querySelectorAll("h1, h2, h3, h4, h5, h6")
  if (all_headings.length === 0) {
    return
  }
  const response = []
  all_headings.forEach((x) => {
    response.push({
      text: x.innerHTML,
      id: x.id,
    })
  })
  return response
}

export default function FilePage({ id }) {
  const { data: file, error } = useSWR("/api/file/" + id, fetcher)
  const { openQuickOpenModal } = useUI()

  if (!file) return <FullScreenLoader />
  if (error) return <ErrorPage />

  let html = md.render(file.contents)
  const all_headings = getHeadings(html)

  return (
    <PageWrapper>
      <Sidebar>
        <CommandButton title="⌘K" onClick={() => openQuickOpenModal()}>
          <Logo width="36px" height="36px" />
        </CommandButton>
        {all_headings && (
          <OutlineWrapper>
            <OutlineSubtitle>Outline</OutlineSubtitle>
            {all_headings.map((x) => (
              <OutlineLink href={"#" + x.id} key={x.id}>
                {"– " + x.text}
              </OutlineLink>
            ))}
          </OutlineWrapper>
        )}
      </Sidebar>
      <DocumentWrapper>
        <MarkdownView html={html} />
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
  margin: 0 auto;
  background-color: #fefefe;

  flex: 1;
  display: flex;
`

const Sidebar = styled.div`
  width: 30%;

  padding: 40px 32px;
  position: fixed;
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

  :focus {
    outline: none;
  }
`

const DocumentWrapper = styled.div`
  flex: 1;
  width: 100%;

  background-color: #fff;
  border-left: 1px solid #eaeaea;

  padding: 40px 24px;
  margin-left: 30%;
  max-width: 100ch;
`

const OutlineWrapper = styled.div``

const OutlineSubtitle = styled.span`
  font-weight: 500;
  font-size: 14px;

  letter-spacing: 2px;

  color: #767676;
  text-transform: uppercase;
  display: block;

  margin-top: 24px;
  margin-bottom: 32px;
`

const OutlineLink = styled.a`
  display: block;
  width: 100%;
  text-decoration: none;
  margin-top: 12px;
  color: #8a8a8a;
  line-height: 1.35;

  transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);

  :hover {
    color: #222;
  }
`
