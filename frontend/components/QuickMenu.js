import styled from "styled-components"

const items = [
  'SU(2) actions for spherical coordinates',
  'SU(2) Basis vs. Pauli matrices vs. quaternions',
  'Intuitionistic propositional logic',
  'Galilean group cohomology',
  'The Continuum Hypothesis and its consequences',
  'Axiom of Math'
]

export default function QuickMenu() {
  return (
    <Wrapper>
      <SearchWrapper>
        <SearchInput type="text" placeholder="Jump to a file or search..." />
      </SearchWrapper>
      <ItemsWrapper>
        {items.map((item, index) => <Item key={index}>{item}</Item>)}
      </ItemsWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  max-width: 600px;
  width: 100%;
  max-height: calc(100vh - 40px);
  border-radius: 8px;
  overflow: hidden;

  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
`

const SearchWrapper = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e5e5e5;
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
  color: #7D7D7D;
  transition: all .5s cubic-bezier(0.075, 0.82, 0.165, 1);

  :hover {
    background: #F5F5F5;
    color: #222222;
  }

  :focus {
    outline: none;
    background: #F5F5F5;
    color: #222222;
  }

  :active {
    background: #E2E2E2;
    color: #222222;
  }
`
