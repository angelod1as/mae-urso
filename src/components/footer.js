import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import size from './breakpoints'

const Wrapper = styled.div`
  /* display: flex;
  justify-content: space-around;
  align-items: center; */
  padding: 15px 0;
  background-color: ${p => p.theme.color.black};
  font-size: 0.8em;
  font-weight: 300;
  a {
    color: ${p => p.theme.color.darkgray};
    text-decoration: none;
    margin: 0;
    padding-left: 0;
    &:hover {
      color: ${p => p.theme.color.white};
    }
  }
  div {
    width: 100px;
    margin: 0 0 0 10px;
  }
  @media ${size.small} {
    div {
      width: 500px;
    }
  }
`

const Footer = () => (
  <Wrapper>
    <div>
      <Link to="/colophon">Development & Colophon</Link>
    </div>
  </Wrapper>
)

export default Footer
