import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import Logo from '../../svg/logo.svg'

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
  box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.3);
  a {
    padding: 0;
    margin: 0;
    &:hover {
      figure svg {
        fill: ${p => p.theme.color.darker};
      }
    }
  }
`

const Circle = styled.figure`
  margin: 40px 0 0 0;
  padding: 0;
  /* border: 1px solid ${p => p.theme.color.color}; */
  border-radius: 50%;
  background-color: ${p => p.theme.color.white};
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.3);
  svg {
    padding-top: 5px;
    width: 60%;
    height: auto;
    fill: ${p => p.theme.color.color};
  }
`

const Header = () => (
  <Top>
    <Link to="/">
      <Circle>
        <Logo />
      </Circle>
    </Link>
  </Top>
)

export default Header
