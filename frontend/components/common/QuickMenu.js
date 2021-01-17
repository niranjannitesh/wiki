import React, { useEffect, useRef } from "react"
import styled from "styled-components"
import { useRouter } from "next/router"
import { useFile } from "../context/FileContext"

const QuickMenu = React.forwardRef(({ style, onClickCallback }, ref) => {
  const { files, error } = useFile()
  const router = useRouter()

  const input = useRef()

  useEffect(() => {
    input.current?.focus()
  }, [])

  return (
    <Wrapper style={style} ref={ref}>
      <SearchWrapper>
        <SearchInput
          ref={input}
          type="text"
          placeholder="Jump to a file or search..."
        />
      </SearchWrapper>
      {files && (
        <ItemsWrapper>
          {files
            .sort((a, b) => ("" + a.title).localeCompare(b.title))
            .map((file, index) => (
              <Item
                onClick={() => {
                  router.push("/file/" + file.id)
                  onClickCallback && onClickCallback()
                }}
                key={file.id}
              >
                {file.title || file.relative_path}
              </Item>
            ))}
        </ItemsWrapper>
      )}
    </Wrapper>
  )
})

export default QuickMenu

const Wrapper = styled.div`
  max-width: 600px;
  width: 100%;
  max-height: calc(100vh - 40px);
  border-radius: 8px;
  overflow: hidden;
  margin: 0 auto;

  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;

  transition: transform 0.2s ease, opacity 0.2s ease;
  z-index: 9999;
`

const SearchWrapper = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e5e5e5;
  background: white;
`

const SearchInput = styled.input`
  max-width: 600px;
  width: 100%;
  border: none;
  color: #222222;

  ::placeholder {
    color: #7d7d7d;
  }

  :focus {
    outline: none;
  }
`

const ItemsWrapper = styled.div`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  max-height: calc(400px - 61px);
`

const Item = styled.button`
  padding: 20px 36px;
  cursor: pointer;
  width: 100%;
  text-align: left;
  border: none;
  background: white;
  color: #7d7d7d;
  transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);

  :hover {
    background: #f5f5f5;
    color: #222222;
  }

  :focus {
    outline: none;
    background: #f5f5f5;
    color: #222222;
  }

  :active {
    background: #e2e2e2;
    color: #222222;
  }
`
