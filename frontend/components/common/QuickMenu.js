import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { useRouter } from "next/router"
import { useFile } from "../context/FileContext"
import Fuse from "fuse.js"

const QuickMenu = React.forwardRef(({ style, onClickCallback }, ref) => {
  const { files, error } = useFile()
  const router = useRouter()
  const fuse = new Fuse(files, { keys: ["title"], threshold: 0.2 })

  const input = useRef()
  const resultsParent = useRef()

  useEffect(() => {
    input.current?.focus()
  }, [])

  const [searchTerm, setSearchTerm] = useState("")
  const [focusIndex, setFocusIndex] = useState(0)
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    const result = fuse.search(searchTerm)
    setSearchResults(result.map((x) => x.item))

    if (!searchTerm) {
      setSearchResults(files)
    }
    setFocusIndex(0)
  }, [searchTerm])

  const onSelect = (index) => {
    if (index === searchResults.length) {
      // search
      const term = encodeURI(searchTerm)
      router.push({
        pathname: "/search",
        query: { q: term },
      })
      onClickCallback && onClickCallback()
    } else {
      const file = searchResults[index]
      router.push("/file/" + file.id)
      onClickCallback && onClickCallback()
    }
  }

  const handleKeyUp = (e) => {
    if (e.keyCode === 38) {
      // onUp()
      if (focusIndex > 0) setFocusIndex(focusIndex - 1)
      else if (searchTerm) setFocusIndex(searchResults.length)
      else setFocusIndex(searchResults.length - 1)

      resultsParent.current?.children[focusIndex].scrollIntoView({
        block: "nearest",
      })
    } else if (e.keyCode === 40) {
      // onDown()
      if (searchTerm) {
        if (focusIndex < searchResults.length) setFocusIndex(focusIndex + 1)
        else setFocusIndex(0)
      } else {
        if (focusIndex < searchResults.length - 1) setFocusIndex(focusIndex + 1)
        else setFocusIndex(0)
      }

      resultsParent.current?.children[focusIndex].scrollIntoView({
        block: "nearest",
      })
    } else if (e.keyCode === 13) {
      onSelect(focusIndex)
    }
  }

  return (
    <Wrapper style={style} ref={ref}>
      <SearchWrapper>
        <SearchInput
          ref={input}
          type="text"
          placeholder="Jump to a file or search..."
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyUp={handleKeyUp}
        />
      </SearchWrapper>
      {files && (
        <ItemsWrapper ref={resultsParent}>
          {searchResults.map((file, index) => (
            <Item
              className={index === focusIndex ? "focused" : ""}
              onClick={() => onSelect(index)}
              key={file.id}
            >
              {file.title || file.relative_path}
            </Item>
          ))}
          {searchTerm && (
            <Item
              className={searchResults.length === focusIndex ? "focused" : ""}
              onClick={() => onSelect(searchResults.length)}
            >
              search for <SearchTerm>{searchTerm}</SearchTerm>
            </Item>
          )}
        </ItemsWrapper>
      )}
    </Wrapper>
  )
})

QuickMenu.displayName = "QuickMenu"

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

  :hover,
  &.focused {
    background: #f5f5f5;
    color: #222222;
  }

  :focus {
    outline: none;
  }

  :active {
    background: #e2e2e2;
    color: #222222;
  }
`

const SearchTerm = styled.span`
  font-weight: 500;
  color: #000;
`
