import React, { Component } from 'react'
import styled from 'styled-components'

const Top = styled.div`
  width: 100%;
  height: 50px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${p => p.theme.color.color};
  color: ${p => p.theme.color.white};
  font-family: ${p => p.theme.font.display};
  font-size: 1.3em;
  z-index: 900;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${p => p.theme.color.white};
`

const Header = () => <Top>Mãe Urso</Top>

export default Header
