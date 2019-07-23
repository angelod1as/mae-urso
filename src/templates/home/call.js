import React from 'react'
import parse from 'html-react-parser'
import styled from 'styled-components'

const Bg = styled.div`
  background-color: ${p => p.theme.color.color};
  padding: 50px 0;
`

const Wrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  min-height: 50vh;
  color: ${p => p.theme.color.white};

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  h1 {
    color: ${p => p.theme.color.white};
    font-size: 2.5em;
  }

  p {
    font-size: 1.2em;
    a {
      font-size: 1.4em;
    }
  }

  a {
    display: block;
    color: ${p => p.theme.color.color};
    background-color: ${p => p.theme.color.white};
    box-shadow: 0px 5px 0px 0px ${p => p.theme.color.darker};
    padding: 20px 20px;
    border-radius: 5px;
    text-decoration: none;
    text-align: center;
    transition: all 0.1s;

    &:hover {
      background-color: ${p => p.theme.color.gray};
      transform: translate(0, -5px);
      box-shadow: 0px 9px 5px 1px ${p => p.theme.color.darker};
    }
  }
`

const Call = ({ html }) => {
  return (
    <Bg>
      <Wrapper>
        <div>{parse(html)}</div>
      </Wrapper>
    </Bg>
  )
}

export default Call
