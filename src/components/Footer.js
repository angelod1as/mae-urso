import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-family: ${p => p.theme.font.display};
  padding: 15px 0;
  background-color: ${p => p.theme.color.black};
  font-size: 0.9em;
  a {
    color: ${p => p.theme.color.white};
    text-decoration: none;
    &:hover {
      color: ${p => p.theme.color.darkgray};
    }
  }
`

const Footer = () => (
  <Wrapper>
    <div>
      <a href="http://angelodias.com.br" target="_blank" rel="noopener noreferrer">
        Desenvolvido por Angelo Dias
      </a>
    </div>
    <div>
      <Link to="/colophon">Créditos e Colophon</Link>
    </div>
  </Wrapper>
)

export default Footer
